const Resource = {
  tags: (parent, args, context) => {
    return context.prisma.resource.findOne({ where: { id: parent.id } }).tags();
  },
  postedBy: (parent, args, context) => {
    return context.prisma.resource
      .findOne({ where: { id: parent.id } })
      .postedBy();
  },
};

const Tag = {
  resources: (parent, args, context) => {
    return context.prisma.tag.findOne({ where: { id: parent.id } }).resources();
  },
};

const User = {
  posts: (parent, args, context) => {
    return context.prisma.user
      .findOne({ where: { id: parent.id } })
      .postedResources();
  },
};

module.exports = { Resource, Tag, User };
