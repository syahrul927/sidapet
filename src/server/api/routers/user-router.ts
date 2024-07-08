import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { Prisma, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";
import passwordHash from "~/lib/password-hash";

const UserRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: input,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User tidak ditemukan!",
        });
      }
      await ctx.db.user.delete({
        where: {
          id: input,
        },
      });
    }),
  changePassword: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, password } = input;
      const user = await ctx.db.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User tidak ditemukan!",
        });
      }
      await ctx.db.user.update({
        where: {
          id,
        },
        data: {
          password: passwordHash(password),
        },
      });
    }),
  findAll: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany({
      orderBy: {
        createdDate: "desc",
      },
    });
    return userDtoList(users);
  }),
  findById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: input,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User tidak ditemukan!",
        });
      }
      return userDto(user);
    }),
  updateAccount: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        phoneNumber: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, phoneNumber, email } = input;
      const user = await ctx.db.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User tidak ditemukan!",
        });
      }
      try {
        await ctx.db.user.update({
          where: {
            id,
          },
          data: {
            name,
            phoneNumber,
            email,
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            console.log(
              "There is a unique constraint violation, a new user cannot be created with this email",
            );
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Email sudah pernah terdaftar!",
            });
          }
        }
      }
    }),
  registerUser: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        name: z.string(),
        phoneNumber: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password, name, phoneNumber } = input;
      try {
        await ctx.db.user.create({
          data: {
            password: passwordHash(password),
            email,
            phoneNumber,
            name,
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            console.log(
              "There is a unique constraint violation, a new user cannot be created with this email",
            );
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Email sudah pernah terdaftar!",
            });
          }
        }
      }
    }),
});
export default UserRouter;

const userDtoList = (users: User[]) => {
  return users.map((user) => userDto(user));
};
const userDto = (user: User) => {
  return {
    email: user.email,
    name: user.name,
    phoneNumber: user.phoneNumber ?? "",
    id: user.id,
    createdDate: user.createdDate,
  };
};
