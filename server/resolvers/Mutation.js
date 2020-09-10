const { getTags } = require("./helper/update");

const addResource = async (p, args, context, i) => {
  const tags = args.tags.map((n) => ({
    create: { name: n },
    where: { name: n },
  }));

  const resource = await context.prisma.resource.create({
    data: {
      author: args.author,
      title: args.title,
      href: args.href,
      tags: {
        connectOrCreate: tags,
      },
    },
  });

  return resource;
};

const updateResource = async (p, args, context, i) => {
  const { title, author } = args;

  const tags = await getTags(args, context);

  const resource = await context.prisma.resource.update({
    where: { id: args.id },
    data: {
      title,
      author,
      tags,
    },
  });

  return resource;
};

const deleteResource = async (p, args, context, i) => {
  return await context.prisma.resource.delete({
    where: { id: Number(args.id) },
  });
};

module.exports = { addResource, deleteResource, updateResource };
