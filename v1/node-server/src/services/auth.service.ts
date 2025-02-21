import { qldtInstance } from '../configs/axios.config';

// Libs
import crypto from 'crypto';

// Exceptions
import { ErrorLevel } from '../exceptions/base.exception';
import MissingParameterException from '../exceptions/missing-parameter.exception';
import PermissionDeniedException from '../exceptions/permission-denied.exception';

// Service
import JwtService from './jwt.service';
import logger from './logger.service';
import ThirdPartyAuthService from './thirdPartyAuth.service';
import KeyService from './key.service';
import {OkResponse} from '../responses/success.response';

export default class AuthService {
	public static async login(username: string, password: string) {
		const loginForm = new FormData();
		loginForm.append('username', username);
		loginForm.append('password', password);

		return await qldtInstance
			.post('login.action', loginForm)
            // Handle login
			.then(({ request }) => {
				const path: string | undefined = request.path;
				if (!request || !path || path.startsWith('/VLUTE-Web/login.action')) {
					throw new PermissionDeniedException('Invalid username or password!', ErrorLevel.LOW);
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
            // Generate token
			.then(async (session) => {
				// Hash auth info to compare new auth info
				const authInfoHash = crypto
					.createHash('sha256')
					.update(`${username}:${password}`)
					.digest('hex');

				// Generate public key and private key RSA
                const { publicKey, privateKey } = KeyService.generateKeyPair();

				// Save to database
				// Override when auth info hash exists
                const auth = await ThirdPartyAuthService.createOrUpdateByHashInfo(
                    authInfoHash,
                    {
                        auth_info_hash: authInfoHash,
                        public_key: publicKey,
                        private_key: privateKey,
                        host: 'qldt',
                        host_token: session,
                    }
                )

				const [accessToken, refreshToken] = JwtService.generateJwtTokenPair(
					{ authId: auth._id.toHexString(), username },
					privateKey
				);

				logger.info(`Login success: ${username}`);

                return new OkResponse('Login success', { accessToken, refreshToken });
			});
	}
}
