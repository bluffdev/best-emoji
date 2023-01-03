import { type NextPage } from "next";
import { trpc } from "../utils/trpc";

export const Results: NextPage = () => {
  const emojis = trpc.emoji.all.useQuery();

  function calcPercentage(wins: number, total: number) {
    return total === 0 ? 0 : (wins / total) * 100;
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="p-2 text-3xl">Results</h1>
        {emojis.data?.map((emoji) => (
          <div
            className="m-1 flex w-1/5 items-center justify-between rounded-sm border p-4"
            key={emoji.id}
          >
            <h1 className="text-4xl">{emoji.unicode}</h1>
            <h1 className="text-3xl">
              {calcPercentage(emoji.wins, emoji.total)}%
            </h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default Results;
