const request = require("supertest");
const app = require("../index")

const peliculaAlta = {
    titulo: "Atlas",
    director : "Los Wachoski",
    // year en tipo date
    year : 2000,
    rating : 10
};

const peliculaModificada = {
    id: 1,
    titulo: "Atlas",
    director : "Los Wachoski",
    // year en tipo date
    year : 2000,
    rating : 10
};



describe("GET /api/peliculas", () => {
    it("deberia devolver todas las peliculas", async () => {
        const res = await request(app).get("/api/peliculas");
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    titulo: expect.any(String),
                    director : expect.any(String),
                    year : expect.any(Number),
                    rating : expect.any(Number)
                }),
            ])
        );
    });
});

describe("GET /api/peliculas/:id", () => {
    it("deberia devolver todas las peliculas", async () => {
        const res = await request(app).get("/api/peliculas/1");
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    titulo: expect.any(String),
                    director : expect.any(String),
                    year : expect.any(Number),
                    rating : expect.any(Number)
                }),
        );
    });
});

describe("POST /api/peliculas", () => {
    it("deberia crear una pelicula y mostrar la que acaba de crear", async () => {
        const res = await request(app).post("/api/peliculas").send({peliculaAlta});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                titulo: expect.any(String),
                director : expect.any(String),
                year : expect.any(Number),
                rating : expect.any(Number)
            }),
        );
    });
});

describe("PUT /api/peliculas/:id", () => {
    it("deberia modificar una pelicula y mostrar la que acaba de modificar", async () => {
        const res = await request(app).put("/api/peliculas/1").send({peliculaModificada});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                titulo: expect.any(String),
                director : expect.any(String),
                year : expect.any(Number),
                rating : expect.any(Number)
            }),
        );
    });
});

describe("DELETE /api/peliculas/:id", () => {
    it("deberia eliminar una pelicula y mostrar la que acaba de eliminar", async () => {
        const res = await request(app).delete("/api/peliculas/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                titulo: expect.any(String),
                director : expect.any(String),
                year : expect.any(Number),
                rating : expect.any(Number)
            }),
        );
    });
});