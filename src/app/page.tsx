import ClientComponent from "./_components/ClientComponent";
import { ServerComponent } from "./_components/ServerComponent";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex gap-4 w-full">
        <ServerComponent title="Server Component" />
        <Suspense fallback={<p>...loading</p>}>
          <ServerComponent title="Streamed Server Component" />
        </Suspense>
        <ClientComponent />
      </div>
    </main>
  );
}
