import React, { Fragment, useState, useEffect } from "react";
import Formulario from "../src/components/Formulario";
import Cita from "../src/components/Cita";

function App() {
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  const [citas, guardarCitas] = useState(citasIniciales);

  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas]);

  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  const titulo =
    citas && citas.length === 0 ? "No existen Citas" : "Administra tus citas";

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">1</div>
          <Formulario crearCita={crearCita} />
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas &&
              citas.map((cita) => (
                <Cita cita={cita} key={cita.id} eliminarCita={eliminarCita} />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
