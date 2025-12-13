import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../logger/logger.service";
import { IExceptionFilter } from "./exception.filter.interface";
import { HttpError } from "./http-error.class";

export class ExceptionFilter implements IExceptionFilter {
	logger: LoggerService;

	constructor(logger: LoggerService) {
		this.logger = logger;
	}

	catch (err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
		if (err instanceof HttpError) {
			this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
			res.status(err.statusCode).json({ error: err.message });
		} else {
			this.logger.error(`[${err.name}] ${err.message}`);
			res.status(500).json({ error: err.message });
		}
	}
}
