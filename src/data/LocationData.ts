import {DocumentClient, SqlQuerySpec, RequestCallback, QueryError, RequestOptions, SqlParameter, RetrievedDocument} from 'documentdb'
import {LocationDataConfig } from './LocationDataConfig';
import {PhotoLocationDocument } from './PhotoLocationDocument';

export class LocationData{

	private _config:LocationDataConfig;
	private _client: DocumentClient;

	constructor(){

		this._config = new LocationDataConfig();
		this._client = new DocumentClient(this._config.host, {masterKey: this._config.authKey}, this._config.connectionPolicy);	
				
	}

	public GetLocationAsync = (id:string) => {

		var that = this;

		return new Promise<PhotoLocationDocument>((resolve, reject) => {

			var options:RequestOptions = {};
			var params: SqlParameter[] = [{name: "@id", value: id }];

			var query: SqlQuerySpec = { query:"select * from heros where heros.id=@id",
															parameters: params};
													
			this._client.queryDocuments(this._config.collectionUrl,query)
						.toArray((error:QueryError, result:RetrievedDocument<PhotoLocationDocument>[]): void =>{
							
							if (error){ reject(error); }
							
							if(result.length > 0){
								resolve(<PhotoLocationDocument>result[0]);
							}
							else
							{
								reject({message: 'Location not found'});
							}
						});															

    	});

	}

	public AddLocationAsync = (photoLocation: PhotoLocationDocument) => {

		var that = this;

		return new Promise<PhotoLocationDocument>((resolve, reject) => {

				var options:RequestOptions = {};

				that._client.createDocument<PhotoLocationDocument>(that._config.collectionUrl, photoLocation, options, 
						(error: QueryError, resource: PhotoLocationDocument, responseHeaders: any): void => {
							if(error){
								reject(error);
							}
							resolve(resource);
				});

    	});

	}

	public UpdateLocationAsync = (photoLocation: PhotoLocationDocument) => {

		var that = this;

		return new Promise<PhotoLocationDocument>((resolve,reject) =>{

			var options:RequestOptions = {};
			var documentLink = that._config.collectionUrl + '/docs/' + photoLocation.id;

			that._client.replaceDocument<PhotoLocationDocument>(documentLink, photoLocation, options, 
						(error: QueryError, resource: PhotoLocationDocument, responseHeaders: any): void => {
							if(error){
								reject(error);
							}
							resolve(resource);
				});

		});

	}

		public DeletePhotoLocationAsync = (id:string) => {

			var that = this;

			return new Promise<PhotoLocationDocument>((resolve, reject) => {

					var options:RequestOptions = {};
					var documentLink = that._config.collectionUrl + '/docs/' + id;
				
					that._client.deleteDocument(documentLink, options, 
						(error: QueryError, resource: any, responseHeaders: any): void => {
							if(error){
								reject(error);
							}
							resolve(resource);
					});
    		});

	}

}