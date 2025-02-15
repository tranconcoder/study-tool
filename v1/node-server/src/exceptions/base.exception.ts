import { name } from './../../../react-client/node_modules/ci-info/index.d';
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
		return `${this.path}:::${this.status}::${this.level}::${this.message}`;
	}
}
