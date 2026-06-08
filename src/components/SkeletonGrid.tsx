
import SkeletonCard from "./SkeletonCard";

export default function SkeletonGrid() {
  return (
    <div
      className="
        columns-1
        sm:columns-2
        md:columns-3
        lg:columns-4
        gap-6
      "
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div className="mb-6 break-inside-avoid">
        <SkeletonCard key={i} />
        </div>
      ))}
    </div>
  );
}
