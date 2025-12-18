import { TYPES } from './types';
import express, { Express } from 'express';
import { Server } from 'http';
import { UsersController } from "./users/users.controller";
import { ILogger } from "./logger/logger.interface";
import { inject, injectable } from "inversify";
import { IExceptionFilter } from "./errors/exception.filter.interface";

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IUsersController) private usersController: UsersController,
		@inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter
	) {
		this.app = express();
		this.port = 8000;
	}

	useRoutes() {
		this.app.use('/users', this.usersController.router);
	}

	useExceptionFilters() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init() {
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Express сервер запущен на http://localhost:${this.port}/`);
	}
}
