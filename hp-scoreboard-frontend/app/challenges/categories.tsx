'use client'
import { Categories, Challenge } from "@/types/challenge";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoryDisplay({cats}: Readonly<{cats:Categories}>) {
    const router = useRouter();
    const [openCat, setOpenCat] = useState("Web");
    return (Object.entries(cats).map(([cat, challenges]) => (<Collapsible key={cat} open={ cat == openCat } onOpenChange={() => setOpenCat(cat)}>
        <CollapsibleTrigger>
        <div className="w-[2/5] space-y-2 ml-10 m-4 rounded-md ">
            <h2 className="text-lg font-semibold">{cat} <ChevronsUpDown className="h-4 w-4 inline-block" /></h2>
        </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
        {challenges.map(( challenge: Challenge ) => (
            <Card 
                className={challenge.solved ? "w-[350px] ml-5 my-2 opacity-50": "w-[350px] ml-5 my-2"}
                key={challenge.id}
                onClick={ () => router.push( `/challenges/${challenge.id}` )}
            >
                <CardHeader>
                    <CardTitle>{challenge.name}</CardTitle>
                    <CardDescription>{challenge.points}</CardDescription>
                </CardHeader>
                <CardFooter className="gap-2">{challenge.tags.map((tag) => (<Badge key={tag} variant={"outline"}>{tag}</Badge>))}</CardFooter>
            </Card>)
        )}
        </CollapsibleContent>
    </Collapsible>)));
}