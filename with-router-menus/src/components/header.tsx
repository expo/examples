import { MoreMenu, PageMenu, SortMenu } from "@/components/menus";
import { MaterialIcons } from "./icons";

export function Header() {
  return (
    <header className="flex h-12 px-4 flex-row justify-between items-center bg-white border-b border-b-slate-300 dark:bg-black dark:border-b-slate-800">
      <SortMenu>
        <MaterialIcons name="sort-ascending" size={24} />
      </SortMenu>

      <PageMenu />

      <MoreMenu>
        <MaterialIcons name="information-variant" size={24} />
      </MoreMenu>
    </header>
  );
}
