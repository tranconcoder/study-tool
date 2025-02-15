import BaseException, { ErrorLevel } from './base.exception';

export default class MissingParameterException extends BaseException {
	public constructor(message: string, level: ErrorLevel = ErrorLevel.HIGH) {
		super('MissingParameterException', message, 400, level);
	}
}
