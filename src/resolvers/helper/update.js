const getOldTags = async (id, context) => {
  return (
    await context.prisma.project
      .findOne({
        where: { id: id },
      })
      .tags()
  ).map((x) => ({
    id: x.id,
    name: x.name,
  }));
};

const formatCoC = (tag) => ({
  create: { name: tag },
  where: { name: tag },
});

const getTags = async (args, context) => {
  if (!args.tags) return {};

  const oldTags = await getOldTags(args.id, context);

  const oldNames = oldTags.map((oT) => oT.name);

  const new_tags = filterNewTags(args.tags, oldNames);

  const nextTags = { connectOrCreate: new_tags.map((x) => formatCoC(x)) };

  const abandonedTags = oldTags.filter((x) => !args.tags.includes(x.name));

  if (abandonedTags.length) {
    nextTags.disconnect = abandonedTags.map((x) => ({ id: x.id }));
  }

  return nextTags;
};

const filterNewTags = (nT, oT) => {
  return nT.filter((nT) => oT.findIndex((oT) => oT.name === nT) === -1);
};

module.exports = { getTags };
