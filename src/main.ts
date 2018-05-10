import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {

	const app = await NestFactory.create(ApplicationModule);
	/* app.useGlobalFilters(new HttpExceptionFilter()); */
	/* app.useGlobalGuards(new AuthGuard()); */

	/* set view engine to html */
	app.setGlobalPrefix('/api');

  	await app.listen(process.env.PORT || 3000)
}
bootstrap();