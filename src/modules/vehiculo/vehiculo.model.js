import db from "../../config/db_conexion.js";

export const VehiculoModel = {
  ListarTodos: async () => {
    const [rows] = await db.query("SELECT * FROM vehiculos ORDER BY id_vehiculo DESC");
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query("SELECT * FROM vehiculos WHERE id_vehiculo = ?", [id]);
    return rows[0] || null;
  },

  findByPlaca: async (placa) => {
    const [rows] = await db.query("SELECT * FROM vehiculos WHERE placa = ?", [placa]);
    return rows[0] || null;
  },

  create: async (data) => {
    const vehiculoNuevo = { ...data };
    try {
      const [rows] = await db.query("INSERT INTO vehiculos SET ?", [vehiculoNuevo]);
      return rows;
    } catch (err) {
      if (err.errno === 1054) {
        delete vehiculoNuevo.estado;
        const [rows] = await db.query("INSERT INTO vehiculos SET ?", [vehiculoNuevo]);
        return rows;
      }
      throw err;
    }
  },

  update: async (id, data) => {
    const [rows] = await db.query("UPDATE vehiculos SET ? WHERE id_vehiculo = ?", [data, id]);
    return rows;
  },

  delete: async (id) => {
    const [rows] = await db.query("DELETE FROM vehiculos WHERE id_vehiculo = ?", [id]);
    return rows;
  }
};
