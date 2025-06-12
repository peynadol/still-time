import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { mockSessions } from "@/lib/data";
import { toTitle } from "@/lib/utils";

const RecentSessions = () => {
  const sorted = [...mockSessions].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg">Recent Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 pr-2">
          <div className="space-y-4">
            {sorted.slice(0, 5).map((session, idx) => (
              <div key={session.id}>
                <div className="font-medium">
                  {toTitle(session.type)}{" "}
                  <span className="text-sm text-muted-foreground">
                    —{" "}
                    {new Date(session.timestamp).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Tools:</span>{" "}
                  {toTitle(session.tools.join(", "))}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Mood:</span>{" "}
                  {toTitle(session.mood.join(", "))}
                </div>
                {idx < 4 && <Separator className="mt-2" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentSessions;
