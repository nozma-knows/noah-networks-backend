import {
  BlogResolvers,
  BlogInput,
} from "./../../__generated__/resolvers-types";
const { prisma } = require("../../prisma/client");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

export const blogQueryResolvers: BlogResolvers = {
  blog: (parents: any, args: { title: String }) => {
    const { title } = args;

    if (!title) {
      throw new Error("Required parameter is missing.");
    }

    const blog = prisma.blog.findFirst({
      where: {
        title,
      },
    });

    if (!blog) {
      throw new Error("Can't find blog.");
    }

    return blog;
  },
  blogs: () => {
    return prisma.blog.findMany();
  },
};

export const blogMutationResolvers: BlogResolvers = {
  // Create Blog Mutation Resolver
  createBlog: async (_parent: any, args: { input: BlogInput }) => {
    // Grab args
    const { authorId, category, title, subtitle, content } = args.input;
    console.log("args.input: ", { authorId, category, title, content });

    // Grab args error handling
    if (!authorId || !category || !title || !subtitle || !content) {
      throw new Error("Required parameter is missing.");
    }

    // Create blog
    const blog = await prisma.blog.create({
      data: {
        id: crypto.randomUUID(),
        authorId,
        category,
        title,
        subtitle,
        content,
      },
    });

    // Create blog error handling
    if (!blog) {
      throw new Error("Error creating blog.");
    }

    return blog;
  },
  updateBlog: async (_parent: any, args: { input: BlogInput }) => {
    const { authorId, category, title, subtitle, content } = args.input;

    // Grab args error handling
    if (!authorId || !category || !title || !content) {
      throw new Error("Required parameter is missing.");
    }

    // Create blog
    const updatedBlog = await prisma.blog.update({
      where: {
        title,
      },
      data: {
        authorId,
        category,
        title,
        subtitle,
        content,
      },
    });

    // Update blog error handling
    if (!updatedBlog) {
      throw new Error("Error updating blog.");
    }

    return updatedBlog;
  },
  deleteBlog: async (_parent: any, args: { title: String }) => {
    // Grab args
    const { title } = args;

    // Grab args error handling
    if (!title) {
      throw new Error("Required parameter is missing.");
    }

    // Delete blog
    const deletedBlog = await prisma.blog.delete({
      where: {
        title,
      },
    });

    // Deleted blog error handling
    if (!deletedBlog) {
      throw new Error("Error updating blog.");
    }

    return deletedBlog;
  },
};
