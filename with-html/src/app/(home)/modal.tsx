import { Body } from "@/components/ui/body";
import { ExternalLink } from "@/components/ui/external-link";
import * as AC from "@bacons/apple-colors";
import Animated, { FadeIn } from "react-native-reanimated";

export default function App() {
  return (
    <Body contentContainerClassName="px-5 pb-5 gap-2">
      <Animated.View entering={FadeIn.delay(100)}>
        <ToolCard icon={<Sparkle />}>
          Starting sandbox on <code>localhost:8081</code> with{" "}
          <code>bunx expo</code>
        </ToolCard>
      </Animated.View>
      <Animated.View entering={FadeIn.delay(200)}>
        <ToolCard icon={<MultiTool />}>
          Starting AI agent with <code>15 tools</code>
        </ToolCard>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(300)}>
        <ToolCard icon={<Rocket />}>
          Build completed successfully with{" "}
          <ExternalLink
            href="https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-html"
            target="_blank"
          >
            <code>launch.expo.dev</code>
          </ExternalLink>
        </ToolCard>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(400)}>
        <ToolCard icon={<Globe />}>
          Deployed website to{" "}
          <ExternalLink href="https://expo.dev" target="_blank">
            <code>example.expo.app</code>
          </ExternalLink>
        </ToolCard>
      </Animated.View>
    </Body>
  );
}

function ToolCard({
  children,
  icon,
}: {
  children?: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center flex-row gap-2 border border-gray-600 dark:border-gray-300 p-4 rounded-2xl"
      style={{
        borderCurve: "continuous",
      }}
    >
      {icon}
      <p className="text-gray-600 flex-1 dark:text-gray-300 text-lg my-0 py-0 pr-2">
        {children}
      </p>
    </div>
  );
}

function Globe() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={AC.label}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function Rocket() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={AC.label}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function Sparkle() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={AC.label}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
      <path d="M20 2v4" />
      <path d="M22 4h-4" />
      <circle cx="4" cy="20" r="2" />
    </svg>
  );
}

function MultiTool() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={AC.label}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2" />
      <path d="M18 6h.01" />
      <path d="M6 18h.01" />
      <path d="M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z" />
      <path d="M18 11.66V22a4 4 0 0 0 4-4V6" />
    </svg>
  );
}
