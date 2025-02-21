export enum ErrorLevel {
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
	HIGH = 'HIGH',
	CRITICAL = 'CRITICAL',
}

export default class BaseException {
	public name: string = 'BaseError';
	public message: string;
	public status: number;
	public time: Date;
	public level: ErrorLevel;
	public path: string;
	private fileName?: string;

	public constructor(
		name: string,
		message: string,
		status: number,
		level: ErrorLevel = ErrorLevel.MEDIUM
	) {
		this.name = name;
		this.message = message;
		this.status = status;
		this.level = level;
		this.path = '';
	}

	public getError() {
		return {
			name: this.name,
			message: this.message,
			status: this.status,
			level: this.level,
			path: this.path,
		};
	}

	public setPath(path: string) {
		this.path = path;
	}

	public toString() {
        return `${this.name}::${this.path}::${this.status}::${this.level}::${this.message}`;
	}
}

export class MissingParameterException extends BaseException {
	public constructor(message: string, level: ErrorLevel = ErrorLevel.HIGH) {
		super('MissingParameterException', message, 400, level);
	}
}

export class NotFoundException extends BaseException {
	public constructor(message: string, level: ErrorLevel = ErrorLevel.MEDIUM) {
		super('NotFoundException', message, 404, level);
	}
}

export class PermissionDeniedException extends BaseException {
	public constructor(message: string, level: ErrorLevel = ErrorLevel.MEDIUM) {
		super('PermissionDeniedException', message, 403, level);
	}
}

export class UnknownException extends BaseException {
	public constructor(message: string, level: ErrorLevel = ErrorLevel.MEDIUM) {
		super('UnknownException', message, 500, level);
	}
}
