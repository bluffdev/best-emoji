import { Emoji, PrismaClient } from "@prisma/client";

(async function empty() {
  const prisma = new PrismaClient();

  const emojis = await prisma.emoji.findMany({});

  async function deleteEmoji(emoji: Emoji) {
    return await prisma.emoji.delete({
      where: { id: emoji.id },
    });
  }

  async function deleteEmojis() {
    emojis.map((emoji) => deleteEmoji(emoji));
  }

  deleteEmojis();
})();
