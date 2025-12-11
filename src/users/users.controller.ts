import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";

export class UsersController extends BaseController {
	constructor(logger: LoggerService) {
		super(logger);
		this.bindRoutes([
			{method: 'post', path: '/login', func: this.login},
			{method: 'post', path: '/register', func: this.register},
		]);
	}

	public login(req: Request, res: Response, next: NextFunction) {
		return this.ok(res, 'login');
	}

	public register(req: Request, res: Response, next: NextFunction) {
		return this.ok(res, 'register');
	}
}
