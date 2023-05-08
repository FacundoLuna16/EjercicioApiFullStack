// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
    await db.open("./.data/recursos.db");

    let existe = false;
    let res = null;

    res = await db.get("SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Peliculas'",[]);

    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run(
        "CREATE table Peliculas( IdPelicula INTEGER PRIMARY KEY AUTOINCREMENT, titulo text NOT NULL UNIQUE, director text NOT NULL, year DATE NOT NULL, rating INTEGER CHECK (rating >= 0 AND rating <= 10));"
        );
        console.log("tabla Peliculas creada!");

        await db.run(
            `INSERT INTO Peliculas (titulo, director, year, rating) VALUES
            ('El Padrino', 'Francis Ford Coppola', '1972-03-24', 9),
            ('La lista de Schindler', 'Steven Spielberg', '1993-12-15', 8),
            ('El Señor de los Anillos: El Retorno del Rey', 'Peter Jackson', '2003-12-01', 10),
            ('Forrest Gump', 'Robert Zemeckis', '1994-07-06', 7),
            ('El caballero de la noche', 'Christopher Nolan', '2008-07-18', 9),
            ('Star Wars: Episodio IV - Una Nueva Esperanza', 'George Lucas', '1977-05-25', 8),
            ('El silencio de los corderos', 'Jonathan Demme', '1991-02-14', 9),
            ('Pulp Fiction', 'Quentin Tarantino', '1994-09-23', 8),
            ('Volver al futuro', 'Robert Zemeckis', '1985-07-03', 7),
            ('Los siete samuráis', 'Akira Kurosawa', '1954-04-26', 10);`);
    }

    existe = false;
    res = await db.get("SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Series'",[]);
    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run("CREATE table Series( IdSerie INTEGER PRIMARY KEY AUTOINCREMENT, Titulo text NOT NULL UNIQUE,Director text NOT NULL, Year DATE NOT NULL ,CantTemporadas INT, Episodios INT);");
    console.log("tabla Series creada!");
    await db.run(
        `INSERT INTO Series (Titulo, Director, Year, CantTemporadas, Episodios) VALUES 
        ('Juego de Tronos', 'David Benioff y D. B. Weiss', '2011-04-17', 8, 73),
        ('Breaking Bad', 'Vince Gilligan', '2008-01-20', 5, 62),
        ('Friends', 'David Crane y Marta Kauffman', '1994-09-22', 10, 236),
        ('Stranger Things', 'The Duffer Brothers', '2016-07-15', 4, 34),
        ('The Crown', 'Peter Morgan', '2016-11-04', 4, 40),
        ('Narcos', 'Chris Brancato, Carlo Bernard y Doug Miro', '2015-08-28', 3, 30),
        ('House of Cards', 'Beau Willimon', '2013-02-01', 6, 73),
        ('Orange Is the New Black', 'Jenji Kohan', '2013-07-11', 7, 91),
        ('The Big Bang Theory', 'Chuck Lorre y Bill Prady', '2007-09-24', 12, 279),
        ('The Walking Dead', 'Frank Darabont', '2010-10-31', 11, 177);`
    );
  }

    // cerrar la base
    db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;