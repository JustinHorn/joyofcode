const getOldTagIds = async (id, context) => {
  return (
    await context.prisma.resource
      .findOne({
        where: { id: id },
      })
      .tags()
  ).map((x) => ({
    id: x.id,
  }));
};

const formatCoC = (tag) => ({
  create: { name: tag },
  where: { name: tag },
});

const getTags = async (args, context) => {
  if (!args.tags) return {};

  const tags = { connectOrCreate: args.tags.map((x) => formatCoC(x)) };

  const oldTags = await getOldTagIds(args.id, context);

  if (oldTags.length) {
    tags.disconnect = oldTags;
  }

  return tags;
};

module.exports = { getTags };
