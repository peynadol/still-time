import { mockSessions } from "@/lib/data";
import { toTitle } from "@/lib/utils";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default function SessionDetail({ params }: Props) {
  const session = mockSessions.find((s) => s.id === params.id);

  if (!session) return notFound();

  const date = new Date(session.timestamp).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">{toTitle(session.type)}</h1>
      <p className="text-sm text-muted-foreground">
        {date} · {session.duration} mins
      </p>

      <section>
        <h2 className="font-semibold">Tools Used</h2>
        <div className="flex flex-wrap gap-2">
          {session.tools.map((tool) => (
            <span key={tool} className="bg-muted px-2 py-1 rounded text-sm">
              {toTitle(tool)}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold">Mood</h2>
        <div className="flex flex-wrap gap-2">
          {session.mood.map((m) => (
            <span key={m} className="bg-muted px-2 py-1 rounded text-sm">
              {m}
            </span>
          ))}
        </div>
      </section>

      {session.notes && (
        <section>
          <h2 className="font-semibold">Notes</h2>
          <p className="whitespace-pre-line">{session.notes}</p>
        </section>
      )}
    </div>
  );
}
