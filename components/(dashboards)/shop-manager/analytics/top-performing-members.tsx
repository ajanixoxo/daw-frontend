import { FileText, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const members = [
  {
    id: 1,
    name: "Turtleneck v-neck",
    network: "Lagos Artisan Network",
    amount: "$125,000",
    growth: "10%",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women-1mKJImVMrSp3VbcKqQVJvxqxMYmbvF.png",
  },
  {
    id: 2,
    name: "Turtleneck v-neck",
    network: "Lagos Artisan Network",
    amount: "$125,000",
    growth: "10%",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women-1mKJImVMrSp3VbcKqQVJvxqxMYmbvF.png",
  },
  {
    id: 3,
    name: "Turtleneck v-neck",
    network: "Lagos Artisan Network",
    amount: "$125,000",
    growth: "10%",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women-1mKJImVMrSp3VbcKqQVJvxqxMYmbvF.png",
  },
  {
    id: 4,
    name: "Turtleneck v-neck",
    network: "Lagos Artisan Network",
    amount: "$125,000",
    growth: "10%",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women-1mKJImVMrSp3VbcKqQVJvxqxMYmbvF.png",
  },
  {
    id: 5,
    name: "Turtleneck v-neck",
    network: "Lagos Artisan Network",
    amount: "$125,000",
    growth: "10%",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women-1mKJImVMrSp3VbcKqQVJvxqxMYmbvF.png",
  },
]

export default function TopPerformingMembers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <FileText className="h-5 w-5" />
          Top Performing Members
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-muted-foreground">{member.id}</span>
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-muted-foreground">{member.network}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  {member.growth}
                </div>
                <div className="text-lg font-semibold">{member.amount}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
