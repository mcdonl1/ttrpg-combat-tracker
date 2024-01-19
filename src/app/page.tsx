import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { ModeToggle } from "~/@/components/ModeToggle";
import { HomeView } from "~/components/HomeView";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b px-6 py-2">
        <h1 className="text-xl font-semibold">Roll Initiative</h1>
      </header>
      <main className="h-screen flex-1 overflow-hidden">
        <HomeView />
      </main>
    </div>
  );
}
