const { PrismaClient } = require("@prisma/client");
const seedUtils = require("./seedUtils.cjs");

const prisma = new PrismaClient();
const users = ["Eric", "John", "Jane"];

async function load() {
  try {
    // create users
    users.map(
      async (user) =>
        await prisma.user.create({
          data: seedUtils.createUser(user),
        })
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

load();
