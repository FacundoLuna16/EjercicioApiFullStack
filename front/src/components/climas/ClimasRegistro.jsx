import React from "react";
import { useForm } from "react-hook-form";

export default function ClimasRegistro({
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

          {/* campo Maxima */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="Maxima">
                        Maxima<span className="number-danger">*</span>:
                </label>
            </div>
            <div className="col-sm-8 col-md-6">
                    <input
                        type="number"
                        {...register("Maxima", {
                            required: { value: true, message: "Maxima es requerido" },
                            min: {
                                value: 0,
                                message: "Maxima debe ser mayor a 0",
                            },
                            max: {
                                value: 100,
                                message: "Maxima debe ser menor a 100",
                            },
                        })}
                        autoFocus
                        className={
                            "form-control " + (errors?.Maxima ? "is-invalid" : "")
                        }
                    />
                    {errors?.Maxima && touchedFields.Maxima && (
                        <div className="invalid-feedback">
                            {errors?.Maxima?.message}
                        </div>
                    )}
                </div>
            </div>

            {/* campo Minima */}
            <div className="row">
                <div className="col-sm-4 col-md-3 offset-md-1">
                    <label className="col-form-label" htmlFor="Minima">
                        Minima<span className="number-danger">*</span>:
                    </label>
                </div>
                <div className="col-sm-8 col-md-6">
                    <input
                        type="number"
                        {...register("Minima", {
                            required: { value: true, message: "Minima es requerido" },
                            min: {
                                value: 0,
                                message: "Minima debe ser mayor a 0",
                            },
                            max: {
                                value: 100,
                                message: "Minima debe ser menor a 100",
                            },
                        })}
                        autoFocus
                        className={
                            "form-control " + (errors?.Minima ? "is-invalid" : "")
                        }
                    />
                    {errors?.Minima && touchedFields.Minima && (
                        <div className="invalid-feedback">
                            {errors?.Minima?.message}
                        </div>
                    )}
                </div>
            </div>

            {/* campo Fecha */}
            <div className="row">
                <div className="col-sm-4 col-md-3 offset-md-1">
                    <label className="col-form-label" htmlFor="Fecha">
                        Fecha<span className="text-danger">*</span>:
                    </label>
                </div>
                <div className="col-sm-8 col-md-6">
                    <input
                        type="date"
                        {...register("Fecha", {
                            required: { value: true, message: "Fecha es requerido" },
                        })}
                        autoFocus
                        className={
                            "form-control " + (errors?.Fecha ? "is-invalid" : "")
                        }
                    />
                    {errors?.Fecha && touchedFields.Fecha && (
                        <div className="invalid-feedback">
                            {errors?.Fecha?.message}
                        </div>
                    )}
                </div>
            </div>

            {/* campo Lluvia */}
            <div className="row">
                <div className="col-sm-4 col-md-3 offset-md-1">
                    <label className="col-form-label" htmlFor="Lluvia">
                        Lluvia<span className="text-danger">*</span>:
                    </label>
                </div>
                <div className="col-sm-8 col-md-6">
                    <input
                        type="text"
                        {...register("Lluvia", {
                            required: { value: true, message: "Lluvia es requerido" },
                            minLength: {
                                value: 2,
                                message: "Lluvia debe tener al menos 2 caracteres",
                            },
                        })}
                        autoFocus
                        className={
                            "form-control " + (errors?.Lluvia ? "is-invalid" : "")
                        }
                    />
                    {errors?.Lluvia && touchedFields.Lluvia && (
                        <div className="invalid-feedback">
                            {errors?.Lluvia?.message}
                        </div>
                    )}
                </div>
            </div>

            {/* campo Humedad */}
            <div className="row">
                <div className="col-sm-4 col-md-3 offset-md-1">
                    <label className="col-form-label" htmlFor="Humedad">
                        Humedad<span className="number-danger">*</span>:
                    </label>
                </div>
                <div className="col-sm-8 col-md-6">
                    <input
                        type="number"
                        {...register("Humedad", {
                            required: { value: true, message: "Humedad es requerido" },
                            min: {
                                value: 0,
                                message: "Humedad debe ser mayor a 0",
                            },
                            max: {
                                value: 100,
                                message: "Humedad debe ser menor a 100",
                            },
                        })}
                        className={
                            "form-control" + (errors?.Humedad ? " is-invalid" : "")
                          }
                        />
                        <div className="invalid-feedback">
                          {errors?.Humedad?.message}
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

    

 