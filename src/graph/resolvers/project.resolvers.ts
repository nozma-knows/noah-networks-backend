import {
  ProjectResolvers,
  ProjectInput,
} from "./../../__generated__/resolvers-types";
const { prisma } = require("../../prisma/client");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

export const projectQueryResolvers: ProjectResolvers = {
  project: (parents: any, args: { id: String }) => {
    const { id } = args;

    if (!id) {
      throw new Error("Required parameter is missing.");
    }

    const project = prisma.project.findFirst({
      where: {
        id,
      },
    });

    if (!project) {
      throw new Error("Can't find project.");
    }

    return project;
  },
  projects: () => {
    return prisma.project.findMany();
  },
};

export const projectMutationResolvers: ProjectResolvers = {
  // Create Project Mutation Resolver
  createProject: async (_parent: any, args: { input: ProjectInput }) => {
    // Grab args
    const { authorId, name, website, github, category, title, content } =
      args.input;

    // Grab args error handling
    if (!authorId || !name || !category || !title || !content) {
      throw new Error("Required parameter is missing.");
    }

    // Create project
    const project = await prisma.project.create({
      data: {
        id: crypto.randomUUID(),
        authorId,
        name,
        ...(website ? { website } : {}),
        ...(github ? { github } : {}),
        category,
        title,
        content,
      },
    });

    // Create project error handling
    if (!project) {
      throw new Error("Error creating project.");
    }

    return project;
  },
  updateProject: async (
    _parent: any,
    args: { id: String; input: ProjectInput }
  ) => {
    // Grab args
    const { id } = args;
    const { authorId, name, website, github, category, title, content } =
      args.input;
    console.log("args.input: ", { authorId, category, title, content });

    // Grab args error handling
    if (!id || !authorId || !name || !category || !title || !content) {
      throw new Error("Required parameter is missing.");
    }

    // Create project
    const updatedProject = await prisma.project.update({
      where: {
        id,
      },
      data: {
        authorId,
        name,
        website,
        github,
        category,
        title,
        content,
      },
    });

    // Update project error handling
    if (!updatedProject) {
      throw new Error("Error updating project.");
    }

    return updatedProject;
  },
  deleteProject: async (_parent: any, args: { id: String }) => {
    // Grab args
    const { id } = args;

    // Grab args error handling
    if (!id) {
      throw new Error("Required parameter is missing.");
    }

    // Delete project
    const deletedProject = await prisma.project.delete({
      where: {
        id,
      },
    });

    // Deleted project error handling
    if (!deletedProject) {
      throw new Error("Error updating project.");
    }

    return deletedProject;
  },
};
