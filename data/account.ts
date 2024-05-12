import { db } from "@/lib/db";
import { Account } from "@prisma/client";

export async function getAccountByUserId(
  userId: string
): Promise<Account | null> {
  try {
    const account = await db.account.findFirst({
      where: {
        userId,
      },
    });
    return account;
  } catch (error) {
    return null;
  }
}
