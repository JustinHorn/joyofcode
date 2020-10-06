const Project = {
  tags: (parent, args, context) => {
    return context.prisma.project.findOne({ where: { id: parent.id } }).tags();
  },
  postedBy: (parent, args, context) => {
    return context.prisma.project
      .findOne({ where: { id: parent.id } })
      .postedBy();
  },
  likes: (parent, args, context) => {
    return (likes = context.prisma.project
      .findOne({ where: { id: parent.id } })
      .likes());
  },
  likeCount: async (parent, args, context) => {
    return await context.prisma.like.count({
      where: { projectId: parent.id },
    });
  },
  commentCount: async (parent, args, context) => {
    return await context.prisma.comment.count({
      where: { projectId: parent.id },
    });
  },
  comments: async (parent, args, context) => {
    return await context.prisma.project
      .findOne({ where: { id: parent.id } })
      .comments();
  },
  techTags: (parent) => parent.techTags || [],
};

const Tag = {
  projects: (parent, args, context) => {
    return context.prisma.tag.findOne({ where: { id: parent.id } }).projects();
  },
};

const User = {
  posts: (parent, args, context) => {
    return context.prisma.user
      .findOne({ where: { id: parent.id } })
      .postedprojects();
  },
  likes: (parent, args, context) => {
    return context.prisma.user.findOne({ where: { id: parent.id } }).likes();
  },
  comments: async (parent, args, context) => {
    return await context.prisma.user
      .findOne({ where: { id: parent.id } })
      .comments();
  },
  commentCount: async (parent, args, context) => {
    return await context.prisma.comment.count({
      where: { userId: parent.id },
    });
  },
  projectCount: async (parent, args, context) => {
    return await context.prisma.project.count({
      where: { userId: parent.id },
    });
  },
  likeCount: async (parent, args, context) => {
    return await context.prisma.like.count({
      where: { userId: parent.id },
    });
  },
};

const Like = {
  user: (parent, args, context) => {
    return context.prisma.like.findOne({ where: { id: parent.id } }).user();
  },
  project: (parent, args, context) => {
    return context.prisma.like.findOne({ where: { id: parent.id } }).project();
  },
};

const Comment = {
  postedBy: (parent, args, context) => {
    return context.prisma.comment
      .findOne({ where: { id: parent.id } })
      .postedBy();
  },
  postedUnder: (parent, args, context) => {
    return context.prisma.comment
      .findOne({ where: { id: parent.id } })
      .postedUnder();
  },
};

module.exports = { Project, Tag, User, Like, Comment };
