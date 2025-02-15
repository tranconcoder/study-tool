import jwt from 'jsonwebtoken';

export default class JwtService {
	public static generateAccessToken(payload: any, privateKey: string): string {
		return jwt.sign(payload, privateKey, {
			algorithm: 'RS256',
			expiresIn: '1h',
		});
	}

	public static generateRefreshToken(payload: any, privateKey: string): string {
		return jwt.sign(payload, privateKey, {
			algorithm: 'RS512',
			expiresIn: '6h',
		});
	}

	public static generateJwtTokenPair(payload: any, privateKey: string) {
		const accessToken = this.generateAccessToken(payload, privateKey);
		const refreshToken = this.generateRefreshToken(payload, privateKey);

		return [accessToken, refreshToken];
	}
}
