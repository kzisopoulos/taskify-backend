# Node starter

This project serves one purpose , have a pre-structure backend rest api in node & express in minutes.
All bateries included, dockerized, auth strategy & associated middleware, typesafety, logger, prisma.
You can take it from here and start building your own routes and controllers and whatever else you want.

## Future plans

In the future I plan on :

- Integrating it with [Grafana](https://grafana.com/).
- Experiment with jest.
- Experiment and setting up PostgreSQL instead of sqlite3.
- Experiment with [DrizzleORM](https://orm.drizzle.team/) as an alternative to Prisma.

### Getting started

- Create your own .env file , copy the content of the .env.example and populate those variables. The prisma one will be autogenerated when you run the `npx prisma init --datasource-provider sqlite` command.
  -Build the docker image by running `make build` which also installs all npm packages. Be sure to change the name of the container to your liking.
- To run the server you can run `make server` which runs the server on the predefined port. Also check and change the port you want to use.
- Check Makefile for all the other commands
- Check the package.json scripts for what I've build so far.
- Happy coding.

### Resources

- Zod: [Zod docs](https://zod.dev/)
- Prisma: [Prisma docs](https://www.prisma.io/docs/getting-started)

#### <u>Setup prisma for lazy people</u>

- `npx prisma init --datasource-provider sqlite` .
  This creates a new prisma directory with your Prisma schema file and configures SQLite as your database. You're now ready to model your data and create your database with some tables.
- At this point, you have a Prisma schema but no database yet. Run the following command in your terminal to create the SQLite database and the User and Post tables represented by your models.
  `npx prisma migrate dev --name init`
