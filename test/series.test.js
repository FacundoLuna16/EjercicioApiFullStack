const request = require('supertest');
const app = require('../index');

const serieAlta = {
    Titulo: "Dark",
    Director: "Baran bo Odar",
    Year: 2010,
    CantTemporadas: 10,
    Episodios: 147
};

const serieModificada = {
    IdSerie: 1,
    Titulo: "Deutschland 83",
    Director: "Anna Winger",
    Year: 2010,
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
                    Year: expect.any(Number),
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
        .get("/api/series/1");
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdSerie: expect.any(Number),
                Titulo: expect.any(String),
                Director: expect.any(String),
                Year: expect.any(Number),
                CantTemporadas: expect.any(Number),
                Episodios: expect.any(Number)
            })
        );
    });
});

describe("POST /api/series", () => {
    it("deberia crear una serie", async () => {
        const res = await request(app).post("/api/series").send(serieAlta);
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdSerie: expect.any(Number),
                Titulo: expect.any(String),
                Director: expect.any(String),
                Year: expect.any(Number),
                CantTemporadas: expect.any(Number),
                Episodios: expect.any(Number)
            })
        );
    });
});

describe("PUT /api/series/:id", () => {
    it("deberia actualizar una serie", async () => {
        const res = await request(app).put("/api/series/1").send(serieModificada);
        expect(res.status).toEqual(200);
    });
});

describe("DELETE /api/series/:id", () => {
    it("deberia eliminar una serie", async () => {
        const res = await request(app).delete("/api/series/1");
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdSerie: expect.any(Number),
                Titulo: expect.any(String),
                Director: expect.any(String),
                Year: expect.any(Number),
                CantTemporadas: expect.any(Number),
                Episodios: expect.any(Number)
            })
        );
    });
});






