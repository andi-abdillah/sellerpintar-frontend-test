import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
}

const TableSkeleton = ({ rows = 10 }: TableSkeletonProps) => {
  return (
    <div className="w-full overflow-x-auto p-4">
      <div className="space-y-4">
        {[...Array(rows)].map((_, rowIdx) => (
          <Skeleton key={rowIdx} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
