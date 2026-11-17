import { expect, test, type Page } from "@playwright/test";

const email = process.env.MOCKATOO_TEST_EMAIL;
const password = process.env.MOCKATOO_TEST_PASSWORD;

async function startGitHubSignIn(page: Page) {
  // The app is interactive once it has asked for the session.
  const hydrated = page.waitForResponse("**/api/auth/get-session");
  await page.goto("/");
  await hydrated;
  await page.getByRole("button", { name: "Sign in with GitHub" }).click();
}

test("starts GitHub sign-in on Mockatoo", async ({ page }) => {
  await startGitHubSignIn(page);
  await expect(page).toHaveURL(/^https:\/\/app\.mockatoo\.globalunderdog\.com\//);
  await expect(page.getByLabel("Email", { exact: true })).toBeVisible();
});

test("signs in with GitHub through Mockatoo", async ({ page }) => {
  test.skip(
    !email || !password,
    "Set MOCKATOO_TEST_EMAIL and MOCKATOO_TEST_PASSWORD to run the full sign-in.",
  );
  await startGitHubSignIn(page);
  await page.getByLabel("Email", { exact: true }).fill(email!);
  await page.getByLabel("Password", { exact: true }).fill(password!);
  await page.getByRole("button", { name: "Log in with password" }).click();
  await page.getByRole("button", { name: "Authorize" }).click();
  await expect(page.getByText(`"email": "${email}"`)).toBeVisible();
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(
    page.getByRole("button", { name: "Sign in with GitHub" }),
  ).toBeVisible();
});
