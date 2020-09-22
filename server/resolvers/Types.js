const Resource = {
  tags: (parent, args, context) => {
    return context.prisma.resource.findOne({ where: { id: parent.id } }).tags();
  },
  postedBy: (parent, args, context) => {
    return context.prisma.resource
      .findOne({ where: { id: parent.id } })
      .postedBy();
  },
  likes: (parent, args, context) => {
    return (likes = context.prisma.resource
      .findOne({ where: { id: parent.id } })
      .likes());
  },
  likeCount: async (parent, args, context) => {
    const likes = await context.prisma.resource
      .findOne({ where: { id: parent.id } })
      .likes();
    return likes.length;
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
  likes: (parent, args, context) => {
    return context.prisma.user.findOne({ where: { id: parent.id } }).likes();
  },
};

const Like = {
  user: (parent, args, context) => {
    return context.prisma.like.findOne({ where: { id: parent.id } }).user();
  },
  resource: (parent, args, context) => {
    return context.prisma.like.findOne({ where: { id: parent.id } }).resource();
  },
};

module.exports = { Resource, Tag, User, Like };
