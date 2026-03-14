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
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IUsersService) private userService: IUsersService,
		@inject(TYPES.IConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				method: 'post',
				path: '/login',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				method: 'post',
				path: '/register',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
		]);
	}

	public async login(
		{ body }: Request<unknown, unknown, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const isValid = await this.userService.validateUser(body);
		if (!isValid) {
			return next(new HttpError(401, 'Ошибка авторизации', 'UsersController/login'));
		}
		const jwt = await this.signJWT(body.email, this.configService.get('SECRET'));
		this.ok(res, { jwt });
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

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err: Error | null, token?: string) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	}
}
