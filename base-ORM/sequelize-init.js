// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite:" + "./.data/recursos.db");
// definicion del modelo de datos


const series = sequelize.define('series', {
  IdSerie: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Titulo: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  Director: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Year: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  CantTemporadas: {
    type: DataTypes.INTEGER
  },
  Episodios: {
    type: DataTypes.INTEGER
  }
},
{
  // pasar a mayusculas
  hooks: {
    beforeValidate: function (series, options) {
      if (typeof series.Titulo === "string") {
        series.Titulo = series.Titulo.toUpperCase();
      }
    },
  },

  timestamps: false,
}
);



const peliculas = sequelize.define('peliculas', {
  IdPelicula: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 10
    }
  }
},
{timestamps: false});

module.exports = {
  series,
  sequelize,
  peliculas
};
