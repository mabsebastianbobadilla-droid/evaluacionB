import express from "express";
import cors from "cors";
import rutaVehiculos from "./src/modules/vehiculo/vehiculo.routes.js";

const app = express();
const port = 4100;

app.use(express.json());
app.use(cors());

app.use("/api/vehiculos", rutaVehiculos);

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

export default app;