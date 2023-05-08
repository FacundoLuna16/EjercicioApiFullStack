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
        "CREATE table Peliculas( IdPelicula INTEGER PRIMARY KEY AUTOINCREMENT, titulo text NOT NULL UNIQUE, director text NOT NULL, year INTEGER NOT NULL, rating INTEGER CHECK (rating >= 0 AND rating <= 10));"
        );
        console.log("tabla Peliculas creada!");

        await db.run(
            `INSERT INTO Peliculas values 
            ('El Padrino', 'Francis Ford Coppola', 1972, 9),
            ('La lista de Schindler', 'Steven Spielberg', 1993, 8),
            ('El Señor de los Anillos: El Retorno del Rey', 'Peter Jackson', 2003, 10),
            ('Forrest Gump', 'Robert Zemeckis', 1994, 7),
            ('El caballero de la noche', 'Christopher Nolan', 2008, 9),
            ('Star Wars: Episodio IV - Una Nueva Esperanza', 'George Lucas', 1977, 8),
            ('El silencio de los corderos', 'Jonathan Demme', 1991, 9),
            ('Pulp Fiction', 'Quentin Tarantino', 1994, 8),
            ('Volver al futuro', 'Robert Zemeckis', 1985, 7),
            ('Los siete samuráis', 'Akira Kurosawa', 1954, 10);`);
    }

    // cerrar la base
    db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;