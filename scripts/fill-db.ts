import { PrismaClient } from "@prisma/client";

type HttpResponse = {
  name: string;
  category: string;
  group: string;
  htmlCode: string[];
  unicode: string[];
};

type Emoji = {
  name: string;
  unicode: string;
};

(async function fill() {
  function formatUnicodeString(unicode: string[]) {
    if (unicode[0]) {
      return String.fromCodePoint(
        parseInt(unicode[0].replace(/[U+]/g, ""), 16)
      );
    }
  }

  let emojis = await fetch("https://emojihub.yurace.pro/api/all")
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((data) =>
      (data as Array<HttpResponse>).map(
        ({ name, unicode }) =>
          ({
            name: name,
            unicode: formatUnicodeString(unicode),
          } as Emoji)
      )
    );

  const prisma = new PrismaClient();

  for (const { name, unicode } of emojis) {
    await prisma.emoji.create({
      data: {
        name: name,
        unicode: unicode,
        wins: 0,
        total: 0,
      },
    });
  }
})();
