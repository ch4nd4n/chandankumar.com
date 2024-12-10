---
title: "Migrating Data from CockroachDB to PostgreSQL"
slug: /blog/migrating-cockroachdb-to-postgresql
date: 2024-12-10
description: "A step-by-step guide on migrating data from CockroachDB to PostgreSQL using Prisma, custom scripts, and Docker Compose for local PostgreSQL setups."
tags: ["database migration", "prisma", "cockroachdb", "postgresql"]
---

### Migrating Data from CockroachDB to PostgreSQL

Migrating databases can seem like a daunting task, but with tools like Prisma, the process can be streamlined and efficient. In this guide, we’ll explore how to migrate data from **CockroachDB** to **PostgreSQL** using Prisma and custom scripts.

---

### Step 1: Export Data from CockroachDB

The first step is to export data from the existing CockroachDB database. This can be done using a custom shell script (`export-data.sh`) that uses the `\COPY` command to extract table data into CSV files.

Run the script with the appropriate database URL:

```bash
DB_URL="postgres://user:<hidden-password>@HOST_COCKROACH/database" ./docker/export-data.sh
```

This script exports data for all specified tables into CSV files, ready to be imported into the new database.

---

### Step 2: Set Up Tables in PostgreSQL

To prepare the new database, follow these steps:

#### **2.1 Pull Existing Schema**

Use Prisma's `prisma db pull` command to introspect the current database schema. Ensure the `schema.prisma` file is set to the appropriate provider (e.g., `postgresql` or `cockroachdb`):

```bash
npx prisma db pull
```

#### **2.2 Apply Schema to the New Database**

If you're migrating to a clean database, use Prisma’s migration tools to set up the schema. You might need to recreate migration files to reflect the updated schema:

```bash
npx prisma migrate dev
```

This command generates migration files and applies them to the target PostgreSQL database.

---

### Step 3: Import Data into PostgreSQL

Once the schema is ready, you can import the exported data into PostgreSQL using the `import-data.sh` script. This script reads the CSV files and uses the `\COPY` command to import the data:

```bash
DB_URL="postgres://user:<hidden-password>@localhost/dev" ./docker/import-data.sh
```

The script maps the data in the CSV files to their corresponding tables in the PostgreSQL database.

---

### Running PostgreSQL Locally with Docker Compose

If you need to set up a PostgreSQL instance locally for testing or development, you can use Docker Compose. Here’s an example `docker-compose.yml` file:

```yaml
version: "3.9"
services:
  postgres:
    image: postgres:15
    container_name: local-postgres
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: dev
    ports:
      - "5432:5432"
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
    restart: always
```

Run the following command to start PostgreSQL locally:

```bash
docker-compose up -d
```

This configuration mounts the database files to a directory on your host machine (`./postgres-data`) and exposes the service on port 5432.

---

### Prisma’s Role in Simplifying the Process

Prisma simplifies database migrations in several ways:

- **Schema Management:** Prisma’s schema file ensures consistency across different databases.
- **Easy Setup:** Commands like `prisma db pull` and `prisma migrate dev` eliminate the need for manual adjustments.
- **Provider Flexibility:** Switching between CockroachDB and PostgreSQL is as simple as updating the `provider` in the `schema.prisma` file.

---

### Conclusion

Migrating data from CockroachDB to PostgreSQL can be made straightforward with the right tools and approach. By combining Prisma’s schema tools with custom export/import scripts and using Docker Compose for local testing, you can ensure a smooth migration process.

Do you have any tips for managing database migrations? Share your thoughts in the comments!
