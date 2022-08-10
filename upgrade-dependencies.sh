#!/usr/bin/env bash

if [ "$1" == "" ] || [ "$1" == "--help" ]; then
  echo "Available flags:"
  echo "--help"
  echo "--run-expo-upgrade - run yarn and expo upgrade to update to latest SDK on all examples"
  echo "--run-fix-dependencies - run expo doctor --fix-dependencies on all repos"
  exit 0
fi

if [ "$1" == "--run-expo-upgrade" ]; then
  echo "Upgrading all projects to the latest SDK..."
  echo "For each example, this will run `yarn` and then run `expo upgrade`, accepting all defaults."
  echo "Upgrade logs will be written to .sdk-upgrade-logs."

  mkdir ./.sdk-upgrade-logs
  for d in */ ; do
    DIRNAME=${d%/}
    echo "Upgrading $DIRNAME..."
    echo "• Run yarn"
    (cd $DIRNAME && yarn --silent) # If yarn fails spectacularly, we'll see evidence in the logs for expo upgrade
    echo "• Run expo upgrade"
    (cd $DIRNAME && echo y | expo upgrade > ../.sdk-upgrade-logs/$DIRNAME.txt)
  done

  # yarn workspaces has example(s) inside of app folder
  echo "• Run expo upgrade on apps inside with-yarn-workspaces"
  mkdir ./.sdk-upgrade-logs/with-yarn-workspaces
  for d in  with-yarn-workspaces/apps/*/ ; do
    (cd $DIRNAME && echo y | expo upgrade > ../.sdk-upgrade-logs/$DIRNAME.txt)
  done

  echo "Upgrades complete! Check .sdk-upgrade-logs for results. Be sure to correct any errors or warnings."
  # TODO: should be possible to work around the latter two, at least. Need special logic for workspaces
  echo "with-yarn-workspaces, and with-gatsby have issues that may prevent this script from working properly!"
  exit 0
fi

if [ "$1" == "--run-fix-dependencies" ]; then
  echo "Fixing dependencies on all examples..."

  mkdir ./.sdk-upgrade-logs
  for d in */ ; do
    DIRNAME=${d%/}
    echo "Fixing dependencies on $DIRNAME..."
    (cd $DIRNAME && expo doctor --fix-dependencies)
  done

  echo "Fixing dependencies on apps inside with-yarn-workspaces..."
  mkdir ./.sdk-upgrade-logs/with-yarn-workspaces
  for d in  with-yarn-workspaces/apps/*/ ; do
    (cd $DIRNAME && expo doctor --fix-dependencies)
  done

  echo "Dependency fixes complete!"
  exit 0
fi

echo "Error: flag not recognized"