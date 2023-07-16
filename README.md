# gRPC & NestJS E-commerce

Simple e-commerce CMS API using gRPC and NestJS

## Collaborators

- Mustapha BOUDOUCH
- Ali FATOORIFAR
- Jason DA CUNHA
- Walid BOULBOUL

## Services

### User service

The User Service is responsible for user management, encompassing essential functionalities like user creation, updates, deletions, and search operations.

### Auth service

The Auth Service ensures secure and seamless user authentication, enhancing the overall security and trustworthiness of the application.

### Product service

The Product Service acts as the backbone of the CMS, providing simple product and category CRUD (Create, Read, Update, Delete) operations to manage e-commerce content.

## Install project

1 - Create the docker network

```bash
docker network create grpc-ecommerce_default
```

2 - Run databases and tracing tools

```bash
docker compose up -d mariadb mongo tracing
```

3 - Setup user service database

```bash
cd user-api
cp .env.example .env && npx prisma migrate dev
```

4 - Setup auth service database

```bash
cd auth-api
cp .env.example .env && npx prisma migrate dev
```

5 - Add certificates and rootCA

```bash
cd local/certs
mkcert user-api localhost
mkcert auth-api localhost
mkcert product-api localhost
cp $(mkcert -CAROOT)/rootCA.pem .
find . -type f -name '*-api+1*' -exec bash -c 'mv "$0" "${0/-api+1/}"' {} \;
```

6 - Run servers

```bash
docker compose up -d
```
