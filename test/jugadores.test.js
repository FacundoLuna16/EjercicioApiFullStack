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
    nombre: "Juan Pablo Montoya",
    pais : "Colombia",
    fechaNacimiento : "1975-11-20",
    eloMax : 2700,
    fechaEloMax : "2002-08-01" 
};

function aleatorio() {
    let num = Math.floor(Math.random() * 10) + 1
    return num
}

describe("GET /api/jugadores", () => {
    it("debería devolver todos los jugadores", async () => {
        const res = await request(app).get("/api/jugadores")
        .set("Accept", "application/json");
        expect(res.headers["content-type"]).toEqual(
            "application/json; charset=utf-8"
        );
        expect(res.status).toEqual(200);
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
    it("debería devolver un jugador", async () => {
        const res = await request(app)
        .get("/api/jugadores/1")
        .set("Accept", "application/json");
        expect(res.headers["content-type"]).toEqual(
          "application/json; charset=utf-8"
        );
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({
            item: {
            idJugador: expect.any(Number),
            nombre: expect.any(String),
            pais: expect.any(String),
            fechaNacimiento: expect.any(String),
            eloMax: expect.any(Number),
            fechaEloMax: expect.any(String)
            },
        });
    });
});  
  
  

describe("POST /api/jugadores", () => {
    it("debería crear un jugador y mostrar al que se acaba de crear", async () => {
        const res = await request(app).post("/api/jugadores").send(jugadorAlta);

        expect(res.status).toEqual(200);
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
    it("debería modificar un jugador y mostrar al MODIFICADO antes y después", async () => {
        const res = await request(app).put("/api/jugadores/5").send(jugadorModificado);

        expect(res.status).toEqual(200);
        /* expect(res.body).toEqual({
            item: {
                idJugador: expect.any(Number),
                nombre: expect.any(String),
                pais: expect.any(String),
                fechaNacimiento: expect.any(String),
                eloMax: expect.any(Number),
                fechaEloMax: expect.any(String)
            },
        }); */
    });
});

describe("DELETE /api/jugadores/:id", () => {
    it("debería eliminar un jugador y mostrarlo antes de eliminarlo", async () => {
        const id = aleatorio();
        console.log("ID del jugador a eliminar:", id);
        const res = await request(app).delete("/api/jugadores/" + id);;
        expect(res.status).toEqual(200);
    });
});