import { test, expect } from '@playwright/test';

const URL = 'http://127.0.0.1:5173';
test('Should allow the user to sign in', async ({ page }) => {
  await page.goto(URL);
  await expect(page).toHaveTitle("Vite + React + TS");
  await page.getByRole('link', { name: "Sign In"}).click();
  await expect(page.getByRole('heading', { name : 'Sign In'})).toBeVisible();
  await page.locator('[name=email]').fill("e2e@yopmail.com");
  await page.locator('[name=password]').fill("abcd@123");
  await page.getByRole('button', { name : "Login"}).click();
  await expect(page.getByAltText("Sign In done.")).toBeVisible();
  // await expect(page.getByRole('heading', { name: "Home"})).toBeVisible();

});
