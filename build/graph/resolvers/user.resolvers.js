"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQueryResolvers = void 0;
const { prisma } = require("../../prisma/client");
exports.userQueryResolvers = {
    users: () => {
        return prisma.user.findMany();
    },
};
