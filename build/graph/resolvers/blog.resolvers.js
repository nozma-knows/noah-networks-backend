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
exports.blogMutationResolvers = exports.blogQueryResolvers = void 0;
const { prisma } = require("../../prisma/client");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
exports.blogQueryResolvers = {
    blog: (parents, args) => {
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
exports.blogMutationResolvers = {
    // Create Blog Mutation Resolver
    createBlog: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        // Grab args
        const { authorId, category, title, subtitle, content } = args.input;
        console.log("args.input: ", { authorId, category, title, content });
        // Grab args error handling
        if (!authorId || !category || !title || !subtitle || !content) {
            throw new Error("Required parameter is missing.");
        }
        // Create blog
        const blog = yield prisma.blog.create({
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
    }),
    updateBlog: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        const { authorId, category, title, subtitle, content } = args.input;
        // Grab args error handling
        if (!authorId || !category || !title || !content) {
            throw new Error("Required parameter is missing.");
        }
        // Create blog
        const updatedBlog = yield prisma.blog.update({
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
    }),
    deleteBlog: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        // Grab args
        const { title } = args;
        // Grab args error handling
        if (!title) {
            throw new Error("Required parameter is missing.");
        }
        // Delete blog
        const deletedBlog = yield prisma.blog.delete({
            where: {
                title,
            },
        });
        // Deleted blog error handling
        if (!deletedBlog) {
            throw new Error("Error updating blog.");
        }
        return deletedBlog;
    }),
};
