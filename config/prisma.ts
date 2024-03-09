const { PrismaClient } = require("@prisma/client");
const { PrismaLibSQL } = require("@prisma/adapter-libsql");
const { createClient } = require("@libsql/client");

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

module.exports = {
  prisma: prisma,
};
