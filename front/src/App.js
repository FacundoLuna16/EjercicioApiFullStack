import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";


import Menu from "./components/Menu";
import { Footer } from "./components/Footer";
import { Inicio } from "./components/Inicio";



function App() {
  

  return (
    <>
        <BrowserRouter>
          <Menu />
          <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              {/* <Route
                path="/peliculas"
                element={<ArticulosFamilias />}
              />
              <Route path="/jugadores" element={<Articulos />} />
              <Route
                path="/series"
                element={
                  <RequireAuth>
                    <ArticulosJWT />
                  </RequireAuth>
                }
              />
              <Route
                path="/climas"
                element={
                  <Login />
                }
              /> */}
              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    </>
  );
}

export default App;
