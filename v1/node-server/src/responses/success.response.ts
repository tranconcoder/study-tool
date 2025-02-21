import { ReasonPhrases, StatusCodes } from "http-status-codes";
import type { Response } from "express";
import _ from "lodash";

export default class SuccessResponse<T = any> {
    public status: StatusCodes;
    public message: string;
    public metadata?: T;

    public constructor(options: {
        status: StatusCodes;
        message?: string;
        metadata?: T;
    }) {
        this.status = options.status;
        this.message = options.message || ReasonPhrases[options.status];
        this.metadata = options.metadata;
    }

    public send(res: Response) {
        res.status(this.status).json(this.getResponse());
    }

    public getResponse() {
        return _.pick(this, ["status", "message", "metadata"])
    }
}

export class CreatedResponse<T = any> extends SuccessResponse<T> {
    public constructor(options?: { message?: string; metadata?: T }) {
        super({ status: StatusCodes.CREATED, ...options });
    }
}

export class OkResponse<T = any> extends SuccessResponse<T> {
    public constructor(options?: { message?: string; metadata?: T }) {
        super({ status: StatusCodes.OK, ...options });
    }
}
