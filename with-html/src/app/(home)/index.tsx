import { Body } from "@/components/ui/body";
import { launchApp } from "@/lib/utils";
import { Link } from "expo-router";
import { Image } from "react-native";

export default function App() {
  return (
    <Body contentContainerClassName="px-5 gap-2">
      <header className="text-center flex flex-col gap-2">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Building native apps with familiar web syntax for markup, and native
          views for layouts and gestures.
        </p>
      </header>

      <Item src="https://github-production-user-asset-6210df.s3.amazonaws.com/9664363/479650547-d06c0912-9c91-4928-8274-da607cbf4f7e.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250819%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250819T180010Z&X-Amz-Expires=300&X-Amz-Signature=a14446c0eb936b20aed28e6519341694ff406f96d587e998b50aca894daf3a80&X-Amz-SignedHeaders=host">
        With <code>@expo/html-elements</code> and <code>nativewind</code>, you
        can write HTML syntax that renders to real native components. Combined
        with Tailwind CSS, you have an experience that makes web developers feel
        at home.”
      </Item>
      <Item src="https://github-production-user-asset-6210df.s3.amazonaws.com/9664363/479652544-316bfbf9-4229-4fa5-bf8a-3cbcda064226.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250819%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250819T180521Z&X-Amz-Expires=300&X-Amz-Signature=534052b0754ca4fc66da86c3ca0ddc925e9aba5d38368317dc492ec4a0dc1fc7&X-Amz-SignedHeaders=host">
        “Expo HTML Elements is a game-changer for building native apps with web
        syntax. It allows developers to leverage their existing web skills while
        creating performant and visually appealing mobile applications.”
      </Item>
    </Body>
  );
}

function Item({ src, children }: { src?: string; children?: React.ReactNode }) {
  return (
    <Link href="/" asChild style={{ borderRadius: 12 }}>
      <Link.Trigger>
        <article className="flex-1 rounded-xl overflow-hidden items-stretch md:flex-row border-[0.5px] bg-slate-100 border-slate-300 dark:bg-black dark:border-gray-700">
          <div className="flex-1 min-h-[240px]">
            <Image
              className="absolute inset-0"
              source={{
                uri: src,
              }}
            />
            <div className="absolute top-2 right-2">
              <Icon />
            </div>
          </div>

          <main className="flex-1 md:p-8 p-8 text-center md:text-left space-y-4">
            <p className="text-lg font-medium dark:text-slate-300">
              {children}
            </p>
            <article className="font-medium">
              <p className="text-sky-500 dark:text-sky-400 my-0">Evan Bacon</p>
              <p className="text-slate-700 dark:text-slate-500 my-2">
                Engineer, Expo
              </p>
            </article>
          </main>
        </article>
      </Link.Trigger>
      <Link.Menu>
        <Link.MenuAction
          title="Launch"
          icon="airplane.departure"
          onPress={() => launchApp()}
        />
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
