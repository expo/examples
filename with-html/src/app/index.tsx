import { Image } from "react-native";

export default function App() {
  return (
    <main className="flex-1 items-center justify-center bg-white dark:bg-slate-900 p-4">
      <article className="bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
        <Image
          className="w-24 h-24 aspect-1 rounded-full mx-auto"
          source={{ uri: "https://github.com/evanbacon.png" }}
        />
        <main className="pt-6 md:p-8 text-center md:text-left space-y-4">
          <p className="text-lg font-medium dark:text-slate-300">
            <Icon /> With <code>@expo/html-elements</code> and{" "}
            <code>nativewind</code>, you can write HTML syntax that renders to
            real native components. Combined with Tailwind CSS, you have an
            experience that makes web developers feel at home.”
          </p>
          <article className="font-medium">
            <p className="text-sky-500 dark:text-sky-400 my-0">Evan Bacon</p>
            <p className="text-slate-700 dark:text-slate-500 my-2">
              Engineer, Expo
            </p>
          </article>
        </main>
      </article>
    </main>
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
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h12l4 6-10 13L2 9Z" />
      <path d="M11 3 8 9l4 13 4-13-3-6" />
      <path d="M2 9h20" />
    </svg>
  );
}
