import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockSessions } from "@/lib/data";
import { toTitle } from "@/lib/utils";
import Link from "next/link";

export default function AllSessionsPage() {
  const sorted = [...mockSessions].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6 px-4 py-8">
      <h1 className="text-2xl font-bold">All Sessions</h1>

      {sorted.map((session) => (
        <Card key={session.id}>
          <Link href={`/sessions/${session.id}`}>
            <CardHeader>
              <CardTitle className="text-lg hover:underline">
                {toTitle(session.type)}{" "}
                <span className="text-sm text-muted-foreground">
                  —{" "}
                  {new Date(session.timestamp).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <div>
                <span className="font-medium">Tools:</span>{" "}
                {toTitle(session.tools.join(", "))}
              </div>
              <div>
                <span className="font-medium">Mood:</span>{" "}
                {toTitle(session.mood.join(", "))}
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
