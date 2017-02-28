import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

/*
	Service Test Plans to ensure the service is working
	and operations are working against DocumentDB. 
	Simple Smoke Testing.
	Not the best of designs and could use some additional before\after 
	functions to manage setup\cleanup.
*/
describe('Photo Location Service', function(){

	var sampleData: any;

	/* We need some test data to work with for our tests */
	before(function(done){

			var sampledata: any = {
					name: "Yosemite National Park Test",
					tags: ["Park", "National Park", "Waterfalls"],
					address: {
						street: "",
						city: "Yosemite National Park",
						state: "CA",
						zip:"95389",
						country:"United STates"
					},
					geoLocation:{
						type:"point",
						coordinates: [37.865101,-119.538330]
					}
				}

				chai.request(app).post('/api/v1/photolocations')
					.set('content-type','application/json')
					.send(sampledata)
					.then(res => {
							sampleData = res.body;
							done();
				});

	});

	/*  NEW Document Test */
	it('create a new photo location', () =>{

		var testdata: any = {
					name: "Yosemite National Park Test",
					tags: ["Park", "National Park", "Waterfalls"],
					address: {
						street: "",
						city: "Yosemite National Park",
						state: "CA",
						zip:"95389",
						country:"United STates"
					},
					geoLocation:{
						type:"point",
						coordinates: [37.865101,-119.538330]
					}
			}

		return chai.request(app).post('/api/v1/photolocations')
			.set('content-type','application/json')
			.send(testdata)
			.then(res => {
					expect(res.status).to.equals(200);
					expect(res).to.be.json;
					expect(res.body).to.be.an('object');
					expect(res.body.name).to.equal('Yosemite National Park Test');

					//Clean up the records
					chai.request(app).del('/api/v1/photolocations' + res.body.id)
					.then(res => {});
			});

	});

	//GET Document Request 
	it('get a photo location', () =>{
				return chai.request(app).get('/api/v1/photolocations/' + sampleData.id)
					.then(res => {
						expect(res.status).to.equals(200);
						expect(res).to.be.json;
						expect(res.body).to.be.an('object');
						expect(res.body.name).to.equal(sampleData.name);
					});

	});

	//UPDATE Document Request
	it('updates a new photo location', () =>{

		sampleData.name = sampleData.name + ' _ update test';

		return chai.request(app).put('/api/v1/photolocations')
			.set('content-type','application/json')
			.send(sampleData)
			.then(res => {
					expect(res.status).to.equals(200);
					expect(res).to.be.json;
					expect(res.body).to.be.an('object');
					expect(res.body.name).to.equal(sampleData.name);
			});
	});

	//DELETE Document 
	it('delete photo location', () =>{
	
		return chai.request(app).del('/api/v1/photolocations/' + sampleData.id)
			.set('content-type','application/json')
			.then(res => {
					expect(res.status).to.equals(204);
			});

	});

});


