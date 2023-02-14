"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_resolvers_1 = require("./user.resolvers");
const login_resolvers_1 = require("./login.resolvers");
const session_resolvers_1 = require("./session.resolvers");
const blog_resolvers_1 = require("./blog.resolvers");
const project_resolvers_1 = require("./project.resolvers");
exports.resolvers = {
    Query: Object.assign(Object.assign(Object.assign(Object.assign({}, session_resolvers_1.sessionQueryResolvers), user_resolvers_1.userQueryResolvers), blog_resolvers_1.blogQueryResolvers), project_resolvers_1.projectQueryResolvers),
    Mutation: Object.assign(Object.assign(Object.assign(Object.assign({}, login_resolvers_1.loginMutationResolvers), session_resolvers_1.sessionMutationResolvers), blog_resolvers_1.blogMutationResolvers), project_resolvers_1.projectMutationResolvers),
};
