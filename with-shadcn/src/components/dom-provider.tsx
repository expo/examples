import "@/global.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { IS_DOM } from "expo/dom";

export default function DOMProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  if (IS_DOM) {
    return <TooltipProvider>{children}</TooltipProvider>;
  }
  return <>{children}</>;
}
