# AGENTS.md

An Expo app with e2e tests by TesterArmy. Use the Expo skills when one covers the task: https://docs.expo.dev/skills

## The tests

- Tests find elements by `testID`. Keep `name`, `greet`, `error`, and `greeting` on the form, and change the tests and the screen together.
- On iOS, `@expo/ui` TextInput and Button expose `testID` as the accessibility identifier. `@expo/ui` Text does not, so text the tests assert on is React Native `Text`, outside the `Host`.
- Give the `@expo/ui` Button its text through `label`. A string child is a raw text node under a native view, and a release build crashes at launch.
- On Android, keep the button at least 48dp tall. A smaller Compose clickable reports as two nodes, and a test tap on it fails with "no parent-owned touch point".
- Keep `web.output` as `single` in `app.json`. With server rendering, the page exists before React hydrates, and a test that fills or taps in that window loses its input.
- Pair every `agent.act` with a locator assertion that does not depend on the model.

## Expo Simulators and the workflow

- With `E2E_IOS_BUILD_ID` or `E2E_ANDROID_BUILD_ID` set, the mobile targets in `e2e.config.ts` run on Expo Simulators. Inside a workflow job, `EAS_BUILD_ID` belongs to EAS, so never use that name.
- Sessions bill the account. Check access with `npx eas-cli@latest simulator:availability` first.
