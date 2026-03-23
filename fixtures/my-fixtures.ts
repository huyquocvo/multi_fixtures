import { test as base} from '@playwright/test';
import { Page } from '@playwright/test';

// Define the types for your custom fixtures
type MyFixtures = {
  // First custom fixture type
  user: { name: string, password: string };
  // Second custom fixture type
  authenticatedPage: Page;
};

// Extend the base test with your custom fixtures
export const test = base.extend<MyFixtures>({
  // Fixture 1: user data (test-scoped by default)
  user: async ({}, use) => {
    // Setup phase: provide the user object to the test
    const userData = { name: 'root', password: 'admin123456789' };
    await use(userData);
    // Teardown phase: (optional) clean up resources after the test runs
    console.log('This is tear down');
  },

  // Fixture 2: authenticated page (depends on `page` fixture, can depend on `user`)
  authenticatedPage: async ({ page, user }, use) => {
    // Setup phase: perform login using the built-in 'page' and custom 'user'
    await page.goto('/joomla/administrator/index.php');
    await page.locator('#mod-login-username').fill(user.name);
    await page.locator('#mod-login-password').fill(user.password);
    await page.locator('#btn-login-submit').click();
   // await expect(page).toHaveURL(/dashboard/);

    // Provide the authenticated page to the test
    await use(page);

    // Teardown phase: (optional) perform logout
    await page.getByRole('button',{name: 'User Menu'}).click();
    await page.getByRole('link', {name:'Log out'}).click();
    console.log('Logged out after test');
  },
});

export { expect } from '@playwright/test';
