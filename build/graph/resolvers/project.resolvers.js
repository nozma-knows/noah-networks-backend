"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectMutationResolvers = exports.projectQueryResolvers = void 0;
const { prisma } = require("../../prisma/client");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
exports.projectQueryResolvers = {
    project: (parents, args) => {
        const { name } = args;
        if (!name) {
            throw new Error("Required parameter is missing.");
        }
        const project = prisma.project.findFirst({
            where: {
                name,
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
exports.projectMutationResolvers = {
    // Create Project Mutation Resolver
    createProject: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        // Grab args
        const { authorId, name, website, github, category, title, content } = args.input;
        // Grab args error handling
        if (!authorId || !name || !category || !title || !content) {
            throw new Error("Required parameter is missing.");
        }
        // Create project
        const project = yield prisma.project.create({
            data: Object.assign(Object.assign(Object.assign({ id: crypto.randomUUID(), authorId,
                name }, (website ? { website } : {})), (github ? { github } : {})), { category,
                title,
                content }),
        });
        // Create project error handling
        if (!project) {
            throw new Error("Error creating project.");
        }
        return project;
    }),
    updateProject: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        // Grab args
        const { id, authorId, name, website, github, category, title, content } = args.input;
        console.log("args.input: ", { authorId, category, title, content });
        // Grab args error handling
        if (!id || !authorId || !name || !category || !title || !content) {
            throw new Error("Required parameter is missing.");
        }
        // Create project
        const updatedProject = yield prisma.project.update({
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
    }),
    deleteProject: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        // Grab args
        const { id } = args;
        // Grab args error handling
        if (!id) {
            throw new Error("Required parameter is missing.");
        }
        // Delete project
        const deletedProject = yield prisma.project.delete({
            where: {
                id,
            },
        });
        // Deleted project error handling
        if (!deletedProject) {
            throw new Error("Error updating project.");
        }
        return deletedProject;
    }),
};
