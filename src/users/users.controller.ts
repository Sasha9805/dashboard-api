import { TYPES } from './../types';
import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { HttpError } from "../errors/http-error.class";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";

@injectable()
export class UsersController extends BaseController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{method: 'post', path: '/login', func: this.login},
			{method: 'post', path: '/register', func: this.register},
		]);
	}

	public login(req: Request, res: Response, next: NextFunction) {
		return this.ok(res, 'login');
		// next(new HttpError(401, 'Ошибка авторизации', 'UsersController/login'));
	}

	public register(req: Request, res: Response, next: NextFunction) {
		return this.ok(res, 'register');
	}
}
