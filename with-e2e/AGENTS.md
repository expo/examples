# AGENTS.md

This is an Expo app with e2e tests by TesterArmy. The tests run on a local simulator, on Expo Simulators, and in EAS Workflows. Read this file before you change anything.

## Use the Expo skills

Install the official Expo skills before you touch Expo, EAS, or Expo Simulators code. Use them whenever one covers the task. They hold the current APIs. Your training data does not.

```bash
# Claude Code
claude plugin install expo@claude-plugins-official

# Codex
codex plugin add expo@openai-curated

# Cursor and other agents
npx skills add expo/skills
```

Docs: https://docs.expo.dev/skills

Which skill for which task:

| Task | Skill |
| --- | --- |
| Anything Expo, first | `expo-overview` |
| The screen, `@expo/ui` components, Liquid Glass | `expo-ui`, `expo-native-ui` |
| Navigation, the tabs | `expo-router` |
| Expo Simulators sessions, `eas simulator:*` | `eas-simulator` |
| The workflow in `.eas/workflows/` | `eas-workflows` |
| EAS builds, `eas.json` | `eas-app-stores` |
| Looking up another Expo example | `expo-examples` |

The e2e framework has its own guide for coding agents: https://e2e.tester.army/docs/coding-agents. `npx e2e init` can add its skill and MCP server to this project.

## Expo has changed. Do not trust your training data.

Expo ships breaking changes every SDK release. Before you write code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt and follow its links. Never answer from memory.

## Commands

```bash
npx expo install <package>   # always, instead of npm install: resolves SDK-compatible versions
npx expo start               # dev server
npx expo lint                # lint
npx tsc --noEmit             # typecheck
npx expo-doctor              # diagnose dependency and config issues

npm run ios:release          # Release build on the local iOS simulator
npm run android:release      # Release build on the local Android emulator
npm run test:e2e:ios         # run the suite on iOS (local, or Expo Simulators with E2E_IOS_BUILD_ID)
npm run test:e2e:android     # same for Android (E2E_ANDROID_BUILD_ID)
npm run test:e2e:web         # the runner starts Expo for the web
```

Run lint, typecheck, and the e2e suite before you declare a task done.

## The tests

- `tests/deterministic.e2e.ts` holds three locator tests. `tests/agentic.e2e.ts` holds two agent tests. They skip without `AI_GATEWAY_API_KEY`.
- Tests find elements by `testID`. Keep `name`, `greet`, `error`, and `greeting` on the form. Change the tests and the screen together.
- On iOS, `@expo/ui` TextInput and Button expose `testID` as the accessibility identifier. `@expo/ui` Text does not. Put text the tests assert on in React Native `Text`, outside the `Host`.
- Give the `@expo/ui` Button its text through `label`. A string child becomes a raw text node under a native view, and the app crashes at launch in a release build.
- Pair every `agent.act` with a locator assertion that does not depend on the model.
- `e2e.config.ts` has three targets: `ios`, `android`, and `web`. With `E2E_IOS_BUILD_ID` or `E2E_ANDROID_BUILD_ID` set, the mobile targets run on Expo Simulators. Without them, they drive the simulator or emulator on this machine.

## Expo Simulators and the workflow

- Expo Simulators is in limited access. Check with `npx eas-cli@latest simulator:availability` before you start a session. Sessions bill the account. Stop every session you start.
- The provider authenticates with `EXPO_TOKEN` or an `eas login`. Never write a token into a file in this repo.
- `.eas/workflows/e2e.yml` builds both platforms with the `e2e` profile in `eas.json`, then runs the suite on Expo Simulators from Linux runners. The `preview` EAS environment holds `EXPO_TOKEN`.
- Inside a workflow job, `EAS_BUILD_ID` belongs to EAS. Pass build ids as `E2E_IOS_BUILD_ID` and `E2E_ANDROID_BUILD_ID`.
- Validate a changed workflow with `npx eas-cli@latest workflow:validate .eas/workflows/e2e.yml`.

## Rules

- Routes live in `src/app/`. Every file there is a screen. Keep components, hooks, and utils outside it.
- Use `@expo/ui` universal components before React Native built-ins or community UI libraries. Every `@expo/ui` tree is wrapped in `Host`. Platform-specific files (`.ios.ts`) go in `src/components/`, never in `src/app/`.
- `ios/` and `android/` are generated. Never edit them by hand. Configure native behavior in `app.json` and config plugins.
- `@expo/ui` and `expo-glass-effect` need a development build or a release build. Expo Go does not run this app.
