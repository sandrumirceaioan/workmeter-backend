import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {
	/* body parser */
	const instance = express();
	instance.use(bodyParser.json());
	instance.use(bodyParser.urlencoded({ extended: false }));

	const app = await NestFactory.create(ApplicationModule);
	/* app.useGlobalFilters(new HttpExceptionFilter()); */
	/* app.useGlobalGuards(new AuthGuard()); */

	app.setGlobalPrefix('/api');
  await app.listen(3000);
}
bootstrap();