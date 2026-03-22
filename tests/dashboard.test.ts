import { test, expect } from '../fixtures/my-fixtures';
// tests/dashboard.spec.ts
test('should display user name on dashboard', async ({ authenticatedPage, user }) => {
  // 'authenticatedPage' is an already logged-in page
  // 'user' is the user data
  await expect(authenticatedPage.getByRole('heading', { name: 'Home Dashboard' })).toBeVisible();
  // Your test logic here
});
test('another test using the same fixtures', async ({ authenticatedPage }) => {
  // Both fixtures (user, authenticatedPage) will be set up automatically
  await authenticatedPage.getByRole('button',{name: 'User Menu'}).click();
  await authenticatedPage.getByRole('link', { name: 'Edit Account' }).click()
  await expect(authenticatedPage.getByRole('heading',{name:'Users: Edit Profile'})).toBeVisible();
});