import CategoryDisplay from "./categories";
import { Categories } from "@/types/challenge";

export default async function ChallengesLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const resp = await fetch(`http://localhost:3000/api/challenges`);
    const cats: Categories = (await resp.json())['challenges'];

    return(
        <div className="w-full min-h-full">
            <h1 className="text-4xl font-semibold ml-10 m-4">Challenges</h1>
            <div className="flex">
                <div className=" w-2/6 pl-10 p-4 border">
                    <CategoryDisplay cats={cats}/>
                </div>
                <div className="w-4/6 border border-l-0">
                {children}
                </div>
            </div>
        </div>
    );
}