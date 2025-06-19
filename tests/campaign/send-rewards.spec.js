import { test, expect } from '@playwright/test';
const { CampaignPage } = require('../../pages/campaign.page');

test.describe('Send Rewards', () => {
  let todoPage;
  test.use({ storageState: '.auth/user.json' });
  test.beforeEach(async ({ page }) => {
    todoPage = new CampaignPage(page)
    await page.goto('/campaigns/rewards');
  });

  test('C92466: Create send Rewards (Without schedule)', async ({ page }) => {
    await todoPage.campaignName('Test Rewards');
    await todoPage.uploadImage(1, './fixtures/images/banner.png');
    await todoPage.campaignTitle('Test Rewards');
    await todoPage.campaignDescription('Test Description');
    await todoPage.selectRewards('Dashboard Testing For','Balance');
    await todoPage.timeCampaign('now')
    await todoPage.specificMember();
    await todoPage.submitCampaign();
  });

  test('C92467: Create send Rewards (With schedule)', async ({ page }) => {
    await todoPage.campaignName('Test Rewards');
    await todoPage.uploadImage(1, './fixtures/images/banner.png');
    await todoPage.campaignTitle('Test Rewards');
    await todoPage.campaignDescription('Test Description');
    await todoPage.selectRewards('Dashboard Testing For','Balance');
    await todoPage.timeCampaign('later')
    await todoPage.specificMember();
    await todoPage.submitCampaign();
  });

  test('C92457: Create save as draft (Without schedule)', async ({ page }) => {
    await todoPage.campaignName('Test Rewards Draft Now');
    await todoPage.uploadImage(1, './fixtures/images/banner.png');
    await todoPage.campaignTitle('Test Rewards');
    await todoPage.campaignDescription('Test Description');
    await todoPage.selectRewards('Dashboard Testing For','Balance');
    await todoPage.timeCampaign('now')
    await todoPage.specificMember();
    await todoPage.saveAsDraft();
  });

  test('C924571: Create save as draft (Without schedule)', async ({ page }) => {
    await todoPage.campaignName('Test Rewards Draft Now');
    await todoPage.uploadImage(1, './fixtures/images/banner.png');
    await todoPage.campaignTitle('Test Rewards');
    await todoPage.campaignDescription('Test Description');
    await todoPage.selectRewards('Dashboard Testing For','Balance');
    await todoPage.timeCampaign('now')
    await todoPage.specificMember();
    await todoPage.saveAsDraft();
  });

  test('C92458: Create save as draft (With schedule)', async ({ page }) => {
    await todoPage.campaignName('Test Rewards Draft Schedule');
    await todoPage.uploadImage(1, './fixtures/images/banner.png');
    await todoPage.campaignTitle('Test Rewards');
    await todoPage.campaignDescription('Test Description');
    await todoPage.selectRewards('Dashboard Testing For','Balance');
    await todoPage.timeCampaign('later')
    await todoPage.specificMember();
    await todoPage.saveAsDraft();
  });

  test('C92459: Delete draft', async ({ page }) => {
    await page.goto('/campaigns')
    await todoPage.filterCampaign('Rewards Inside Privileges', 'Draft', '');

    await page.locator('td:nth-child(12)').first().click();
    await page.getByRole('button', { name: 'DELETE' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'DELETE' }).click();
    await expect(page.locator('div[class="alert open alert-with-icon top right alert-danger"]')).not.toBeVisible();
    await expect(page.locator('p').filter({ hasText: 'Campaign History' })).toBeVisible();
  });

  test('C92460: Empty State', async ({ page }) => {
    await page.getByRole('button', { name: 'CONTINUE' }).click();
    await expect(page.locator('div[class="alert open alert-with-icon top right alert-danger"]')).toBeVisible();
    await expect(page.getByText('Please write down the').nth(1)).toBeVisible();
    await expect(page.getByText('Please write down the campaign title.')).toBeVisible();
    await expect(page.getByText('Please fill the content')).toBeVisible();
    await expect(page.getByText('Please fill the evoucher name.')).toBeVisible();
    await expect(page.getByText('Please fill the end date')).toBeVisible();
    await expect(page.getByText('Please fill the criteria')).toBeVisible();
  });

  test('C92461: Turn Off Campaign', async ({ page }) => {
    await page.getByRole('button', { name: 'CONTINUE' }).click();
    await expect(page.locator('div[class="alert open alert-with-icon top right alert-danger"]')).toBeVisible();
    await expect(page.getByText('Please write down the').nth(1)).toBeVisible();
    await expect(page.getByText('Please write down the campaign title.')).toBeVisible();
    await expect(page.getByText('Please fill the content')).toBeVisible();
    await expect(page.getByText('Please fill the evoucher name.')).toBeVisible();
    await expect(page.getByText('Please fill the end date')).toBeVisible();
    await expect(page.getByText('Please fill the criteria')).toBeVisible();
  });

  test('C92462: Change later date when status scheduled', async ({ page }) => {
    const edit = true
    await page.goto('/campaigns')
    await todoPage.filterCampaign('Rewards Inside Privileges', 'Scheduled', '');

    await page.getByRole('cell', { name: 'ic-threedot' }).first().click();
    await page.getByRole('button', { name: 'EDIT' }).click();
    await page.locator('input[name="start later time"]').click();
    await page.locator('li').filter({ hasText: '20:' }).nth(2).click();
    await page.getByPlaceholder('Time select').nth(1).click();
    await page.locator('li').filter({ hasText: '23:30' }).nth(1).click();
    await expect(page.getByText('Estimated Recipient : 2')).toBeVisible();
    await page.getByPlaceholder('Select Wallet').click();
    await page.locator('li').filter({ hasText: /^Balance$/ }).click();
    
    await todoPage.submitCampaign(edit);
  });

  test('C92463: Change later date when status draft', async ({ page }) => {
    const edit = true
    await page.goto('/campaigns')
    await todoPage.filterCampaign('Rewards Inside Privileges', 'Draft', '');

    await page.getByRole('cell', { name: 'ic-threedot' }).first().click();
    await page.getByRole('button', { name: 'EDIT' }).click();
    await todoPage.timeCampaign('later');
    await page.getByPlaceholder('Select Wallet').click();
    await page.locator('li').filter({ hasText: /^Balance$/ }).click();
    await expect(page.getByText('Estimated Recipient : 2')).toBeVisible();
    await todoPage.submitCampaign(edit);
  });

  test('C92464: Change now to later date when status draft', async ({ page }) => {
    const edit = true
    await page.goto('/campaigns')
    await todoPage.filterCampaign('Rewards Inside Privileges', 'Draft', 'Test Rewards Draft Now');

    await page.getByRole('cell', { name: 'ic-threedot' }).first().click();
    await page.getByRole('button', { name: 'EDIT' }).click();
    await todoPage.timeCampaign('later');
    await page.getByPlaceholder('Select Wallet').click();
    await page.locator('li').filter({ hasText: /^Balance$/ }).click();
    await expect(page.getByText('Estimated Recipient : 2')).toBeVisible();
    await todoPage.submitCampaign(edit);
  });

  test("C92465: Send Reward with balance using program doesn't have loyalty", async ({ page }) => {
    await todoPage.campaignName('Test Rewards');
    await todoPage.uploadImage(1, './fixtures/images/banner.png');
    await todoPage.campaignTitle('Test Rewards');
    await todoPage.campaignDescription('Test Description');
    await todoPage.selectRewards('Program No Loyalty','Balance');
    await todoPage.timeCampaign('now')
    await todoPage.specificMember();
    await todoPage.submitCampaign();
  });
});