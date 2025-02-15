import BaseException, { ErrorLevel } from './base.exception';

export default class UnknownException extends BaseException {
	public constructor(message: string, level: ErrorLevel = ErrorLevel.MEDIUM) {
		super('UnknownException', message, 500, level);
	}
}
