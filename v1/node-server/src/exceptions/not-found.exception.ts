import BaseException, { ErrorLevel } from './base.exception';

export default class NotFoundException extends BaseException {
	public constructor(
		message: string,
		level: ErrorLevel = ErrorLevel.MEDIUM,
		time: Date = new Date()
	) {
		super('NotFoundException', message, 404, level, time);
	}
}
