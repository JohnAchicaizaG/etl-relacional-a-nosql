/**
 * @fileoverview Módulo para la extracción de datos desde PostgreSQL.
 * Configura la conexión a la base de datos y proporciona funciones para obtener datos.
 * @author ETL Team
 * @version 1.0.0
 */

import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

/**
 * Pool de conexiones a PostgreSQL configurado con variables de entorno.
 * @type {Pool}
 */
const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

/**
 * Extrae todos los datos necesarios de las tablas de PostgreSQL.
 * 
 * @async
 * @function getData
 * @returns {Promise<Object>} Objeto con los datos extraídos de todas las tablas
 * @returns {Array<Object>} returns.clientes - Array de registros de la tabla clientes
 * @returns {Array<Object>} returns.reservas - Array de registros de la tabla reservas
 * @returns {Array<Object>} returns.habitaciones - Array de registros de la tabla habitaciones
 * @returns {Array<Object>} returns.detalles - Array de registros de la tabla detallereserva
 * 
 * @throws {Error} Si ocurre un error en la consulta a la base de datos
 * 
 * @example
 * const data = await getData();
 * console.log(data.clientes); // [{ id_cliente: 1, nombre: 'Juan', ... }]
 * console.log(data.reservas); // [{ id_reserva: 1, fecha: '2023-01-01', ... }]
 */
export async function getData() {
  const clientes = await pool.query('SELECT * FROM clientes');
  const reservas = await pool.query('SELECT * FROM reservas');
  const habitaciones = await pool.query('SELECT * FROM habitaciones');
  const detalles = await pool.query('SELECT * FROM detallereserva');

  return { clientes: clientes.rows, reservas: reservas.rows, habitaciones: habitaciones.rows, detalles: detalles.rows };
}