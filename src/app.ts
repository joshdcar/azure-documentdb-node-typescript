
/*  Express Web Application - REST API Host  */
import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import PhotoLocationRouter from './routes/PhotoLocationRouter';

class App{

	public express: express.Application;
	
	constructor(){
		this.express = express();
		this.middleware();
		this.routes();
	}
	
	private middleware(): void{
		this.express.use(logger('dev'));
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({extended: false}));
	}

	private routes(): void{
		let router = express.Router();
		this.express.use('/api/v1/photolocations', PhotoLocationRouter);
	}

}

export default new App().express;