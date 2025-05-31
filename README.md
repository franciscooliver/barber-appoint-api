<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Barber Appointment API

## Description

A modern REST API built with NestJS for managing barbershop appointments, services, and user management.

## Technologies

- **Framework:** NestJS v10
- **Language:** TypeScript
- **Database:** PostgreSQL (with TypeORM)
- **Authentication:** JWT with Passport
- **Encryption:** bcrypt
- **Validation:** class-validator and class-transformer
- **Containerization:** Docker & Docker Compose
- **Documentation:** Swagger (OpenAPI) - In progress
- **Testing:** Jest

## Architecture

The project follows a modular architecture with clear separation of concerns:

```
src/
├── modules/               # Feature modules
│   ├── addresses/        # Address management
│   ├── appointments/     # Appointments management
│   ├── auth/            # Authentication & authorization
│   ├── barbershops/     # Barbershop management
│   ├── collaborators/   # Barbers/staff management
│   ├── services/        # Barbershop services
│   ├── settings/       # System settings management
│   └── users/          # User management
├── common/              # Shared resources
│   ├── decorators/     # Custom decorators
│   ├── exceptions/     # Exception filters
│   └── interceptors/   # Response interceptors
└── database/           # Database configurations & seeds
```

## Features

- User Authentication (JWT)
- Token Blacklisting
- Barbershop Management
- Appointment Scheduling
- Service Management
- Staff/Collaborator Management
- Address Management
- System Settings Management
- Standardized Error Handling
- Response Transformation with Interceptors
- Initial Data Seeding
- Input Validation with class-validator

## Address Fields

The address entity includes:

- country: string
- street: string
- city: string
- state: string
- uf: string (2-letter state code)
- neighborhood: string
- zipcode: string

## Prerequisites

- Node.js v20+
- Docker & Docker Compose
- PostgreSQL (or Supabase connection)

## Environment Variables

Copy `.env-example` to `.env` and configure:

```bash
PORT=3001
DATABASE_HOST=your-host
DATABASE_PORT=5432
DATABASE_USER=your-user
DATABASE_PASSWORD=your-password
DATABASE_NAME=your-database
JWT_SECRET=your-secret
```

## Installation

```bash
# Install dependencies
$ npm install
```

## Running the Application

### Development

```bash
# Development mode
$ npm run start:dev

# Using Docker Compose
$ docker compose up
```

### Production

```bash
# Build production image
$ docker compose -f docker-compose-prod.yaml build

# Run production container
$ docker compose -f docker compose-prod.yaml up
```

### Kubernetes Deployment

```bash
# Apply Kubernetes configurations
$ kubectl apply -f k8s/

# Check deployment status
$ kubectl get pods
```

## Testing

```bash
# Unit tests
$ npm run test

# Test coverage
$ npm run test:cov

# E2E tests
$ npm run test:e2e
```

## API Endpoints

### Auth
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user details

### Barbershops
- `GET /api/barbershops` - List barbershops
- `POST /api/barbershops` - Create barbershop
- `GET /api/barbershops/:id` - Get barbershop details

### Appointments
- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Create appointment
- `PATCH /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Services
- `GET /api/services` - List services
- `POST /api/services` - Create service
- `GET /api/services/:id` - Get service details

### Settings
- `GET /api/settings` - Get system settings
- `PUT /api/settings` - Update system settings
- `GET /api/settings/working-hours` - Get barbershop working hours
- `PUT /api/settings/working-hours` - Update working hours
- `GET /api/settings/working-days` - Get working days configuration
- `PUT /api/settings/working-days` - Update working days configuration

## Data Models

### User
- id: number
- name: string
- email: string
- password: string (encrypted with bcrypt)
- isActive: boolean
- role: 'client' | 'barbershop'
- barbershops: Barbershop[]
- appointments: Appointment[]
- address: Address

### Project Structure

```
backend/
├── src/                 # Source code
├── test/               # Test files
├── k8s/                # Kubernetes configurations
├── docker-compose.yaml # Development Docker Compose
├── docker-compose-prod.yaml # Production Docker Compose
├── Dockerfile         # Production Docker build
├── Dockerfile.dev     # Development Docker build
└── tsconfig.json     # TypeScript configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[MIT License](LICENSE)
