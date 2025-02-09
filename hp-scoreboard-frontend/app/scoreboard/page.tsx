import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"


interface Scores {
    [team: string]: number
}

export default async function Scoreboard() {
    const resp = await fetch('http://localhost:3000/api/scoreboard')
    const teams: Scores = (await resp.json())['scoreboard']
    const sortedTable: Array<Array<string|number>> = [];
    for (const team in teams) {
        sortedTable.push([team, teams[team]]);
    }

    sortedTable.sort((a: Array<string|number>, b: Array<string|number>) => {
        return (b[1] as number) - (a[1] as number);
    });
    return (
        <div>
        <div className="w-full flex justify-center mb-5">
            <h1 className="text-2xl m-auto">Scoreboard</h1>
        </div>
    <div className="w-full">
        <Table className="m-auto w-2/5">
        <TableCaption>Scoreboard</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Team name</TableHead>
            <TableHead className="text-right">Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTable.map(([team, points], index) => (
            <TableRow key={team}>
              <TableCell className="font-mono">{index}</TableCell>
              <TableCell className="font-medium font-mono">{team}</TableCell>
              <TableCell className="font-mono text-right">{points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div></div>);
}