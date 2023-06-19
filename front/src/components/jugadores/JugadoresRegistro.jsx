import React from "react";
import { useForm } from "react-hook-form";

export default function JugadoresRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };
  console.log(Item);
  if (!Item) return null;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("nombre", {
                  required: { value: true, message: "Nombre es requerido" },
                  minLength: {
                    value: 4,
                    message: "Nombre debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Nombre debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.nombre ? "is-invalid" : "")
                }
              />
              {errors?.nombre && touchedFields.nombre && (
                <div className="invalid-feedback">
                  {errors?.nombre?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo pais */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="pais">
                País<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("pais", {
                  required: { value: true, message: "País es requerido" },
                  minLength: {
                    value: 4,
                    message: "País debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "País debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.pais ? "is-invalid" : "")
                }
              />
              {errors?.pais && touchedFields.pais && (
                <div className="invalid-feedback">
                  {errors?.pais?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo fechaNac */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fechaNacimiento">
                Fecha de Nacimiento<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fechaNacimiento", {
                  required: { message: "Fecha de Nacimiento es requerida" }
                })}
                className={
                  "form-control " + (errors?.fechaNacimiento ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.fechaNacimiento?.message}
              </div>
            </div>
          </div>

          {/* campo eloMax */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="eloMax">
                Elo Máximo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("eloMax", {
                  required: {
                    value: true,
                    message: "Elo Máximo es requerido",
                  },
                })}
                className={
                  "form-control" + (errors?.eloMax ? " is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.eloMax?.message}
              </div>
            </div>
          </div>

          {/* campo fechaEloMax */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fechaEloMax">
                Fecha de Elo Máximo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="date"
                {...register("fechaEloMax", {
                  required: { message: "Fecha de Elo Máximo es requerida" }
                })}
                className={
                  "form-control " + (errors?.fechaEloMax ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.fechaEloMax?.message}
              </div>
            </div>
          </div>

        </fieldset>


        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}

      </div>
    </form>
  );
}
