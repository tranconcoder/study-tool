import { qldtInstance } from '../configs/axios.config';

// Exceptions
import { ErrorLevel } from '../exceptions/base.exception';
import MissingParameterException from '../exceptions/missing-parameter.exception';
import PermissionDeniedException from '../exceptions/permission-denied.exception';

import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import JwtService from './jwt.service';
import ThirdPartyAuth from '../app/schemas/thirdPartyAuth.schema';
import logger from './logger.service';

export default class AuthService {
	public static async login(username: string, password: string) {
		const loginForm = new FormData();
		loginForm.append('username', username);
		loginForm.append('password', password);

		return await qldtInstance
			.post('login.action', loginForm)
			.then(({ request }) => {
				const path: string | undefined = request.path;
				if (!request || !path || path.startsWith('/VLUTE-Web/login.action')) {
					throw new PermissionDeniedException('Login failed', ErrorLevel.LOW);
				}

				const session = path.split(';')?.[1]?.split('=')?.[1];
				if (!session) {
					throw new MissingParameterException(
						'Get account info failed',
						ErrorLevel.HIGH
					);
				}

				return session;
			})
			.then(async (session) => {
				// Hash auth info to compare new auth info
				const authInfoHash = crypto
					.createHash('sha256')
					.update(`${username}:${password}`)
					.digest('hex');

				// Generate public key and private key RSA
				const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
					modulusLength: 2048,
					publicKeyEncoding: {
						type: 'spki',
						format: 'pem',
					},
					privateKeyEncoding: {
						type: 'pkcs8',
						format: 'pem',
					},
				});

				// Save to database
				// Override when auth info hash exists
				const auth = await ThirdPartyAuth.findOneAndReplace(
					{ auth_info_hash: authInfoHash },
					{
						auth_info_hash: authInfoHash,
						public_key: publicKey,
						private_key: privateKey,
						host: 'qldt',
						host_token: session,
					},
					{
						upsert: true,
						new: true,
					}
				).lean();
				console.log(auth);

				const [accessToken, refreshToken] = JwtService.generateJwtTokenPair(
					{ authId: auth._id.toHexString(), username },
					privateKey
				);

				logger.info(`Login success: ${username}`);

				return { accessToken, refreshToken };
			});
	}
}
