import { UserResolvers } from "../../__generated__/resolvers-types";
const { prisma } = require("../../prisma/client");

export const userQueryResolvers: UserResolvers = {
  users: () => {
    return prisma.user.findMany();
  },
};
