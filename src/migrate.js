/**
 * @fileoverview Archivo principal para ejecutar el proceso ETL completo
 * que migra datos desde PostgreSQL hacia MongoDB y Neo4j.
 * @author ETL Team
 * @version 1.0.0
 */

import { getData } from './postgres.js';
import { migrateToMongo } from './mongodb.js';
import { migrateToNeo4j } from './neo4j.js';

/**
 * Función principal que ejecuta el proceso ETL completo.
 * Extrae datos de PostgreSQL y los migra a MongoDB y Neo4j.
 * 
 * @async
 * @function main
 * @returns {Promise<void>} Promesa que se resuelve cuando la migración se completa
 * @throws {Error} Si ocurre algún error durante el proceso de migración
 * 
 * @example
 * // La función se ejecuta automáticamente al ejecutar el archivo
 * // node migrate.js
 */
async function main() {
  console.log('⏳ Extrayendo datos de PostgreSQL...');
  const data = await getData();

  console.log('📦 Migrando datos a MongoDB...');
  await migrateToMongo(data);

  console.log('🕸️ Migrando datos a Neo4j...');
  await migrateToNeo4j(data);

  console.log('🚀 Migración completa. ¡Todo listo!');
}

// Ejecuta la función principal y maneja errores
main().catch(console.error);