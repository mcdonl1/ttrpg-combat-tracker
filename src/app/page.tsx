import Link from "next/link";
import { Button } from "~/@/components/ui/button";

import { getServerAuthSession } from "~/server/auth";
import { ModeToggle } from "~/@/components/ModeToggle";
import { HomeView } from "~/components/HomeView";

export default async function Home() {
  const session = await getServerAuthSession(); // eslint-disable-line @typescript-eslint/no-unused-vars

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b px-6 py-2">
        <h1 className="text-xl font-semibold">Roll Initiative</h1>
        <div className="flex gap-3 align-middle">
          <ModeToggle />
          <Button variant="outline">
            <Link href="/api/auth/logout">
              Logout
            </Link>
          </Button>
        </div>
      </header>
      <main className="h-screen flex-1 overflow-hidden">
        <HomeView />
      </main>
    </div>
  );
}
