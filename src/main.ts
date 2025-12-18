import { Container, ContainerModule } from "inversify";
import { App } from "./app";
import { ExceptionFilter } from "./errors/exception.filter";
import { LoggerService } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { IExceptionFilter } from "./errors/exception.filter.interface";
import { IUsersController } from "./users/users.controller.interface";

export const appBindings = new ContainerModule(({ bind }) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
	bind<IUsersController>(TYPES.IUsersController).to(UsersController);
	bind<App>(TYPES.Application).to(App);
});

function bootsrtap() {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootsrtap();
