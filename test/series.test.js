const request = require('supertest');
const app = require('../index');

const serieAlta = {
    Titulo: "Dark",
    Director: "Baran bo Odar",
    Anio: 2010,
    CantTemporadas: 10,
    Episodios: 147
};

const serieModificada = {
    Titulo: "Deutschland 83",
    Director: "Anna Winger",
    Anio: 2010,
    CantTemporadas: 10,
    Episodios: 147
};



describe("GET /api/series", () => {
    it("deberia devolver todas las series", async () => {
        const res = await request(app)
            .get("/api/series")
            .set("Accept", "application/json");
        expect(res.headers["content-type"]).toEqual(
            "application/json; charset=utf-8"
        );
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    IdSerie: expect.any(Number),
                    Titulo: expect.any(String),
                    Director: expect.any(String),
                    Anio: expect.any(String),
                    CantTemporadas: expect.any(Number),
                    Episodios: expect.any(Number)
                }),
            ])
        );
    });
});


describe("GET /api/series/:id", () => {
    it("deberia devolver una serie", async () => {
        const res = await request(app)
            .get("/api/series/2")
            .set("Accept", "application/json");
        expect(res.headers["content-type"]).toEqual(
            "application/json; charset=utf-8"
        );
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({
            item: {
                IdSerie: expect.any(Number),
                Titulo: expect.any(String),
                Director: expect.any(String),
                Anio: expect.any(String),
                CantTemporadas: expect.any(Number),
                Episodios: expect.any(Number)
            },
        });
    });
});


describe("POST /api/series", () => {
    it("deberia crear una serie", async () => {
        const serieAlta = {
            Titulo: "Nueva Serie",
            Director: "Director de la Nueva Serie",
            Anio: "2022-01-01",
            CantTemporadas: 3,
            Episodios: 30
        };

        const res = await request(app)
            .post("/api/series")
            .send(serieAlta);

        expect(res.status).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdSerie: expect.any(Number),
                Titulo: expect.any(String),
                Director: expect.any(String),
                Anio: expect.any(String),
                CantTemporadas: expect.any(Number),
                Episodios: expect.any(Number)
            })
        );
    });
});


describe("PUT /api/series/:id", () => {
    it("deberia actualizar una serie", async () => {
        const res = await request(app)
            .put("/api/series/2")
            .send(serieModificada);
        expect(res.status).toEqual(200);
    });
});

describe("DELETE /api/series/:id", () => {
    it("deberia eliminar una serie", async () => {
        const res = await request(app)
            .delete("/api/series/1");
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({}); // Espera un objeto vacío como respuesta
    });
});
