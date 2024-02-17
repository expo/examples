import { MoreMenu, PageMenu, SortMenu } from "@/components/menus";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";

export function Header() {
  return (
    <header className="flex h-12 px-4 flex-row justify-between items-center bg-white border-b border-b-slate-300">
      <SortMenu>
        <MaterialIcons name="sort-ascending" color="black" size={24} />
      </SortMenu>

      <PageMenu
        projectName="My New Draft"
        pages={[
          {
            title: "Page 1",
            isInitial: true,
            isSelected: false,
          },
          {
            title: "Page 2",
            isInitial: false,
            isSelected: true,
          },
        ]}
      />

      <MoreMenu>
        <MaterialIcons name="dots-horizontal" color="black" size={24} />
      </MoreMenu>
    </header>
  );
}
