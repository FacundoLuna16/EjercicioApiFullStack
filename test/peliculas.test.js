const request = require("supertest");
const app = require("../index")

const peliculaAlta = {
    titulo: "Titulo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),
    director : "Los Wachoski",
    year : "2023-05-25",
    rating : 10
};

const peliculaModificada = {
    id: 1,
    titulo:  "Titulo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),
    director : "Los Wachoski",
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
                    IdPelicula: expect.any(Number),
                    titulo: expect.any(String),
                    director: expect.any(String),
                    year: expect.any(String),
                    rating: expect.any(Number),
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
                    IdPelicula: expect.any(Number),
                    titulo: expect.any(String),
                    director: expect.any(String),
                    year: expect.any(String),
                    rating: expect.any(Number),
                }),
        );
    });
});

describe("POST /api/peliculas", () => {
    it("should create a movie and return the newly created movie", async () => {
  
      // Send a request to create the movie
      const res = await request(app).post("/api/peliculas").send(peliculaAlta);
  
      // Check the response status code
      expect(res.statusCode).toEqual(200);
  
      // Check the response body
      expect(res.body).toEqual(
        expect.objectContaining({
          IdPelicula: expect.any(Number),
          titulo: peliculaAlta.titulo,
          director: peliculaAlta.director,
          year: peliculaAlta.year,
          rating: peliculaAlta.rating,
        })
      );
    });
  
    it("should return an error if a movie with the same title already exists", async () => {
      // Create a movie object with an existing title
      const existingMovieData = {
        titulo: "Forrest Gump",
        director: "Jane Smith",
        year: "2019",
        rating: 7,
      };
  
      // Send a request to create a movie with the existing title
      const res = await request(app).post("/api/peliculas").send(existingMovieData);
  
      // Check the response status code
      expect(res.statusCode).toEqual(409);
  
      // Check the error message in the response body
      expect(res.body).toEqual(
        expect.objectContaining({
          error: "Movie with the same title already exists",
        })
      );
    });
  });

describe("PUT /api/peliculas/:id", () => {
    it("debería actualizar los detalles de una película y devolver un estado de éxito", async () => {
      // Crear una película para actualizar
      const pelicula = await db.peliculas.create({
        titulo: "Película antigua",
        director: "John Doe",
        year: "2022",
        rating: 8,
      });
  
      // Datos actualizados de la película
      const datosPeliculaActualizada = {
        titulo: "Nueva película",
        director: "Jane Smith",
        year: "2023",
        rating: 9,
      };
  
      // Enviar una solicitud para actualizar la película
      const res = await request(app)
        .put(`/api/peliculas/${pelicula.id}`)
        .send(datosPeliculaActualizada);
  
      // Comprobar el código de estado de respuesta
      expect(res.statusCode).toEqual(200);
  
      // Comprobar que los detalles de la película se hayan actualizado en la base de datos
      const peliculaActualizada = await db.peliculas.findByPk(pelicula.id);
      expect(peliculaActualizada.titulo).toEqual(datosPeliculaActualizada.titulo);
      expect(peliculaActualizada.director).toEqual(datosPeliculaActualizada.director);
      expect(peliculaActualizada.year).toEqual(datosPeliculaActualizada.year);
      expect(peliculaActualizada.rating).toEqual(datosPeliculaActualizada.rating);
    });
  
    it("debería devolver un error si el nuevo título de la película ya existe", async () => {
      // Crear dos películas con el mismo título
      const pelicula1 = await db.peliculas.create({
        titulo: "Película existente",
        director: "John Doe",
        year: "2022",
        rating: 8,
      });
  
      const pelicula2 = await db.peliculas.create({
        titulo: "Otra película",
        director: "Jane Smith",
        year: "2023",
        rating: 9,
      });
  
      // Intentar actualizar pelicula1 con el mismo título que pelicula2
      const datosPeliculaActualizada = {
        titulo: "Otra película",
        director: "John Doe",
        year: "2022",
        rating: 8,
      };
  
      // Enviar una solicitud para actualizar la película
      const res = await request(app)
        .put(`/api/peliculas/${pelicula1.id}`)
        .send(datosPeliculaActualizada);
  
      // Comprobar el código de estado de respuesta
      expect(res.statusCode).toEqual(409);
  
      // Comprobar el mensaje de error en el cuerpo de respuesta
      expect(res.body).toEqual(
        expect.objectContaining({
          message: "El nuevo título ya existe",
        })
      );
    });
  
    it("debería devolver un error 404 si el ID de la película no existe", async () => {
      // Intentar actualizar una película que no existe
      const datosPeliculaActualizada = {
        titulo: "Nueva película",
        director: "John Doe",
        year: "2022",
        rating: 8,
      };
  
      // Enviar una solicitud para actualizar la película
      const res = await request(app).put("/api/peliculas/123456").send(datosPeliculaActualizada);
  
      // Comprobar el código de estado de respuesta
      expect(res.statusCode).toEqual(404);
  
      // Comprobar el mensaje de error en el cuerpo de respuesta
      expect(res.body).toEqual(
        expect.objectContaining({
          message: "Película no encontrada",
        })
      );
    });
});
  

describe("DELETE /api/peliculas/:id", () => {
    it("deberia eliminar una pelicula y mostrar la que acaba de eliminar", async () => {
        const res = await request(app).delete("/api/peliculas/11");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdPelicula: expect.any(Number),
                titulo: expect.any(String),
                director: expect.any(String),
                year: expect.any(String),
                rating: expect.any(Number)
            }),
        );
    });
});