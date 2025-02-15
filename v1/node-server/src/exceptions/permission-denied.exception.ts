import BaseException, { ErrorLevel } from './base.exception';

export default class PermissionDeniedException extends BaseException {
	public constructor(message: string, level: ErrorLevel = ErrorLevel.MEDIUM) {
		super('PermissionDeniedException', message, 403, level);
	}
}
