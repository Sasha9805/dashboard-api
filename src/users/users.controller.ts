import { TYPES } from './../types';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HttpError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { IUsersController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ method: 'post', path: '/login', func: this.login },
			{ method: 'post', path: '/register', func: this.register },
		]);
	}

	public login(
		req: Request<object, object, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): void {
		console.log(req.body);
		this.ok(res, 'login');
		// next(new HttpError(401, 'Ошибка авторизации', 'UsersController/login'));
	}

	public register(
		req: Request<object, object, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): void {
		console.log(req.body);
		this.ok(res, 'register');
	}
}
