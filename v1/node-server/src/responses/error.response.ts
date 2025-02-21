import {StatusCodes} from "http-status-codes";

export enum ErrorLevel {
    UNSET = "UNSET",
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    CRITICAL = "CRITICAL",
}

export default class BaseException {
    public name: string = "BaseError";
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
        level: ErrorLevel = ErrorLevel.UNSET
    ) {
        this.name = name;
        this.message = message;
        this.status = status;
        this.level = level;
        this.path = "";
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
    public constructor(message: string, level?: ErrorLevel) {
        super("MissingParameterException", message, StatusCodes.FAILED_DEPENDENCY, level);
    }
}

export class NotFoundException extends BaseException {
    public constructor(message: string, level: ErrorLevel) {
        super("NotFoundException", message, StatusCodes.NOT_FOUND, level);
    }
}

export class PermissionDeniedException extends BaseException {
    public constructor(message: string, level: ErrorLevel) {
        super("PermissionDeniedException", message, StatusCodes.FORBIDDEN, level);
    }
}

export class InternalServerException extends BaseException {
    public constructor(message: string, level: ErrorLevel) {
        super("UnknownException", message, StatusCodes.INTERNAL_SERVER_ERROR, level);
    }
}
