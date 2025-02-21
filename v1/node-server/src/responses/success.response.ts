import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import type { Response } from 'express';

export default class SuccessResponse<T = unknown> {
	public constructor(
		public status: StatusCodes,
		public message?: string,
		public metadata?: T
	) {
		this.status = status;
		this.message = message;
		this.metadata = metadata;

		if (!this.message) {
			this.message = ReasonPhrases[this.status] || 'Internal Server Error';
		}
	}

	public send(res: Response) {
		res.status(this.status).json(this.getResponse());
	}

	public getResponse() {
		return {
			status: this.status,
			message: this.message,
			metadata: this.metadata,
		};
	}
}

export class CreatedResponse<T = unknown> extends SuccessResponse<T> {
    public constructor(message?: string, metadata?: T) {
        super(StatusCodes.CREATED, message, metadata);
    }
}

export class OkResponse<T = unknown> extends SuccessResponse<T> {
    public constructor(message?: string, metadata?: T) {
        super(StatusCodes.OK, message, metadata);
    }
}

export class NoContentResponse<T = unknown> extends SuccessResponse<T> {
    public constructor(message?: string, metadata?: T) {
        super(StatusCodes.NO_CONTENT, message, metadata);
    }
}
