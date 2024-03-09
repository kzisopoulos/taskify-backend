# Taskify backend

This is the backend of Taskify application.

### Getting started

- Create your own `.env` file, copy the contents of `.env.example` and populate them, there are instructions there
- **Configuring database:** After you populate the env variables its time to setup the db. You can either choose to do so locally or on the cloud, follow the respective mini guides below and also be sure to check the resources that I provided.
- **Running the application:** You have two options here , either run the application inside a container or run it just like a normal app.If you go with normal app just run `npm install` and If you go with the container be sure to check and change container name, port etc , then `make build` , and eventually `make server`. Also take a look for all the commands available in the `Makefile`.

### Resources

- Zod: [Zod docs](https://zod.dev/)
- Prisma: [Prisma docs](https://www.prisma.io/docs/getting-started)
- Turso: [Turso docs](https://docs.turso.tech/sdk/ts/orm/prisma)
- Prisma turso related [Prisma - Turso related](https://www.prisma.io/docs/orm/overview/databases/turso)

### <u>Setup prisma locally shortcut</u>

- `npx prisma init --datasource-provider sqlite` .
  This creates a new prisma directory with your Prisma schema file and configures SQLite as your database. You're now ready to model your data and create your database with some tables.
- At this point, you have a Prisma schema but no database yet. Run the following command in your terminal to create the SQLite database and the User and Post tables represented by your models.
  `npx prisma migrate dev --name init`
- Then run `npx prisma generate` to generate the Prisma client so you can use it in the application.
- If you make changes to the schema you should run again
  `npx prisma migrate dev --name <change name here>`
  and the again the generate to create the updated client
  `npx prisma generate`

### <u>Setup prisma with Turso</u>

- `npx prisma init --datasource-provider sqlite` , to create your prisma directory and your prisma file and configure SQLLite as your database.
- Read the docs in this point because you must make some changes for the time of writting this these are the changes :

```ts
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

datasource db {
  provider = "sqlite"
  url      = env("TURSO_DATABASE_URL")
}
```

- Follow the guide from turso to first install the `CLI` then `authenticate` and maybe create DB and replicas from the dashboard. (You can do it too from the CLI)
- Run `turso db show --url <db name>`, then copy the url and paste it in the env **VERY IMPORTANT: before running the migration later on be sure to prefix the url with file:whatever_your_url_is because it will error otherwise.Then immediately delete the prefix as its not needed**
- Run `turso db tokens create <db name>` this will create your auth token , copy it aswell to env variables
- Now that you have your models / tables etc its time to run `npx prisma generate`
- Then you should run a command to create the migration files with : `npx prisma migrate dev --name init`
- Then you should push the migration to turso with : `turso db shell yourDbName < ./prisma/migrations/generated_folder_init/migration.sql `
