import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";

export default function Header() {
    return (
        <header className="p-5 flex justify-between">
            <div>
                <Link href="/">HackPack</Link>
            </div>
            <ul className="flex gap-2">
                <li>
                    <Button variant="ghost">
                        <Link href="/scoreboard">Scoreboard</Link>
                    </Button>
                </li>
                <li>
                    <Button variant="ghost">
                        <Link href="/challenges">Challenges</Link>
                    </Button>
                </li>
                <li>
                    <Button variant="ghost">
                        <Link href="/team">Team</Link>
                    </Button>
                </li>
                <li>
                    <Button variant={"ghost"}>
                        <Link href="/login">Login</Link>
                    </Button>
                </li>
                <li>
                    <Button>
                        <Link href="/register">Register</Link>
                    </Button>
                </li>
                <ModeToggle />
            </ul>
            
        </header>);
}