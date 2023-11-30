import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const send = mutation({
  args: { text: v.string(), isCompleted: v.boolean() },
  handler: async (ctx, { text, isCompleted }) => {
    // Send a new message.
    const newTaskId = await ctx.db.insert("tasks", { text, isCompleted });
    console.log({ newTaskId });
    return newTaskId;
  },
});

export const update = mutation({
  args: { _id: v.id("tasks"), text: v.string(), isCompleted: v.boolean() },
  handler: async (ctx, args) => {
    const { _id, text, isCompleted } = args;
    console.log(await ctx.db.get(_id));
    // { text: "foo", status: { done: true }, _id: ... }

    // Add `tag` and overwrite `status`:
    const update = await ctx.db.patch(_id, { text, isCompleted });
    console.log(await ctx.db.get(_id));

    return "success";
    // { text: "foo", tag: "bar", status: { archived: true }, _id: ... }

    // Unset `tag` by setting it to `undefined`
    // await ctx.db.patch(id, { tag: undefined });
    // console.log(await ctx.db.get(id));
    // { text: "foo", status: { archived: true }, _id: ... }
  },
});

export const deleteTask = mutation({
  args: { _id: v.id("tasks") },
  handler: async (ctx, args) => {
    const isDeleted = await ctx.db.delete(args._id);
    console.log({ isDeleted });
    return "success";
  },
});
