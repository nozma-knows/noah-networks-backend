import { userQueryResolvers } from "./user.resolvers";
import { loginMutationResolvers } from "./login.resolvers";
import {
  sessionQueryResolvers,
  sessionMutationResolvers,
} from "./session.resolvers";
import { blogQueryResolvers, blogMutationResolvers } from "./blog.resolvers";
import {
  projectQueryResolvers,
  projectMutationResolvers,
} from "./project.resolvers";

export const resolvers: any = {
  Query: {
    ...sessionQueryResolvers,
    ...userQueryResolvers,
    ...blogQueryResolvers,
    ...projectQueryResolvers,
  },
  Mutation: {
    ...loginMutationResolvers,
    ...sessionMutationResolvers,
    ...blogMutationResolvers,
    ...projectMutationResolvers,
  },
};
