#!/usr/bin/env bash

if [ "$1" == "" ] || [ "$1" == "--help" ]; then
  echo "Available flags:"
  echo "--help"
  echo "--run-expo-upgrade - run yarn to add latest Expo and npx expo install --fix upgrade to update to latest SDK on all examples"
  echo "--run-fix-dependencies - run npx expo install --fix on all repos"
  exit 0
fi

if [ "$1" == "--run-expo-upgrade" ]; then
  echo "Upgrading all projects to the latest SDK..."
  echo "For each example, this will run `yarn` to add latest Expo and then run `npx expo install --fix`, accepting all defaults."
  echo "Upgrade logs will be written to .sdk-upgrade-logs."

  mkdir ./.sdk-upgrade-logs
  for d in */ ; do
    DIRNAME=${d%/}
    echo "Upgrading $DIRNAME..."
    echo "• Run yarn"
    (cd $DIRNAME && yarn --silent) # If yarn fails spectacularly, we'll see evidence in the logs for expo upgrade
    echo "• Run expo upgrade"
    (cd $DIRNAME && yarn add expo@latest && npx expo install --fix > ../.sdk-upgrade-logs/$DIRNAME.txt)
  done

  # yarn workspaces has example(s) inside of app folder
  echo "• Run expo upgrade on apps inside with-yarn-workspaces"
  mkdir ./.sdk-upgrade-logs/with-yarn-workspaces
  for d in  with-yarn-workspaces/apps/*/ ; do
    (cd $DIRNAME && yarn add expo@latest && npx expo install --fix > ../.sdk-upgrade-logs/with-yarn-workspaces/$DIRNAME.txt)
  done

  echo "Upgrades complete! Check .sdk-upgrade-logs for results. Be sure to correct any errors or warnings."
  echo "WARNING: with-dev-client has native project files that need to be upgraded manually!"
  echo "Deleting ios/android folders and running prebuild will regenerate them, applying the proper URL schemes."
  echo "https://docs.expo.dev/development/installation/ has more info on how a bare dev client project is setup."
  exit 0
fi

if [ "$1" == "--run-fix-dependencies" ]; then
  echo "Fixing dependencies on all examples..."

  mkdir ./.sdk-upgrade-logs
  for d in */ ; do
    DIRNAME=${d%/}
    echo "Fixing dependencies on $DIRNAME..."
    (cd $DIRNAME && npx expo install --fix)
  done

  echo "Fixing dependencies on apps inside with-yarn-workspaces..."
  mkdir ./.sdk-upgrade-logs/with-yarn-workspaces
  for d in  with-yarn-workspaces/apps/*/ ; do
    (cd $DIRNAME && npx expo install --fix)
  done

  echo "Dependency fixes complete!"
  exit 0
fi

echo "Error: flag not recognized"