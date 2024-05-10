const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Data Science" },
        { name: "Physics" },
        { name: "Chemistry" },
        { name: "Finance" },
        { name: "Accounting" },
        { name: "Engineering" },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.error("Error seeding the database: ", error);
  } finally {
    await database.$disconnect();
  }
}
main();
