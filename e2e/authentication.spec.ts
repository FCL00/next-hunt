import { expect, test } from '@playwright/test';
import { generateUser } from '@/testing/data-generators';
import { paths } from '@/config/paths';

test('authenticate with email', async ({ page }) => {
  const user = generateUser();

  // navigate to account registration
  await page.goto(paths.home.getHref());
  await page.getByRole('link', { name: /Start Tracking - Free/i }).click();
  await page.waitForURL(paths.auth.signIn.getHref());
  await page.getByRole('link', { name: 'Create an Account' }).click();

  // registration
  await page.getByLabel('Name').fill(user.name);
  await page.getByLabel('Email').fill(user.email);
  await page.getByLabel('Password', { exact: true }).fill(user.password);
  await page.getByLabel('Confirm Password').fill(user.confirmPassword);
  await page.getByRole('button', { name: 'Create Account' }).click();

  // redirect to login page
  await expect(page).toHaveURL(paths.auth.signIn.getHref());

  // login
  await page.getByLabel('Email').fill(user.email);
  await page.getByLabel('Password').fill(user.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(paths.dashboard.app.getHref());

  // logout
  await page.getByRole('link', { name: 'Settings' }).click();
  await expect(page).toHaveURL(paths.dashboard.settings.getHref());
  await page.getByRole('button', { name: 'Sign-Out' });
});
