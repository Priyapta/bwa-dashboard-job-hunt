import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    "Design",
    "Sales",
    "Marketing",
    "Business",
    "Human Resource",
    "Finance",
    "Engineering",
    "Technology",
  ];

  await prisma.categoryJob.createMany({
    data: categories.map((name) => ({ name })),
  });

  console.log("✅ CategoryJob dummy data inserted");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
