import { test, expect } from '@playwright/test';

const routes = [
  { path: '/', heading: /truckload of ideas/i },
  { path: '/about', heading: /A team built to deliver/i },
  { path: '/divisions', heading: /every kind of load/i },
  { path: '/divisions/buzzmore', heading: /lead generation/i },
  { path: '/services', heading: /full load of services/i },
  { path: '/work', heading: /numbers that came back/i },
  { path: '/work/metro-retail-relaunch', heading: /relaunched in 90 days/i },
  { path: '/industries', heading: /every destination/i },
  { path: '/contact', heading: /Tell us the destination/i },
  { path: '/careers', heading: /carry bigger loads/i },
];

for (const route of routes) {
  test(`${route.path} renders with its heading`, async ({ page }) => {
    const res = await page.goto(route.path, { waitUntil: 'domcontentloaded' });
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator('h1')).toContainText(route.heading);
    // No obvious runtime error boundary.
    await expect(page.locator('body')).not.toContainText('Application error');
  });
}

test('navbar exposes primary navigation and CTA', async ({ page }) => {
  await page.goto('/');
  const menuToggle = page.getByRole('button', { name: /open menu/i });

  if (await menuToggle.isVisible()) {
    // Mobile: navigation + CTA live in the drawer behind the hamburger.
    await menuToggle.click();
    const drawer = page.getByRole('navigation', { name: /mobile/i });
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole('link', { name: /start a project/i })).toBeVisible();
  } else {
    // Desktop: inline primary nav + CTA.
    await expect(page.getByRole('navigation', { name: /primary/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /start a project/i }).first()).toBeVisible();
  }
});

test('contact form validates required fields', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: /send the brief/i }).click();
  await expect(page.getByText(/please enter your name/i)).toBeVisible();
});

test('contact form submits successfully (stubbed email in dev)', async ({ page }) => {
  await page.goto('/contact');
  // Scope to the contact form so the footer newsletter input doesn't collide.
  const form = page.locator('form').filter({ hasText: 'Service interest' });
  await form.getByPlaceholder('Your name').fill('Playwright Tester');
  await form.getByPlaceholder('you@company.com').fill('test@example.com');
  await form.getByPlaceholder('+91 ...').fill('+919876543210');
  await form
    .getByPlaceholder(/Tell us about your brand/i)
    .fill('This is an automated smoke-test enquiry message.');
  await form.getByRole('button', { name: /send the brief/i }).click();
  await expect(page.getByText(/Message on its way/i)).toBeVisible({ timeout: 15_000 });
});

test('404 page shows for unknown routes', async ({ page }) => {
  const res = await page.goto('/this-route-does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: /Wrong destination/i })).toBeVisible();
});
