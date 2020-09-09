const Resource = {
  tags: (parent, args, context) => {
    return context.prisma.resource.findOne({ where: { id: parent.id } }).tags();
  },
};

const Tag = {
  resources: (parent, args, context) => {
    return context.prisma.tag.findOne({ where: { id: parent.id } }).resources();
  },
};

module.exports = { Resource, Tag };
