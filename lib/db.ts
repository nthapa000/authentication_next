import {PrismaClient} from "@prisma/client"

// We need this because in development we have , whenever we save the file NExtJS will do the Hot reload and their will be lot of PrismaClient()
declare global{
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") globalThis.prisma = db;
// export const db = new PrismaClient();

