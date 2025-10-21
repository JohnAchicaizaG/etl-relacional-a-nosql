# 🧪 Laboratorio de Migración Empírica — Bases de Datos Relacional y NoSQL

Este entorno permite experimentar con la **migración de una base de datos relacional (PostgreSQL)** hacia **dos modelos NoSQL (MongoDB y Neo4j)**.  
Todo el laboratorio se ejecuta mediante **Docker Compose** y está diseñado para integrarse con **Node.js** como puente de migración (ETL).

---

## ⚙️ Requisitos previos

- Docker y Docker Compose instalados
- Node.js v20+ (solo si vas a usar el script de migración)
- Editor recomendado: VS Code

---

## 🧩 Servicios incluidos

| Servicio | Tipo | Imagen | Puerto | Gestor / URL | Usuario | Contraseña |
|-----------|------|---------|--------|----------------|----------|-------------|
| PostgreSQL | Relacional | `postgres:16` | 5432 | — | `admin` | `admin123` |
| **pgAdmin 4** | Gestor SQL | `dpage/pgadmin4` | 5050 | [http://localhost:5050](http://localhost:5050) | `admin@admin.com` | `admin123` |
| MongoDB | NoSQL Documental | `mongo:7` | 27017 | — | `admin` | `admin123` |
| **Mongo Express** | Gestor Mongo | `mongo-express:latest` | 8081 | [http://localhost:8081](http://localhost:8081) | `admin` | `admin123` |
| Neo4j | NoSQL Grafos | `neo4j:5` | 7474 / 7687 | [http://localhost:7474](http://localhost:7474) | `neo4j` | `admin123` |

---

## 🗂️ Estructura del proyecto

```
Laboratorio_ETL/
 ├─ docker-compose.yml
 ├─ .env
 ├─ schema-db-hotel.sql
 ├─ insert_data.sql
 ├─ src/
 │   ├─ postgres.js
 │   ├─ mongodb.js
 │   ├─ neo4j.js
 │   └─ migrate.js
 └─ README.md
```

---

## 🚀 Cómo levantar el laboratorio

1. **Clona o entra a la carpeta del proyecto**
   ```bash
   cd Laboratorio_ETL
   ```

2. **Inicia todos los servicios**
   ```bash
   docker compose up -d
   ```

3. **Verifica que estén activos**
   ```bash
   docker ps
   ```

4. **Listo:** abre los gestores web según el servicio:

| Servicio | URL | Descripción |
|-----------|-----|-------------|
| **pgAdmin 4** | [http://localhost:5050](http://localhost:5050) | Interfaz para PostgreSQL |
| **Mongo Express** | [http://localhost:8081](http://localhost:8081) | Interfaz para MongoDB |
| **Neo4j Browser** | [http://localhost:7474](http://localhost:7474) | Visualizador de grafos |

---

## 🔑 Credenciales unificadas

| Usuario | Contraseña |
|----------|-------------|
| `admin` | `admin123` |

> En Neo4j el usuario obligatorio es `neo4j` pero conserva la misma contraseña `admin123`.

---

## 🧱 Inicialización automática (PostgreSQL)

Los archivos SQL se ejecutan automáticamente al iniciar el contenedor:

- `schema-db-hotel.sql` → crea las tablas del sistema hotelero  
- `insert_data.sql` → inserta los registros iniciales  

Puedes verificar los datos conectándote desde **pgAdmin** o usando:

```bash
docker exec -it postgres_hotel psql -U admin -d hotel
```

---

## 🔍 Verificación manual de cada servicio

### PostgreSQL
```bash
docker exec -it postgres_hotel psql -U admin -d hotel
\dt
```

### MongoDB
```bash
docker exec -it mongo_hotel mongosh -u admin -p admin123
show dbs
```

### Neo4j
Accede desde navegador: [http://localhost:7474](http://localhost:7474)  
Usa:
```
bolt://localhost:7687
Usuario: neo4j
Contraseña: admin123
```

---

## 🧰 Reiniciar el laboratorio

Si deseas limpiar y reconstruir el entorno completo:

```bash
docker compose down -v
docker compose up -d
```

Esto borra los volúmenes y vuelve a crear las bases desde cero.

---

## 🧠 Siguiente paso

Una vez confirmes que los tres gestores funcionan:

1. Configura tu archivo `.env` con estas variables:

   ```bash
   PG_HOST=localhost
   PG_PORT=5432
   PG_USER=admin
   PG_PASSWORD=admin123
   PG_DATABASE=hotel

   MONGO_URI=mongodb://admin:admin123@localhost:27017
   MONGO_DB=hotelNoSQL

   NEO4J_URI=bolt://localhost:7687
   NEO4J_USER=neo4j
   NEO4J_PASSWORD=admin123
   ```

2. Instala dependencias en Node:
   ```bash
   npm install pg mongodb neo4j-driver dotenv
   ```

3. Ejecuta tu script de migración:
   ```bash
   node src/migrate.js
   ```

4. Verifica los datos migrados en:
   - **Mongo Express** → colecciones  
   - **Neo4j Browser** → nodos y relaciones

---

## 🧹 Notas finales

- Si Mongo Express no carga, reinicia los contenedores con `docker compose down -v && docker compose up -d`.
- Si Neo4j muestra error de usuario, recuerda que **solo acepta el nombre `neo4j` como administrador**.
- Espera unos segundos después de levantar el entorno antes de acceder a los paneles web.

---

## ✍️ Autor

**John (jachg)**  
Especialización en Construcción de Software  
Universidad de Nariño  
