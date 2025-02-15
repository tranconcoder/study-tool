import { Request } from 'express';
import { qldtInstance } from '../configs/axios.config';
import MissingParameterException from '../exceptions/missing-parameter.exception';
import { AxiosError, AxiosResponseHeaders } from 'axios';
import PermissionDeniedException from '../exceptions/permission-denied.exception';
import { ErrorLevel } from '../exceptions/base.exception';

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
			});
	}
}
