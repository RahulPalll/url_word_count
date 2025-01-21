## **.env**

DB_HOST=localhost

DB_PORT=5432

DB_USER=postgres

DB_PASS=root

DB_NAME=wiki_word_counter

JWT_SECRET=your_secret_key

### **command**

1. nest new wiki-word-counter
2. cd wiki-word-counter
3. npm install @nestjs/typeorm typeorm pg axios
4. nest g module wiki-article
5. nest g controller wiki-article
6. nest g service wiki-article
7. npm install @nestjs/swagger swagger-ui-express
8. npm install @nestjs/swagger@10 swagger-ui-express

  for legacy
   npm install @nestjs/config --legacy-peer-deps

auth

- npm install @nestjs/passport passport passport-local passport-jwt @nestjs/jwt bcrypt
- npm install --save-dev @types/passport-local @types/passport-jwt
- nest generate module auth
- nest generate service auth
- nest generate controller auth
  cleate files
  jwt-auth.guard.ts    &  jwt.strategy.ts


fileupload

npm install --save-dev @types/express @types/multer --legacy-peer-deps

### windows setup

### **1. Install Required Applications**

* **Node.js** : Download from [Node.js](https://nodejs.org/).
* Verify: `node -v`, `npm -v`.
* **Git** : Download from [Git](https://git-scm.com/).
* Verify: `git --version`.
* **PostgreSQL** : Download from [PostgreSQL](https://www.postgresql.org/download/).
* Set password, install pgAdmin (optional).
* Verify: `psql -U postgres`.

### **Access Swagger**

* Visit: `http://localhost:<port>/api`.

Here’s a step-by-step guide to set up your NestJS project with PostgreSQL and Swagger on your new Windows laptop:

### **Troubleshooting**

**Node.js Version Mismatch** : If the project requires a specific Node.js version, use `nvm` (Node Version Manager):

Install `nvm-windows` from [nvm-windows GitHub](https://github.com/coreybutler/nvm-windows)

nvm install `<version>`
nvm use `<version>`
