import { Skeleton } from '@/shared/ui/skeleton'

export const HeaderSkeleton = () => {
  return (
    <div className="flex w-fit items-center gap-4">
      <div className="grid justify-items-end gap-2">
        <Skeleton className="h-4 w-37.5" />
        <Skeleton className="align- h-4 w-25" />
      </div>
      <Skeleton className="size-10 shrink-0 rounded-full" />
    </div>
  )
}
