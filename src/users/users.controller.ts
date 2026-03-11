import { TYPES } from './../types';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HttpError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { IUsersController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IUsersService) private userService: IUsersService,
	) {
		super(loggerService);
		this.bindRoutes([
			{ method: 'post', path: '/login', func: this.login },
			{
				method: 'post',
				path: '/register',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
		]);
	}

	public login(
		req: Request<unknown, unknown, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): void {
		console.log(req.body);
		this.ok(res, 'login');
		// next(new HttpError(401, 'Ошибка авторизации', 'UsersController/login'));
	}

	public async register(
		{ body }: Request<unknown, unknown, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(
				new HttpError(422, 'Такой пользователь уже существует', 'UsersController/register'),
			);
		}
		this.ok(res, { email: result.email, id: result.id });
	}
}
