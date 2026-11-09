import { Router } from "express";
import * as vehiculoCtr from "./vehiculo.controller.js";

const router = Router();

router.get("/", vehiculoCtr.obtenerVehiculos);
router.get("/placa/:placa", vehiculoCtr.obtenerVehiculoPlaca);
router.get("/:id", vehiculoCtr.obtenerVehiculosid);
router.post("/", vehiculoCtr.crearVehiculo);
router.put("/:id", vehiculoCtr.actualizarVehiculo);
router.delete("/:id", vehiculoCtr.borrarVehiculo);

export default router;
