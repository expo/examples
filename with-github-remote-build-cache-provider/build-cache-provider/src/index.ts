import { ModPlatform } from "@expo/config-plugins";
import path from "path";
import fs from "fs-extra";

import { RunOptions } from "./types";

import { isDevClientBuild, getBuildRunCacheDirectoryPath } from "./helpers";
import { getReleaseAssetsByTag, createReleaseAndUploadAsset } from "./github";
import { downloadAndMaybeExtractAppAsync } from "./download";

export async function resolveGitHubRemoteBuildCache(
  {
    projectRoot,
    platform,
    fingerprintHash,
    runOptions,
  }: {
    projectRoot: string;
    platform: ModPlatform;
    fingerprintHash: string;
    runOptions: RunOptions;
  },
  { owner, repo }: { owner: string; repo: string }
): Promise<string | null> {
  const cachedAppPath = getCachedAppPath({
    fingerprintHash,
    platform,
    projectRoot,
    runOptions,
  });
  if (fs.existsSync(cachedAppPath)) {
    console.log("Cached build found, skipping download");
    return cachedAppPath;
  }
  console.log(`Searching builds with matching fingerprint on Github Releases`);
  try {
    const assets = await getReleaseAssetsByTag({
      token: process.env.GITHUB_TOKEN!,
      owner,
      repo,
      tag: getTagName({
        fingerprintHash,
        projectRoot,
        runOptions,
      }),
    });

    const buildDownloadURL = assets[0].browser_download_url;
    return await downloadAndMaybeExtractAppAsync(
      buildDownloadURL,
      "ios",
      cachedAppPath
    );
  } catch (error) {
    console.log("No cached builds available for this fingerprint");
  }
  return null;
}

export async function uploadGitHubRemoteBuildCache(
  {
    projectRoot,
    fingerprintHash,
    runOptions,
    buildPath,
  }: {
    projectRoot: string;
    platform: ModPlatform;
    fingerprintHash: string;
    buildPath: string;
    runOptions: RunOptions;
  },
  { owner, repo }: { owner: string; repo: string }
): Promise<string | null> {
  console.log(`Uploading build to Github Releases`);
  try {
    const result = await createReleaseAndUploadAsset({
      token: process.env.GITHUB_TOKEN!,
      owner,
      repo,
      tagName: getTagName({
        fingerprintHash,
        projectRoot,
        runOptions,
      }),
      binaryPath: buildPath,
    });

    return result;
  } catch (error) {
    console.log("error", error);
    console.error(
      "Release failed:",
      error instanceof Error ? error.message : "Unknown error"
    );
    process.exit(1);
  }
}

function getTagName({
  fingerprintHash,
  projectRoot,
  runOptions,
}: {
  fingerprintHash: string;
  projectRoot: string;
  runOptions: RunOptions;
}): string {
  const isDevClient = isDevClientBuild({ projectRoot, runOptions });

  return `fingerprint.${fingerprintHash}${
    isDevClient || true ? ".dev-client" : ""
  }`;
}

function getCachedAppPath({
  fingerprintHash,
  platform,
  projectRoot,
  runOptions,
}: {
  fingerprintHash: string;
  projectRoot: string;
  runOptions: RunOptions;
  platform: "ios" | "android";
}): string {
  return path.join(
    getBuildRunCacheDirectoryPath(),
    `${getTagName({
      fingerprintHash,
      projectRoot,
      runOptions,
    })}.${platform === "ios" ? "app" : "apk"}`
  );
}

export default {
  resolveRemoteBuildCache: resolveGitHubRemoteBuildCache,
  uploadRemoteBuildCache: uploadGitHubRemoteBuildCache,
};
