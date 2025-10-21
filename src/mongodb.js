/**
 * @fileoverview Módulo para la migración de datos hacia MongoDB.
 * Proporciona funciones para insertar datos extraídos de PostgreSQL en MongoDB.
 * @author ETL Team
 * @version 1.0.0
 */

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Migra los datos desde PostgreSQL hacia MongoDB.
 * Crea colecciones y inserta todos los registros en sus respectivas colecciones.
 * 
 * @async
 * @function migrateToMongo
 * @param {Object} data - Objeto con los datos a migrar
 * @param {Array<Object>} data.clientes - Array de registros de clientes
 * @param {Array<Object>} data.reservas - Array de registros de reservas
 * @param {Array<Object>} data.habitaciones - Array de registros de habitaciones
 * @param {Array<Object>} data.detalles - Array de registros de detalles de reserva
 * 
 * @returns {Promise<void>} Promesa que se resuelve cuando la migración se completa
 * @throws {Error} Si ocurre un error durante la conexión o inserción en MongoDB
 * 
 * @example
 * const data = await getData();
 * await migrateToMongo(data);
 * // Los datos se insertan en las colecciones: clientes, reservas, habitaciones, detalles
 */
export async function migrateToMongo(data) {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const db = client.db(process.env.MONGO_DB);

  await db.collection('clientes').insertMany(data.clientes);
  await db.collection('reservas').insertMany(data.reservas);
  await db.collection('habitaciones').insertMany(data.habitaciones);
  await db.collection('detalles').insertMany(data.detalles);

  console.log('✅ Migración a MongoDB completada');
  await client.close();
}