import { Octokit } from "@octokit/rest";
import fs from "fs-extra";
import { type RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import { v4 as uuidv4 } from "uuid";
import { create as createTar } from "tar";
import path from "path";

import { getTmpDirectory } from "./helpers";

interface GithubProviderOptions {
  token: string;
  owner: string;
  repo: string;
  tagName: string;
  binaryPath: string;
}

export async function createReleaseAndUploadAsset({
  token,
  owner,
  repo,
  tagName,
  binaryPath,
}: GithubProviderOptions) {
  const octokit = new Octokit({ auth: token });

  try {
    const commitSha = await getBranchShaWithFallback(octokit, owner, repo);

    const tagSha = await ensureAnnotatedTag(octokit, {
      owner,
      repo,
      tag: tagName,
      message: tagName,
      object: commitSha,
      type: "commit",
      tagger: {
        name: "Release Bot",
        email: "bot@expo.dev",
        date: new Date().toISOString(),
      },
    });

    const release = await octokit.rest.repos.createRelease({
      owner,
      repo,
      tag_name: tagName,
      name: tagName,
      draft: false,
      prerelease: true,
    });

    await uploadReleaseAsset(octokit, {
      owner,
      repo,
      releaseId: release.data.id,
      binaryPath,
    });

    return release.url;
  } catch (error) {
    throw new Error(
      `GitHub release failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

async function getBranchShaWithFallback(
  octokit: Octokit,
  owner: string,
  repo: string
): Promise<string> {
  const branchesToTry = ["main", "master"];

  for (const branchName of branchesToTry) {
    try {
      const { data } = await octokit.rest.repos.getBranch({
        owner,
        repo,
        branch: branchName,
      });
      return data.commit.sha;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("Branch not found")
      ) {
        if (branchName === "master") throw new Error("No valid branch found");
        continue;
      }
      throw error;
    }
  }
  throw new Error("Branch fallback exhausted");
}
async function ensureAnnotatedTag(
  octokit: Octokit,
  params: RestEndpointMethodTypes["git"]["createTag"]["parameters"]
): Promise<string> {
  const { owner, repo, tag } = params;
  const refName = `refs/tags/${tag}`;

  try {
    const { data: existingRef } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `tags/${tag}`,
    });
    // Return existing tag SHA
    return existingRef.object.sha;
  } catch (err: any) {
    if (err.status !== 404) {
      throw err;
    }
  }

  // Create the annotated tag object
  const { data: tagData } = await octokit.rest.git.createTag(params);

  // Create the tag reference pointing to the new tag object
  await octokit.rest.git.createRef({
    owner,
    repo,
    ref: refName,
    sha: tagData.sha,
  });

  return tagData.sha;
}

async function uploadReleaseAsset(
  octokit: Octokit,
  params: {
    owner: string;
    repo: string;
    releaseId: number;
    binaryPath: string;
  }
) {
  let filePath = params.binaryPath;
  let name = path.basename(filePath);
  if ((await fs.stat(filePath)).isDirectory()) {
    await fs.mkdirp(getTmpDirectory());
    const tarPath = path.join(getTmpDirectory(), `${uuidv4()}.tar.gz`);
    const parentPath = path.dirname(filePath);
    await createTar({ cwd: parentPath, file: tarPath, gzip: true }, [name]);
    filePath = tarPath;
    name = name + ".tar.gz";
  }

  const fileData = await fs.readFile(filePath);

  return octokit.rest.repos.uploadReleaseAsset({
    owner: params.owner,
    repo: params.repo,
    release_id: params.releaseId,
    name: name,
    data: fileData as unknown as string, // Type workaround for binary data
    headers: {
      "content-type": "application/octet-stream",
      "content-length": fileData.length.toString(),
    },
  });
}

export async function getReleaseAssetsByTag({
  token,
  owner,
  repo,
  tag,
}: {
  token: string;
  owner: string;
  repo: string;
  tag: string;
}) {
  const octokit = new Octokit({ auth: token });
  const release = await octokit.rest.repos.getReleaseByTag({
    owner,
    repo,
    tag,
  });
  return release.data.assets;
}
