'use client'

import { useEffect, useState, use } from "react";
import { Progress } from "@/components/ui/progress"
import { Challenge } from "@/types/challenge";
import { CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/components/hooks/use-toast"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

export default function ChallengeDisplay({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = use(params);
    const [loaded, setLoaded] = useState(false);
    const [challenge, setChallenge] = useState(null as Challenge | null);
    const [solved, setSolved] = useState(false);
    
    useEffect(() => {
        async function fetchChallenge() {
            const resp = await fetch(`/api/challenge/${id}`)
            const data = (await resp.json())['challenge'];
            setLoaded(true);
            setChallenge(data);
            setSolved(data['solved']);
        }
        fetchChallenge();
    }, [id]);


    const progressBar = <div className="flex align-middle justify-center h-full">
                            <Progress indeterminate={true} className="w-[60%] m-auto" />
                    </div>;

    const FormSchema = z.object({
        flag: z.string().regex(/hackpackctf{[A-Za-z0-9_]}/, {
        message: "The flag format is incorrect",
        }),
    })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      flag: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // @sodium TODO: Fix this per the actual API
    const resp = await fetch(`/api/challenge/${id}/solve`, {
        method: 'POST',
        body: JSON.stringify({
            teamToken: 'thiswillbetheteamtoken',
            flag: data.flag,
            proofOfWork: 'thiswillbetheproofofwork'
        })
    });

    const result = await resp.json();
    if (result.solved) {
        setSolved(result.solved);
        toast({
            title: `You solved ${challenge?.name}`,
            description: (
              <div className="mt-2 w-[340px] rounded-md">
                <code>{data.flag}</code> was the correct flag!
              </div>
            ),
        })
        return;
    }

    toast({
        title: `You did not solve ${challenge?.name}`,
        description: (
            <div className="mt-2 w-[340px] rounded-md">
            <code>{data.flag}</code> was incorrect!
          </div>
        ),
    })
  }

    return (<div className="h-full">
        {loaded ? <div>
            {challenge && 
            <div>
                <CardHeader>
                    <CardTitle className="text-2xl">{challenge.name}</CardTitle>
                    <CardDescription className="text-xl">
                    {challenge.category}
                    </CardDescription>
                    <div className="mr-5">{challenge.tags.map((tag) => (
                        <Badge key={tag} variant={"outline"} className="mx-1">{tag}</Badge>
                        ))}</div>
                </CardHeader>
                <CardContent>
                        <div>{challenge.description}</div>
                        {challenge.link && <div className="my-5">
                        Link: {<a href={challenge.link} className="underline">{challenge.link}</a>}
                        </div>}
                        {challenge.files && challenge.files.length &&<div className="my-2">
                            {challenge.files.map(
                                (file) => (
                                <a href={file.url} key={file.name} className="mr-2">
                                    <Button variant={"secondary"}>{file.name}</Button>
                                    </a>
                                ))
                            }
                        </div>}
                </CardContent>
                <CardFooter className="block">
                    <div>{<Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 text-lg">
                            <FormField
                            control={form.control}
                            name="flag"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Flag</FormLabel>
                                <FormControl>
                                    <Input placeholder="hackpackctf{flag}" disabled={solved} className="font-mono" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Did you solve the challenge?
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" disabled={solved}>Submit</Button>
                        </form>
                    </Form>}</div>
                </CardFooter>
            </div>}
            </div> : progressBar }
        </div>
    );
}