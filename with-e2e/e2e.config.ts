import { easSimulators } from '@e2e-dev/eas';
import { mobile } from '@e2e-dev/mobile';
import { web } from '@e2e-dev/web';
import { gateway } from 'ai';
import type { E2EConfig } from 'e2e';

// The bundle identifier and package name from app.json. app.open() launches this app.
const app = { bundleId: 'dev.expo.examples.withe2e' };

// With a build id set, the target runs on Expo Simulators: @e2e-dev/eas leases a hosted
// simulator or emulator per worker, EAS installs that build on it, and the tests drive it
// through the agent-device daemon beside it. EXPO_TOKEN or an `eas login` authenticates.
//
// Without a build id, the target drives the simulator or emulator on this machine.
// E2E_DEVICE picks one when several are booted.
//
// Not EAS_BUILD_ID: EAS sets that one inside a workflow job for the job itself.
const iosBuildId = process.env.E2E_IOS_BUILD_ID;
const androidBuildId = process.env.E2E_ANDROID_BUILD_ID;

export default {
  agents: {
    default: {
      // Agent steps go through the Vercel AI Gateway. Set AI_GATEWAY_API_KEY to run them.
      model: gateway('openai/gpt-6-luna-fast'),
      system: 'You are a thorough QA agent. Verify every outcome.',
    },
  },
  targets: [
    {
      name: 'ios',
      engine: mobile({
        platform: 'ios',
        device: iosBuildId
          ? easSimulators({ buildId: iosBuildId, device: 'iPhone 17' })
          : process.env.E2E_DEVICE,
        // Drawing touches into a recording takes minutes to stop on an EAS simulator.
        videoTouches: iosBuildId ? false : undefined,
      }),
      app,
    },
    {
      name: 'android',
      engine: mobile({
        platform: 'android',
        device: androidBuildId
          ? easSimulators({ buildId: androidBuildId, device: 'pixel_9' })
          : process.env.E2E_DEVICE,
        videoTouches: androidBuildId ? false : undefined,
      }),
      app: androidBuildId
        ? app
        : { ...app, appPath: 'android/app/build/outputs/apk/release/app-release.apk' },
    },
    {
      name: 'web',
      engine: web(),
      // Port 0: the runner picks a free port and starts Expo for the web on it.
      app: {
        url: 'http://127.0.0.1:0',
        command: {
          executable: 'npx',
          args: ['expo', 'start', '--web', '--port', '{port}'],
          env: { CI: '1' },
          startupTimeout: 120_000,
        },
      },
    },
  ],
  workers: 1,
} satisfies E2EConfig;
