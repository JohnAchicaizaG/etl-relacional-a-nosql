/**
 * @fileoverview Módulo para la migración de datos hacia Neo4j.
 * Configura la conexión a Neo4j y migra datos creando nodos y relaciones.
 * @author ETL Team
 * @version 1.0.0
 */

import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Migra los datos desde PostgreSQL hacia Neo4j como base de datos de grafos.
 * Crea nodos para clientes, habitaciones y reservas, y establece las relaciones entre ellos.
 * 
 * @async
 * @function migrateToNeo4j
 * @param {Object} data - Objeto con los datos a migrar
 * @param {Array<Object>} data.clientes - Array de registros de clientes
 * @param {Array<Object>} data.reservas - Array de registros de reservas
 * @param {Array<Object>} data.habitaciones - Array de registros de habitaciones
 * @param {Array<Object>} data.detalles - Array de registros de detalles de reserva
 * 
 * @returns {Promise<void>} Promesa que se resuelve cuando la migración se completa
 * @throws {Error} Si ocurre un error durante la conexión o inserción en Neo4j
 * 
 * @example
 * const data = await getData();
 * await migrateToNeo4j(data);
 * // Crea nodos: Cliente, Habitacion, Reserva
 * // Crea relaciones: Cliente-[:REALIZA]->Reserva, Reserva-[:INCLUYE]->Habitacion
 */
export async function migrateToNeo4j(data) {
  const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
  );

  const session = driver.session();

  try {
    console.log('⚙️ Creando índices si no existen...');
    await session.run('CREATE CONSTRAINT IF NOT EXISTS FOR (c:Cliente) REQUIRE c.id_cliente IS UNIQUE');
    await session.run('CREATE CONSTRAINT IF NOT EXISTS FOR (h:Habitacion) REQUIRE h.id_habitacion IS UNIQUE');
    await session.run('CREATE CONSTRAINT IF NOT EXISTS FOR (r:Reserva) REQUIRE r.id_reserva IS UNIQUE');

    // ========================
    // CLIENTES
    // ========================
    console.log('👥 Insertando clientes...');
    for (const c of data.clientes) {
      const params = {
        id_cliente: c.id_cliente,
        nombre: c.nombre,
        correo: c.correo,
        telefono: c.telefono || null, // evita error si no existe
      };

      await session.run(
        `
        MERGE (cl:Cliente {id_cliente: $id_cliente})
        SET cl.nombre = $nombre,
            cl.correo = $correo,
            cl.telefono = $telefono
        `,
        params
      );
    }

    // ========================
    // HABITACIONES
    // ========================
    console.log('🛏️ Insertando habitaciones...');
    for (const h of data.habitaciones) {
      await session.run(
        `
        MERGE (hab:Habitacion {id_habitacion: $id_habitacion})
        SET hab.tipo = $tipo,
            hab.precio = $precio
        `,
        h
      );
    }

    // ========================
    // RESERVAS
    // ========================
console.log('🧾 Insertando reservas...');
for (const r of data.reservas) {
  const params = {
    id_reserva: r.id_reserva,
    id_cliente: r.id_cliente,
    fecha: r.fecha || null,   // ✅ si no viene, pone null
    total: r.total || 0
  };

  await session.run(
    `
    MERGE (res:Reserva {id_reserva: $id_reserva})
    SET res.fecha = $fecha,
        res.total = $total
    `,
    params
  );
}

    // ========================
    // DETALLES (Reserva → Habitación)
    // ========================
    console.log('🔗 Creando relaciones Reserva → Habitación...');
    for (const d of data.detalles) {
      await session.run(
        `
        MATCH (r:Reserva {id_reserva: $id_reserva}),
              (h:Habitacion {id_habitacion: $id_habitacion})
        MERGE (r)-[rel:INCLUYE {cantidad: $cantidad}]->(h)
        `,
        d
      );
    }

    // ========================
    // RELACIÓN Cliente → Reserva
    // ========================
    console.log('🔗 Creando relaciones Cliente → Reserva...');
    for (const r of data.reservas) {
      await session.run(
        `
        MATCH (c:Cliente {id_cliente: $id_cliente}),
              (r:Reserva {id_reserva: $id_reserva})
        MERGE (c)-[:REALIZA]->(r)
        `,
        r
      );
    }

    console.log('✅ Migración a Neo4j completada correctamente.');
  } catch (error) {
    console.error('❌ Error en migración Neo4j:', error);
  } finally {
    await session.close();
    await driver.close();
  }
}