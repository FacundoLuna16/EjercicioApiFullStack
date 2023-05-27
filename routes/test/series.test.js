const request = require('supertest');
const app = require('../index');

describe("GET /api/series", () => {
    it("deberia devolver todas las series", async () => {
        const res = await request(app)
    })

});





