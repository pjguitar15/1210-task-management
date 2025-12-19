# Project Setup — Client & Server (Development) 🔧

This repository contains two parts:

- `client/` — Next.js frontend
- `server/` — Laravel API (runs via Laravel Sail / Docker)

---

## Requirements ✅

- Docker Desktop (or Docker Engine on Linux)
- Git
- No local PHP or MySQL installation needed for the server (Sail uses Docker)

---

## Client — Quick setup (Next.js)

1. From the repository root:

```bash
cd client
```

2. Create a `.env` file with the minimal value the app needs:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost
```

> 💡 The frontend only needs this environment variable to know where to call the API.

3. Install and run the client:

```bash
npm install
npm run dev
```

---

## Server — Quick setup (Laravel + Sail)

This project uses Laravel + MySQL via Laravel Sail (Docker). From the repository root:

```bash
cd server
```

Create a `.env` file (these are the example values used locally in this project):

```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:tZ4zc0zbwoEQgz6mDrzZ2uaP7TPF1UfTBq+QBsDOOPM=
APP_DEBUG=true
APP_URL=http://localhost

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file

PHP_CLI_SERVER_WORKERS=4

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=sail
DB_PASSWORD=password

SESSION_DRIVER=database
SESSION_LIFETIME=120

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database

MAIL_MAILER=log

VITE_APP_NAME="${APP_NAME}"
```

> ⚠️ Note: for local development the above values are intentionally simple and stored in the repository; it's okay to expose these sample values for development. Do NOT use production secrets here.

Start the app with Sail (example):

```bash
# from server/
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate
```

If you change environment values, clear caches:

```bash
./vendor/bin/sail artisan config:clear
./vendor/bin/sail artisan cache:clear
./vendor/bin/sail artisan route:clear
```

---

If you want me to add troubleshooting tips (common errors, cache commands, or extra scripts), tell me which issues you've seen and I'll expand this section. 🚀
