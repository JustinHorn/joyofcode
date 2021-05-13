import { Context } from 'app-types';

const getOldTags = async (id: number, context: Context) => {
  return (
    await context.prisma.project
      .findFirst({
        where: { id: id },
      })
      .tags()
  ).map((x) => ({
    id: x.id,
    name: x.name,
  }));
};

const formatCoC = (tag: string) => ({
  create: { name: tag },
  where: { name: tag },
});

export const getTags = async (args: any, context: Context) => {
  if (!args.tags) return {};

  const oldTags = await getOldTags(args.id, context);

  const oldNames = oldTags.map((oT) => oT.name);

  const new_tags = filterNewTags(args.tags, oldNames);

  const nextTags = {
    connectOrCreate: new_tags.map((x: string) => formatCoC(x)),
    disconnect: undefined as { id: number }[] | undefined,
  };

  const abandonedTags = oldTags.filter((x) => !args.tags.includes(x.name));

  if (abandonedTags.length) {
    nextTags.disconnect = abandonedTags.map((x) => ({ id: x.id }));
  }

  return nextTags;
};

const filterNewTags = (nT: string[], oT: string[]) => {
  return nT.filter((nT) => oT.findIndex((oT) => oT === nT) === -1);
};
