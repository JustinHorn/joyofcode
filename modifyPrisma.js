const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function allLower() {
  const tags = await prisma.tag.findMany();
  console.log(tags);

  tags.forEach(async (t) => {
    if (t.name.split("").some((x) => x.toUpperCase() === x)) {
      console.log(t.name + " ... " + t.name.toLowerCase());
      const name = await prisma.tag.update({
        where: { id: t.id },
        data: { name: t.name.toLowerCase() },
      });
      console.log(name);
    }
  });
}

allLower();
