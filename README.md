# CarFind 🚗🔍

CarFind is a fullstack decision engine application designed to help car buyers find their perfect vehicle match. By answering a quick preferences quiz, users are presented with a ranked list of vehicles matching their exact budget, safety rating, fuel type, and feature preferences.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (TypeScript)
- **Bundler**: Vite 6
- **Styling**: Sass / SCSS
- **Routing**: React Router 7

### Backend
- **Framework**: Spring Boot 3.2.5 (Java 17)
- **Build Tool**: Maven
- **Database**: 
  - **Development**: In-memory H2 Database (automatic seeding)
  - **Production**: PostgreSQL (e.g., Neon serverless Postgres)
- **ORM / Data Access**: Spring Data JPA & Hibernate
- **Containerization**: Docker & Docker Compose

---

## 🚀 Getting Started

### Prerequisites
- **Java**: JDK 17 or higher
- **Node.js**: v18 or higher (v20+ recommended)
- **Maven**: 3.9+ (optional if using local IDE)

---

### 💻 Local Development

#### 1. Start the Backend
Navigate to the `backend` directory:
```bash
cd backend
```

Run the backend with the default `dev` profile (uses H2 in-memory database):
```bash
mvn spring-boot:run
```
- The backend starts on **http://localhost:8080**
- Database seeder automatically runs on first boot, inserting 10 initial car models.
- Access the H2 database console at **http://localhost:8080/h2-console** (JDBC URL: `jdbc:h2:mem:carfind`, Username: `sa`, no password).

#### 2. Start the Frontend
Navigate to the `frontend` directory:
```bash
cd ../frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
- The frontend will boot up on **http://localhost:5173** (or **http://localhost:5174** if port 5173 is occupied).
- The Vite server is configured to automatically proxy requests from `/api` to the backend on `http://localhost:8080`.

---

## 🐳 Running with Docker

You can run the full stack locally using Docker Compose, which spins up a local PostgreSQL instance alongside the Spring Boot backend:

```bash
docker compose up --build
```
- **PostgreSQL Database**: Accessible locally on port `5432`
- **Backend Service**: Accessible on port `8080` (runs in the `prod` profile targeting the local PostgreSQL container)

---

## ⚙️ Environment Configuration

### Backend Profiles
Switch profiles by setting the `SPRING_PROFILES_ACTIVE` environment variable:
- **`dev`** (Default): Uses H2 Database.
- **`prod`**: Requires a persistent PostgreSQL database. Requires the following environment variables:
  - `SPRING_DATASOURCE_URL`: PostgreSQL connection string (e.g., `jdbc:postgresql://host:port/dbname`)
  - `SPRING_DATASOURCE_USERNAME`
  - `SPRING_DATASOURCE_PASSWORD`

### Frontend Environment
To target an external backend in production:
- Set `VITE_API_BASE_URL` to your backend's public domain (e.g., `https://carfind-backend.onrender.com`).
- If left empty, it defaults to relative path queries.

---

## 📂 Project Structure

```
├── backend
│   ├── Dockerfile
│   ├── pom.xml
│   └── src
│       └── main
│           ├── java/com/carfind        # Spring Boot Controllers, Services & Entities
│           └── resources               # application.properties & profile configurations
├── frontend
│   ├── package.json
│   ├── vite.config.ts
│   └── src
│       ├── api                         # Fetch matching service
│       ├── components                  # UI Components (Quiz, CarCard, etc.)
│       └── styles                      # SCSS variables & layouts
├── compose.yaml                        # Local PostgreSQL + Backend orchestration
└── README.md                           # Project documentation
```
