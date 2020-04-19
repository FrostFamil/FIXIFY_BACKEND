const supertest = require('supertest');
//const app = require('../app');
const app = 'http://192.168.0.87:8080';

describe("Testing the authentication API ENDPOINT", () => {

	it("tests the user login route with data", async () => {

		const response = await supertest(app).post('/auth/login').send({
			email: "s.famil@box.az",
	        password: "secret"
		});     
        expect(response.status).toBe(200);
    });
    /////////////////////////////////////////////////////////
    it("tests the fixer login route with data", async () => {

		const response = await supertest(app).post('/auth/fixerLogin').send({
			email: "emin@box.az",
	        password: "secret"
		});     
        expect(response.status).toBe(200);
    });
    /////////////////////////////////////////////////////////
    it("tests the user register route with data", async () => {

		const response = await supertest(app).post('/auth/signup').send({
            email: "s.fami",
            firstName: "emin",
            lastName: "ahmedov",
            phone: "1234",
	        password: "secret"
		});     
        expect(response.status).toBe(404);
    });
    /////////////////////////////////////////////////////////
    it("tests the fixer register route with data", async () => {

		const response = await supertest(app).post('/auth/fixerSignup').send({
            email: "emin",
            firstName: "emin",
            lastName: "ahmedov",
            phone: "1234",
	        password: "secret"
		});     
        expect(response.status).toBe(404);
    });
    /////////////////////////////////////////////////////////
    it("tests to get user profile", async () => {

		const response = await supertest(app).post('/auth/profile').send({
            userId: "5e398623085df633a4418723",
		});     
        expect(response.status).toBe(200);
    });
    /////////////////////////////////////////////////////////
    it("tests to get fixer profile", async () => {

		const response = await supertest(app).post('/auth/fixerProfile').send({
            fixerId: "5e3ca0037ab51b230ae9f1e3",
		});     
        expect(response.status).toBe(200);
    });
    /////////////////////////////////////////////////////////
    it("tests to add card for user profile", async () => {

		const response = await supertest(app).post('/auth/addCard').send({
            creatorOfCard: "55398623085df633a4418723",
		});     
        expect(response.status).toBe(500);
    });
    /////////////////////////////////////////////////////////
    it("tests to add card for user profile", async () => {

		const response = await supertest(app).post('/auth/addCard').send({
            creatorOfCard: "55398623085df633a4418723",
		});     
        expect(response.status).toBe(500);
    });
    /////////////////////////////////////////////////////////
    it("tests to get saved cards for user profile", async () => {

		const response = await supertest(app).post('/auth/getCards').send({
            creatorOfCard: "55398623085df633a4418723",
		});     
        expect(response.status).toBe(500);
    });
    /////////////////////////////////////////////////////////
    it("tests to update user profile", async () => {

		const response = await supertest(app).post('/auth/updateUserProfile').send({
            userId: "55398623085df633a4418723",
            email: "s.famil@box.az",
            firstName: "emin",
            lastName: "ahmedov",
            phone: "1234",
	        password: "secret"
		});     
        expect(response.status).toBe(500);
    });
    /////////////////////////////////////////////////////////
    it("tests to update fixer profile", async () => {

		const response = await supertest(app).post('/auth/updateFixerProfile').send({
            fixerId: "55398623085df633a4418723",
            email: "s.famil@box.az",
            firstName: "emin",
            lastName: "ahmedov",
            phone: "1234",
	        password: "secret"
		});     
        expect(response.status).toBe(500);
    });

});