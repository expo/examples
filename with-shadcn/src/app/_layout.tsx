import "../global.css";
import { Slot } from "expo-router";

import {  
  TooltipProvider,
} from "@/components/ui/tooltip"

export default function Layout() {
  return (
    <TooltipProvider>
      <Slot />
    </TooltipProvider>
  );
}
