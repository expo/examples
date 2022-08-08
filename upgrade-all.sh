#!/usr/bin/env bash

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

echo "Upgrades complete! Check .sdk-upgrade-logs for results. Be sure to correct any errors or warnings."
# TODO: should be possible to work around the latter two, at least. Need special logic for workspaces
echo "with-yarn-workspaces, and with-gatsby have issues that may prevent this script from working properly!"