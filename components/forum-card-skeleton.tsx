import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

export function ForumCardSkeleton() {
  return (
    <Card className="mb-4 bg-gray-900 text-white border-0">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-gray-800 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-48 bg-gray-800 rounded animate-pulse" />
            <div className="h-3 w-32 bg-gray-800 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex space-x-2 mt-2">
          <div className="h-5 w-16 bg-gray-800 rounded-full animate-pulse" />
          <div className="h-5 w-16 bg-gray-800 rounded-full animate-pulse" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-800 rounded animate-pulse" />
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex space-x-4">
          <div className="h-8 w-16 bg-gray-800 rounded animate-pulse" />
          <div className="h-8 w-16 bg-gray-800 rounded animate-pulse" />
        </div>
      </CardFooter>
    </Card>
  )
}
