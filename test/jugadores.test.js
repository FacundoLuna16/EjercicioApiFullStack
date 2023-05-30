const request = require("supertest");
const app = require("../index")

const jugadorAlta = {
    nombre: "Pepe Cuenca",
    pais : "España",
    fechaNacimiento : "1987-03-17",
    eloMax : 2548,
    fechaEloMax : "2019-05-01" 
};

const jugadorModificado = {
    idJugador: 1,
    nombre: "Juan Pablo Montoya",
    pais : "Colombia",
    fechaNacimiento : "1975-11-20",
    eloMax : 2700,
    fechaEloMax : "2002-08-01" 
};


describe("GET /api/jugadores", () => {
    it("deberia devolver todos los jugadores", async () => {
        const res = await request(app).get("/api/jugadores");
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    idJugador: expect.any(Number),
                    nombre: expect.any(String),
                    pais : expect.any(String),
                    fechaNacimiento : expect.any(String),
                    eloMax : expect.any(Number),
                    fechaEloMax : expect.any(String)
                }),
            ])
        );
    });
});

describe("GET /api/jugador/:id", () => {
    it("deberia devolver un jugador", async () => {
        const res = await request(app).get("/api/jugadores/1");
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
            expect.objectContaining({
                idJugador: expect.any(Number),
                nombre: expect.any(String),
                pais : expect.any(String),
                fechaNacimiento : expect.any(String),
                eloMax : expect.any(Number),
                fechaEloMax : expect.any(String)
            }),
        );
    });
});

describe("POST /api/jugadores", () => {
    it("deberia crear un jugador y mostrar al que acaba de crear", async () => {
        const res = await request(app).post("/api/jugadores").send({jugadorAlta});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                idJugador: expect.any(Number),
                nombre: expect.any(String),
                pais : expect.any(String),
                fechaNacimiento : expect.any(String),
                eloMax : expect.any(Number),
                fechaEloMax : expect.any(String)
            }),
        );
    });
});

describe("PUT /api/jugadores/:id", () => {
    it("deberia modificar un jugador y mostrar al que acaba de modificar", async () => {
        const res = await request(app).put("/api/jugadores/1").send({jugadorModificado});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                idJugador: expect.any(Number),
                nombre: expect.any(String),
                pais : expect.any(String),
                fechaNacimiento : expect.any(String),
                eloMax : expect.any(Number),
                fechaEloMax : expect.any(String)
            }),
        );
    });
});

describe("DELETE /api/jugadores/:id", () => {
    it("deberia eliminar un jugador y mostrar al que acaba de eliminar", async () => {
        const res = await request(app).delete("/api/jugadores/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                idJugador: expect.any(Number),
                nombre: expect.any(String),
                pais : expect.any(String),
                fechaNacimiento : expect.any(String),
                eloMax : expect.any(Number),
                fechaEloMax : expect.any(String)
            }),
        );
    });
});