# StressPause Backend

Production-grade Spring Boot 3 backend for StressPause (Expense Tracking and Micro-Investment Application).

## Tech Stack
- **Java 17**
- **Spring Boot 3.2.2**
- **Maven**
- **PostgreSQL**
- **Spring Data JPA**
- **Spring Security**
- **Lombok**
- **SpringDoc OpenAPI (Swagger UI)**

## Getting Started

### Prerequisites
- JDK 17
- Maven 3.6+
- PostgreSQL (optional for initial run, uses H2/defaults if not configured)

### Installation
1. Clone the repository
2. Navigate to the `backend` directory
3. Run `mvn clean install`

### Running the Application
```bash
mvn spring-boot:run
```

The server will start on `http://localhost:8080`.

### Health Check
Verify the setup by hitting:
`GET http://localhost:8080/api/health`

### API Documentation
Once running, access Swagger UI at:
`http://localhost:8080/swagger-ui.html`

## Folder Structure
```text
com.stresspause
├── config           # Configuration classes (Security, OpenAPI)
├── controller       # REST Controllers
├── service          # Business logic interfaces
│   └── impl         # Service implementations
├── repository       # Spring Data JPA repositories
├── dto              # Data Transfer Objects
│   ├── request      # API request payloads
│   └── response     # API response payloads
├── entity           # JPA Entities
├── exception        # Global exception handling
└── util             # Utility classes
```

## Key Features
- **Standardized API Response**: Consistent JSON structure for all endpoints.
- **Global Exception Handling**: Centralized catch and format for errors.
- **Audited Base Entity**: Automatic `createdAt` and `updatedAt` handling using UUIDs.
- **Security Ready**: Pre-configured security filter chain.
- **OpenAPI Integration**: Auto-generated API documentation.
