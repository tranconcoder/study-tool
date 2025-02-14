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
		level: ErrorLevel = ErrorLevel.MEDIUM,
		time: Date = new Date()
	) {
		this.name = name;
		this.message = message;
		this.status = status;
		this.time = time;
		this.level = level;
		this.path = '';
	}

	public getError() {
		return {
			name: this.name,
			message: this.message,
			status: this.status,
			time: this.time,
			level: this.level,
			path: this.path,
		};
	}

	public setPath(path: string) {
		this.path = path;
	}

	public toString() {
		return `[${this.time.toISOString()}] ${this.status} - ${this.level}: ${this.message}`;
	}
}
