import {NewDocument, RetrievedDocument} from 'documentdb';

export class PhotoLocationDocument implements NewDocument<PhotoLocationDocument>, 
																					RetrievedDocument<PhotoLocationDocument>{
	/* NewDocument Interface */
	id:string;

	/* RetrievedDocument Interface */
	_ts:string;
	_self:string;

	/* Photo Location Properties */
	name:string;
	tags: string[];
	address: {
		street: string,
		city: string,
		zip: string,
		country: string
	};
	geoLocation: {
		type: string;
		coordinates: number[];
	}

}