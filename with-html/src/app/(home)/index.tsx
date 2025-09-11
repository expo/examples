import { Body } from "@/components/ui/body";
import { launchApp } from "@/lib/utils";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { Pressable } from "react-native";

export default function App() {
  return (
    <Body contentContainerClassName="px-5 pb-5 gap-2">
      <header className="text-center flex flex-col gap-2">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Building native apps with familiar web syntax for markup, and native
          views for layouts and gestures.
        </p>
      </header>

      <Item src={require("@/../assets/surfer.avif")}>
        With <code>@expo/html-elements</code>, you can write HTML syntax that
        renders to real native components.{"\n"}Combined with Tailwind CSS, you
        have an experience that makes web developers feel at home.
      </Item>
      <Item src={require("@/../assets/marble.avif")}>
        “Expo HTML Elements is a game-changer for building native apps with web
        syntax. It allows developers to leverage their existing web skills while
        creating performant and visually appealing mobile applications.”
      </Item>
    </Body>
  );
}

function Item({ src, children }: { src?: string; children?: React.ReactNode }) {
  return (
    <Link href="/modal" asChild style={{ borderRadius: 12 }}>
      <Link.Trigger>
        <Pressable>
          <article className="flex-1 rounded-xl overflow-hidden items-stretch md:flex-row border-[0.5px] bg-slate-100 border-slate-300 dark:bg-black dark:border-gray-700">
            <div className="flex-1 min-h-[240px]">
              <Image style={{ flex: 1 }} source={src} />
              <div className="absolute top-2 right-2">
                <Icon />
              </div>
            </div>

            <main className="flex-1 md:p-8 p-8 text-center md:text-left space-y-4">
              <p className="text-lg font-medium dark:text-slate-300">
                {children}
              </p>
              <article className="font-medium">
                <p className="text-sky-500 dark:text-sky-400 my-0">
                  Evan Bacon
                </p>
                <p className="text-slate-700 dark:text-slate-500 my-1">
                  Engineer, Expo
                </p>
              </article>
            </main>
          </article>
        </Pressable>
      </Link.Trigger>
      <Link.Menu>
        <Link.MenuAction
          title="Launch"
          icon="apps.iphone.badge.plus"
          onPress={() => launchApp()}
        />
        <Link.Menu title="More" icon="ellipsis">
          <Link.MenuAction
            title="Share"
            icon="square.and.arrow.up"
            onPress={() => alert("Share pressed")}
          />
          <Link.MenuAction
            title="Delete"
            destructive
            icon="trash"
            onPress={() => alert("Delete pressed")}
          />
        </Link.Menu>
      </Link.Menu>
    </Link>
  );
}

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(255,255,255,0.5)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}
