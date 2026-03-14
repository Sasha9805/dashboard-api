import { UserPayload } from './user.payload.interface';

declare global {
	namespace Express {
		export interface Request {
			user: UserPayload;
		}
	}
}
