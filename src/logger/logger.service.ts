import { Logger, ILogObj  } from 'tslog';
import { ILogger } from "./logger.interface";
import { injectable } from "inversify";

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger<ILogObj>;

	constructor() {
		this.logger = new Logger({ name: 'MyAppLogger', prettyLogTemplate: '{{dateIsoStr}} {{logLevelName}}: ' });
	}

	log(...args: unknown[]) {
		this.logger.info(...args);
	}

	error(...args: unknown[]) {
		// отправка в sentry или другую систему мониторинга
		this.logger.error(...args);
	}

	warn(...args: unknown[]) {
		this.logger.warn(...args);
	}
}
