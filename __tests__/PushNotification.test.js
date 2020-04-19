const supertest = require('supertest');
//const app = require('../app');
const app = 'http://192.168.0.87:8080';

describe("Testing the Push Notification API ENDPOINT", () => {

	it("tests to get fixers push token", async () => {

		const response = await supertest(app).post('/notification/getFixersToken').send({
			serviceType: "Technology",
		});     
        expect(response.status).toBe(200);
    });
    //////////////////////////////////////////////////////////////

    it("tests to get users push token", async () => {

		const response = await supertest(app).post('/notification/getUsersToken').send({
            userId: "5e398623085df633a4418723",
		});     
        expect(response.status).toBe(200);
    });
});