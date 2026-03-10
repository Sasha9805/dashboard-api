import { PrismaClient, UserModel } from '../../generated/prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const connectionString = process.env.DATABASE_URL || 'file:./prisma/dev.db';
		const adapter = new PrismaBetterSqlite3({ url: connectionString });
		this.client = new PrismaClient({ adapter });
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] Подключение к базе данных успешно установлено');
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error(`[PrismaService] Ошибка подключения к базе данных: ${error.message}`);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
		this.logger.log('[PrismaService] Отключение от базы данных успешно выполнено');
	}
}
