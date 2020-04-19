const supertest = require('supertest');
//const app = require('../app');
const app = 'http://192.168.0.87:8080';

describe("Testing the FixerLocation API ENDPOINT", () => {

	it("tests to update fixer location with data", async () => {

		const response = await supertest(app).post('/fixersLocation/updateFixersLoc').send({
			postId: "1234",
            fixerId: "1234",
            latitude: "123",
            longitude: "123"
		});     
        expect(response.status).toBe(404);
    });
    //////////////////////////////////////////////////////////////

    it("tests to get previous location of fixer with data", async () => {

		const response = await supertest(app).post('/fixersLocation/getFixersPreviousLoc').send({
            fixerId: "1234"
		});     
        expect(response.status).toBe(500);
    });
});