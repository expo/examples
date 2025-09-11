import { Body } from "@/components/ui/body";
import { useSearch } from "@/lib/use-search";

export default function SearchPage() {
  const searchQuery = useSearch();

  return (
    <Body contentContainerClassName="px-5 pb-5 gap-4">
      {searchQuery && (
        <span className="text-gray-600 dark:text-gray-300 text-lg my-0 py-0 pr-2">
          Query "{searchQuery}"
        </span>
      )}
    </Body>
  );
}
