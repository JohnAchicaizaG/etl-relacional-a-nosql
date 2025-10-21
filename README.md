# 🧪 Laboratorio ETL - Migración Multi-Base de Datos

> **Sistema de migración de datos relacional a NoSQL**  
> Migra datos desde PostgreSQL hacia MongoDB (documentos) y Neo4j (grafos) usando Node.js como ETL.

![Arquitectura ETL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white) 
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) 
![Neo4j](https://img.shields.io/badge/Neo4j-008CC1?style=flat&logo=neo4j&logoColor=white) 
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) 
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

---

## 📋 Tabla de Contenidos

- [🎯 Descripción del Proyecto](#-descripción-del-proyecto)
- [🏗️ Arquitectura](#️-arquitectura)
- [⚙️ Requisitos Previos](#️-requisitos-previos)
- [🚀 Instalación y Configuración](#-instalación-y-configuración)
- [🗂️ Estructura del Proyecto](#️-estructura-del-proyecto)
- [🧩 Servicios y Puertos](#-servicios-y-puertos)
- [📊 Modelo de Datos](#-modelo-de-datos)
- [🔧 Uso del Sistema](#-uso-del-sistema)
- [📖 Documentación API](#-documentación-api)
- [🔍 Verificación](#-verificación)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [👨‍💻 Contribución](#-contribución)

---

## 🎯 Descripción del Proyecto

Este laboratorio implementa un **pipeline ETL (Extract, Transform, Load)** completo que demuestra:

- **Extracción** de datos desde una base de datos relacional (PostgreSQL)
- **Transformación** del modelo relacional a modelos NoSQL
- **Carga** hacia dos tipos de bases NoSQL:
  - **MongoDB**: Para almacenamiento documental
  - **Neo4j**: Para análisis de relaciones en grafos

### ✨ Características Principales

- 🐳 **Contenerización completa** con Docker Compose
- 🔄 **Migración automática** con scripts Node.js documentados (JSDoc)
- 🎨 **Interfaces web** para gestión visual de datos
- 🔒 **Configuración unificada** de credenciales
- 📊 **Datos de ejemplo** del dominio hotelero
- 🔧 **Fácil setup** con un solo comando

---

## 🏗️ Arquitectura

```mermaid
graph LR
    A[PostgreSQL<br/>📊 Datos Relacionales] --> B[Node.js ETL<br/>🔄 Procesamiento]
    B --> C[MongoDB<br/>📄 Documentos]
    B --> D[Neo4j<br/>🕸️ Grafos]
    
    E[pgAdmin<br/>🖥️ Admin SQL] --> A
    F[Mongo Express<br/>🖥️ Admin Mongo] --> C
    G[Neo4j Browser<br/>🖥️ Admin Grafos] --> D
```

---

## ⚙️ Requisitos Previos

| Herramienta | Versión Mínima | Propósito |
|-------------|----------------|-----------|
| 🐳 **Docker** | 20.10+ | Contenerización |
| 🐙 **Docker Compose** | 2.0+ | Orquestación |
| 🟢 **Node.js** | 20.0+ | Runtime del ETL |
| 💻 **VS Code** | Última | Editor recomendado |

### Verificación de requisitos
```bash
docker --version
docker compose version
node --version
```

---

## 🚀 Instalación y Configuración

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/JohnAchicaizaG/etl-relacional-a-nosql.git
cd etl-relacional-a-nosql
```

### 2️⃣ Instalar dependencias Node.js
```bash
npm install
```

### 3️⃣ Configurar variables de entorno
El archivo `.env` ya está configurado con valores por defecto:
```bash
# PostgreSQL
PG_HOST=localhost
PG_PORT=5432
PG_USER=admin
PG_PASSWORD=admin123
PG_DATABASE=hotel

# MongoDB
MONGO_URI=mongodb://admin:admin123@localhost:27017
MONGO_DB=hotelNoSQL

# Neo4j
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=admin123
```

### 4️⃣ Levantar el entorno completo
```bash
docker compose up -d
```

### 5️⃣ Verificar servicios activos
```bash
docker ps
```

### 6️⃣ Ejecutar migración ETL
```bash
npm start
# o directamente: node src/migrate.js
```

---

## 🗂️ Estructura del Proyecto

```
📦 etl-relacional-a-nosql/
├── 🐳 docker-compose.yml      # Configuración de servicios
├── 📄 package.json           # Dependencias Node.js
├── 🔧 .env                   # Variables de entorno
├── 📝 README.md              # Documentación principal
├── 🚫 .gitignore             # Archivos excluidos de Git
│
├── 📂 src/                   # 🔥 Código ETL (Documentado con JSDoc)
│   ├── 🎯 migrate.js         # Script principal de migración
│   ├── 🗄️ postgres.js        # Extracción desde PostgreSQL
│   ├── 📄 mongodb.js         # Carga hacia MongoDB
│   └── 🕸️ neo4j.js           # Carga hacia Neo4j
│
└── 📂 insert_data.sql/       # 📊 Datos de ejemplo
    ├── clientes.sql          # 10 clientes de ejemplo
    ├── habitaciones.sql      # 10 tipos de habitaciones
    ├── reservas.sql          # Reservas de muestra
    └── detalle_reserva.sql   # Detalles de reservas
```

---

## 🧩 Servicios y Puertos

| 🛠️ Servicio | 🐳 Contenedor | 🌐 Puerto | 🔗 URL de Acceso | 👤 Usuario | 🔑 Contraseña |
|-------------|---------------|-----------|------------------|------------|---------------|
| **PostgreSQL** | `postgres_hotel` | 5432 | jdbc:postgresql://localhost:5432/hotel | `admin` | `admin123` |
| **pgAdmin 4** | `pgadmin_hotel` | 5050 | [http://localhost:5050](http://localhost:5050) | `admin@admin.com` | `admin123` |
| **MongoDB** | `mongo_hotel` | 27017 | mongodb://localhost:27017 | `admin` | `admin123` |
| **Mongo Express** | `mongo_express_hotel` | 8081 | [http://localhost:8081](http://localhost:8081) | `admin` | `admin123` |
| **Neo4j** | `neo4j_hotel` | 7474/7687 | [http://localhost:7474](http://localhost:7474) | `neo4j` | `admin123` |

### � Credenciales Unificadas
```
Usuario: admin
Contraseña: admin123
Excepción: Neo4j usa el usuario 'neo4j' obligatoriamente
```

---

## 📊 Modelo de Datos

### 🗄️ PostgreSQL (Relacional)
```sql
Clientes (id_cliente, nombre, correo, ciudad)
    ↓ 1:N
Reservas (id_reserva, id_cliente, fecha, total)
    ↓ N:M
DetalleReserva (id_reserva, id_habitacion, cantidad)
    ↓ N:1  
Habitaciones (id_habitacion, tipo, precio)
```

### 📄 MongoDB (Documental)
```javascript
// Colecciones creadas:
db.clientes      // Documentos de clientes
db.reservas      // Documentos de reservas  
db.habitaciones  // Documentos de habitaciones
db.detalles     // Documentos de detalles de reserva
```

### �️ Neo4j (Grafos)
```cypher
// Nodos y relaciones:
(Cliente)-[:REALIZA]->(Reserva)-[:INCLUYE]->(Habitacion)

// Tipos de nodos:
:Cliente {id_cliente, nombre, correo, telefono}
:Reserva {id_reserva, fecha, total}
:Habitacion {id_habitacion, tipo, precio}
```

---

## 🔧 Uso del Sistema

### 🎯 Migración ETL Completa
```bash
# Ejecutar pipeline completo
npm start

# Output esperado:
# ⏳ Extrayendo datos de PostgreSQL...
# 📦 Migrando datos a MongoDB...
# ✅ Migración a MongoDB completada
# 🕸️ Migrando datos a Neo4j...
# ✅ Migración a Neo4j completada correctamente.
# 🚀 Migración completa. ¡Todo listo!
```

### 🖥️ Acceso a Interfaces Web

#### 📊 pgAdmin (PostgreSQL)
1. Abrir [http://localhost:5050](http://localhost:5050)
2. Login: `admin@admin.com` / `admin123`
3. Agregar servidor:
   - Host: `postgres_hotel`
   - Puerto: `5432`
   - Usuario: `admin`
   - Contraseña: `admin123`

#### 📄 Mongo Express (MongoDB)
1. Abrir [http://localhost:8081](http://localhost:8081)
2. Login: `admin` / `admin123`
3. Navegar por las colecciones migradas

#### 🕸️ Neo4j Browser (Grafos)
1. Abrir [http://localhost:7474](http://localhost:7474)
2. Conectar a `bolt://localhost:7687`
3. Login: `neo4j` / `admin123`
4. Ejecutar consultas Cypher:
```cypher
// Ver todos los nodos
MATCH (n) RETURN n LIMIT 25

// Ver relaciones Cliente -> Reserva -> Habitacion
MATCH (c:Cliente)-[:REALIZA]->(r:Reserva)-[:INCLUYE]->(h:Habitacion) 
RETURN c, r, h LIMIT 10
```

---

## 📖 Documentación API

El código ETL está completamente documentado con **JSDoc**. Para generar documentación:

```bash
# Instalar JSDoc globalmente
npm install -g jsdoc

# Generar documentación
jsdoc src/ -d docs/

# Abrir documentación generada
open docs/index.html
```

### 🔍 Funciones Principales

| 📁 Archivo | 🔧 Función | 📝 Descripción |
|------------|------------|----------------|
| `postgres.js` | `getData()` | Extrae datos de todas las tablas PostgreSQL |
| `mongodb.js` | `migrateToMongo(data)` | Inserta datos en colecciones MongoDB |
| `neo4j.js` | `migrateToNeo4j(data)` | Crea nodos y relaciones en Neo4j |
| `migrate.js` | `main()` | Orquesta el pipeline ETL completo |

---

## 🔍 Verificación

### ✅ Verificar PostgreSQL
```bash
docker exec -it postgres_hotel psql -U admin -d hotel -c "\dt"
docker exec -it postgres_hotel psql -U admin -d hotel -c "SELECT COUNT(*) FROM clientes;"
```

### ✅ Verificar MongoDB
```bash
docker exec -it mongo_hotel mongosh -u admin -p admin123 --eval "use hotelNoSQL; db.clientes.countDocuments()"
```

### ✅ Verificar Neo4j
```cypher
// En Neo4j Browser:
MATCH (n) RETURN labels(n), COUNT(n)
```

### ✅ Verificar Logs de Migración
```bash
docker logs postgres_hotel
docker logs mongo_hotel  
docker logs neo4j_hotel
```

---

## 🛠️ Troubleshooting

### ❌ Problemas Comunes

#### 🔴 Puerto ya en uso
```bash
# Verificar puertos ocupados
lsof -i :5432 -i :27017 -i :7474

# Detener servicios conflictivos
docker compose down
```

#### 🔴 Mongo Express no carga
```bash
# Reiniciar contenedores
docker compose restart mongo-express
docker logs mongo_express_hotel
```

#### 🔴 Neo4j rechaza conexión
```bash
# Verificar estado del contenedor
docker logs neo4j_hotel

# El usuario DEBE ser 'neo4j' (no 'admin')
```

#### 🔴 Error en migración ETL
```bash
# Verificar variables de entorno
cat .env

# Verificar conectividad
docker exec postgres_hotel pg_isready -U admin
docker exec mongo_hotel mongosh --eval "db.runCommand({ping: 1})"
```

### 🔄 Reinicio Completo
```bash
# Limpiar todo y empezar de cero
docker compose down -v
docker system prune -f
docker compose up -d

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

---

## 🧹 Comandos Útiles

```bash
# Ver logs de todos los servicios
docker compose logs -f

# Conectar directamente a PostgreSQL
docker exec -it postgres_hotel psql -U admin -d hotel

# Conectar directamente a MongoDB
docker exec -it mongo_hotel mongosh -u admin -p admin123

# Ver estadísticas de Docker
docker stats

# Limpiar recursos no utilizados
docker system prune -a
```

---

## 👨‍💻 Contribución

### 🤝 Cómo contribuir

1. **Fork** el repositorio
2. **Crea** una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. **Confirma** tus cambios: `git commit -m 'Agrega nueva funcionalidad'`
4. **Push** a la rama: `git push origin feature/nueva-funcionalidad`
5. **Abre** un Pull Request

### 📋 Estándares de Código

- ✅ Usar **JSDoc** para documentación
- ✅ Seguir **ES6+** syntax
- ✅ Mantener **async/await** para operaciones asíncronas
- ✅ Incluir **manejo de errores** apropiado
- ✅ Escribir **commits descriptivos**

### 🐛 Reportar Issues

Usa las plantillas de GitHub Issues para:
- 🐛 Bug reports
- ✨ Feature requests  
- 📝 Mejoras de documentación

---

## 📄 Licencia

Este proyecto está bajo la Licencia **ISC**. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## ✍️ Autor

**John Achicaiza (jachg)**  
📚 Especialización en Construcción de Software  
🏛️ Universidad de Nariño  
📧 [Contacto](mailto:jachicaiza@udenar.edu.co)

---

## ⭐ Agradecimientos

- 🐳 **Docker Community** - Por la tecnología de contenerización
- 🟢 **Node.js Team** - Por el runtime JavaScript
- 📊 **PostgreSQL**, **MongoDB**, **Neo4j** - Por las tecnologías de base de datos
- 🎓 **Universidad de Nariño** - Por el apoyo académico

---

<div align="center">

**¿Te fue útil este proyecto? ¡Dale una ⭐!**

[⬆️ Volver al inicio](#-laboratorio-etl---migración-multi-base-de-datos)

</div>  
