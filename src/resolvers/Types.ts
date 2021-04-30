import { Context } from 'app-types';

export const Project = {
  tags: (parent: any, args: any, context: Context) => {
    return context.prisma.project.findOne({ where: { id: parent.id } }).tags();
  },
  postedBy: (parent: any, args: any, context: Context) => {
    return context.prisma.project
      .findOne({ where: { id: parent.id } })
      .postedBy();
  },
  likes: (parent: any, args: any, context: Context) => {
    return context.prisma.project.findOne({ where: { id: parent.id } }).likes();
  },
  likeCount: async (parent: any, args: any, context: Context) => {
    return await context.prisma.like.count({
      where: { projectId: parent.id },
    });
  },
  commentCount: async (parent: any, args: any, context: Context) => {
    return await context.prisma.comment.count({
      where: { projectId: parent.id },
    });
  },
  comments: async (parent: any, args: any, context: Context) => {
    return await context.prisma.project
      .findOne({ where: { id: parent.id } })
      .comments();
  },
  techTags: (parent: any) => parent.techTags || [],
};

const Tag = {
  projects: (parent: any, args: any, context: Context) => {
    return context.prisma.tag.findOne({ where: { id: parent.id } }).projects();
  },
};

export const User = {
  posts: (parent: any, args: any, context: Context) => {
    return context.prisma.user
      .findOne({ where: { id: parent.id } })
      .postedProjects();
  },
  likes: (parent: any, args: any, context: Context) => {
    return context.prisma.user.findOne({ where: { id: parent.id } }).likes();
  },
  comments: async (parent: any, args: any, context: Context) => {
    return await context.prisma.user
      .findOne({ where: { id: parent.id } })
      .comments();
  },
  commentCount: async (parent: any, args: any, context: Context) => {
    return await context.prisma.comment.count({
      where: { userId: parent.id },
    });
  },
  projectCount: async (parent: any, args: any, context: Context) => {
    return await context.prisma.project.count({
      where: { userId: parent.id },
    });
  },
  likeCount: async (parent: any, args: any, context: Context) => {
    return await context.prisma.like.count({
      where: { userId: parent.id },
    });
  },
};

export const Like = {
  user: (parent: any, args: any, context: Context) => {
    return context.prisma.like.findOne({ where: { id: parent.id } }).user();
  },
  project: (parent: any, args: any, context: Context) => {
    return context.prisma.like.findOne({ where: { id: parent.id } }).project();
  },
};

export const Comment = {
  postedBy: (parent: any, args: any, context: Context) => {
    return context.prisma.comment
      .findOne({ where: { id: parent.id } })
      .postedBy();
  },
  postedUnder: (parent: any, args: any, context: Context) => {
    return context.prisma.comment
      .findOne({ where: { id: parent.id } })
      .postedUnder();
  },
};
