
export class LocationDataConfig{

	/* Default HOST for the DocumentDb Emulator */
	host:string = process.env.HOST || "https://localhost:8081/";

	/* Default Auth Key is the Azure DocumentDb Emulator Auth Key */
	authKey:string = process.env.AUTH_KEY || "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";
	
	/* The database and collection will need to be created by hand */
	database: string = 'photolocations';
	collection: string; 'locations'
	collectionUrl: string = 'dbs/photolocations/colls/locations' ;

	/* ConnectionPolicy: There is a default connection policy but the emulator required EnableEndpointDiscovery: false
	so I found through trial and error these were the minimum set of settings that had to be set when using the ConnectionPolicy */
    connectionPolicy: any = {
    	EnableEndpointDiscovery: false,
    	MaxConcurrentFanoutRequests: 32,
    	MaxConnectionLimit: 50,
		MediaRequestTimeout: 5000,
    	RequestTimeout: 60000,
		RetryOptions: {
			MaxRetryAttemptsOnThrottledRequests: 9,
   		 	MaxRetryWaitTimeInSeconds: 30,
    		maxRetryAttemptsOnThrottledRequests: 9,
    		maxRetryWaitTime: 30,
		}
	}

}