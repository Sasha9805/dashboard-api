import { Response, Router } from 'express';
import { ExpressReturnType, IControllerRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response<T>, code: number, message: T): ExpressReturnType {
		// json automatically sets the Content-Type to application/json
		return res.status(code).json(message);
	}

	public ok<T>(res: Response<T>, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const handler = route.func.bind(this);
			this._router[route.method](route.path, handler);
		}
	}
}
