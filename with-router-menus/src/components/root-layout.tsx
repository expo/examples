import { Header } from "@/components/header";
import { Slot } from "expo-router";
// This is a general react-dom library and only requires the framework support server rendering.
// Adding it will ensure the body tag has the class="dark" injected when dark mode is enabled,
// this is required for tailwind css/shadcn to style correctly in dark mode.
import { ThemeProvider } from "next-themes";

export default function RootLayout() {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="flex flex-1 bg-white dark:bg-black flex-col">
          <Header />
          <Slot />
        </div>
      </ThemeProvider>
    </>
  );
}
