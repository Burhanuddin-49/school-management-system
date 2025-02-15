import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentActivities() {
  const activities = [
    {
      id: 1,
      description: "John Doe submitted Math homework",
      time: "2 hours ago",
    },
    { id: 2, description: "Jane Smith joined Class 5A", time: "4 hours ago" },
    {
      id: 3,
      description: "Science fair project submissions opened",
      time: "1 day ago",
    },
    {
      id: 4,
      description: "Parent-teacher meeting scheduled",
      time: "2 days ago",
    },
  ];

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex justify-between items-center">
              <span className="text-sm">{activity.description}</span>
              <span className="text-xs text-muted-foreground">
                {activity.time}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
