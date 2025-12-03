import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getProducts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const purchase = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id);
    if (!product || product.quantity <= 0) return;
    await ctx.db.patch(args.id, { quantity: product.quantity - 1 });
  },
});
