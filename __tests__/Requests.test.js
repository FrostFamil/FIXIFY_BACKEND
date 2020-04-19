const supertest = require('supertest');
//const app = require('../app');
const app = 'http://192.168.0.87:8080';

describe("Testing the Requests API ENDPOINT", () => {

	it("tests to get not accepted requests", async () => {

		const response = await supertest(app).post('/requests/getNotAcceptedRequest').send({
			creator: "5e398623085df633a4418723",
		});     
        expect(response.status).toBe(200);
    });
    //////////////////////////////////////////////////////////////

    it("tests to get pending requests", async () => {

		const response = await supertest(app).post('/requests/getPendingRequest').send({
			creator: "5e398623085df633a4418723",
		});     
        expect(response.status).toBe(200);
    });
    //////////////////////////////////////////////////////////////

    it("tests to get accepted requests", async () => {

		const response = await supertest(app).post('/requests/getAcceptedRequest').send({
			creator: "5e398623085df633a4418723",
		});     
        expect(response.status).toBe(200);
    });
    //////////////////////////////////////////////////////////////

    it("tests to get finished requests", async () => {

		const response = await supertest(app).post('/requests/getFinishedRequest').send({
			creator: "5e398623085df633a4418723",
		});     
        expect(response.status).toBe(200);
    });
    //////////////////////////////////////////////////////////////

    it("tests for fixer to get related requests", async () => {

		const response = await supertest(app).post('/requests/fixerGetAllRelatedRequest').send({
			serviceType: "Technology",
		});     
        expect(response.status).toBe(200);
    });
    //////////////////////////////////////////////////////////////

    it("tests for fixer to get pending requests", async () => {

		const response = await supertest(app).post('/requests/fixerGetPendingRequest').send({
			acceptor: "5e3ca0037ab51b230ae9f1e3",
		});     
        expect(response.status).toBe(200);
    });
    //////////////////////////////////////////////////////////////

    it("tests for fixer to get finished requests", async () => {

		const response = await supertest(app).post('/requests/getAllHistoriesOfFixer').send({
			acceptor: "5e3ca0037ab51b230ae9f1e3",
		});     
        expect(response.status).toBe(200);
    });
    //////////////////////////////////////////////////////////////

    it("tests for user to finish request", async () => {

		const response = await supertest(app).post('/requests/userFinishRequest').send({
			requestIndex: "123",
		});     
        expect(response.status).toBe(500);
    });
    //////////////////////////////////////////////////////////////

    it("tests for fixer to accept request", async () => {

		const response = await supertest(app).post('/requests/acceptRequest').send({
            requestIndex: "123",
            fixerId: "1234"
		});     
        expect(response.status).toBe(500);
    });
    //////////////////////////////////////////////////////////////

    it("tests for fixer to see request", async () => {

		const response = await supertest(app).post('/requests/seeRequest').send({
            requestIndex: "5e50565deb12951a8439539c",
		});     
        expect(response.status).toBe(200);
    });
    //////////////////////////////////////////////////////////////

    it("tests for user to find his request", async () => {

		const response = await supertest(app).post('/requests/userFindHisRequest').send({
            creator: "5e398623085df633a4418723",
		});     
        expect(response.status).toBe(201);
    });
    //////////////////////////////////////////////////////////////

    it("tests for user to see fixer on map", async () => {

		const response = await supertest(app).post('/requests/userSeeFixer').send({
            fixerId: "5e3ca0037ab51b230ae9f1e3",
		});     
        expect(response.status).toBe(200);
    });
    //////////////////////////////////////////////////////////////

    it("tests for user to delete request", async () => {

		const response = await supertest(app).post('/requests/deleteCurrentrequest').send({
            requestId: "1234",
		});     
        expect(response.status).toBe(500);
    });
    //////////////////////////////////////////////////////////////

    it("tests for fixer to set price for request", async () => {

		const response = await supertest(app).post('/requests/fixerSetPriceForRequest').send({
            requestIndex: "1234",
            price: "20",
            fixerId: "1234"
		});     
        expect(response.status).toBe(500);
    });
    //////////////////////////////////////////////////////////////

    it("tests for user to accept setted price for request", async () => {

		const response = await supertest(app).post('/requests/userAcceptPriceForRequest').send({
            requestId: "1234",
		});     
        expect(response.status).toBe(500);
    });
    //////////////////////////////////////////////////////////////

    it("tests for user to decline setted price for request", async () => {

		const response = await supertest(app).post('/requests/userDeclinePriceForRequest').send({
            requestId: "1234",
		});     
        expect(response.status).toBe(500);
    });
    //////////////////////////////////////////////////////////////
});