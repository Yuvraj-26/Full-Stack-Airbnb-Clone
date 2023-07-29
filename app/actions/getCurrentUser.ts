import { getServerSession } from "next-auth/next"

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

// get server session in server component to find current user
export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    // if session not correct
    if (!session?.user?.email) {
      // session does not exist
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      }
    });

    // if no current user
    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: 
        currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}

