import { Router, Request, Response, NextFunction} from 'express';
import { LocationData } from '../data/LocationData';
import { PhotoLocationDocument } from  '../data/PhotoLocationDocument';

export class PhotoLocationRouter {

	router:Router;

	constructor(){
		this.router = Router();
		this.init();
	}

	public GetPhotoLocation(req:Request, res: Response){

		let query:string = req.params.id;
		var data:LocationData = new LocationData();

		data.GetLocationAsync(query).then( requestResult => {
			res.status(200).send(requestResult);
		}).catch( e => {
				res.status(404).send({
					message: e.message,
					status: res.status
				});
		});

	}

	public AddPhotoLocation(req:Request, res: Response){

		var doc: PhotoLocationDocument = <PhotoLocationDocument>req.body;
		var data:LocationData = new LocationData();

		data.AddLocationAsync(doc).then( requestResult => {
			res.status(200).send(requestResult);
		}).catch( e => {
				res.status(404).send({
					message: e.message,
					status: res.status
				});
		});

	}

	public UpdatePhotoLocation(req:Request, res: Response){

		var doc: PhotoLocationDocument = <PhotoLocationDocument>req.body;
		var data:LocationData = new LocationData();

		data.UpdateLocationAsync(doc).then( requestResult => {
			res.status(200).send(requestResult);
		}).catch( e => {
				res.status(404).send({
					message: e.message,
					status: 404
				});
		});

	}

	public DeletePhotoLocation(req:Request, res: Response){

			let query:string = req.params.id;
			var data:LocationData = new LocationData();

			data.DeletePhotoLocationAsync(query).then( requestResult => {
				res.status(204).send();
				}).catch( e => {
				res.status(404).send({
						message: e.message,
						status: 404
					});
			});

	};

	init(){
		this.router.get("/:id", this.GetPhotoLocation),
		this.router.post("/", this.AddPhotoLocation),
		this.router.put("/",this.UpdatePhotoLocation),
		this.router.delete("/:id",this.DeletePhotoLocation)
	}

}

const photoLocationRouter = new PhotoLocationRouter();
photoLocationRouter.init();

export default photoLocationRouter.router;