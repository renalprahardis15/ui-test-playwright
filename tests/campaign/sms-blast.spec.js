import { test, expect } from '@playwright/test';
const { CampaignPage } = require('../../pages/campaign.page');

test.describe('SMS Blast', () => {
  let todoPage;
  test.use({ storageState: '.auth/user.json' });
  test.beforeEach(async ({ page }) => {
    todoPage = new CampaignPage(page)
    await page.goto('/campaigns/sms-blast');
  });

  test('C92254: Create SMS Blast (Without Schedule)', async ({ page }) => {
    await todoPage.campaignName('Test Sms Blast Now');
    await todoPage.campaignDescription('Test Description');
    await todoPage.timeCampaign('now');
    await page.getByRole('radio', { name: 'Specific Member' }).click();
    await page.getByPlaceholder('Choose specific member').click();
    await page.getByText('Phone Number').click();
    await page.getByPlaceholder('Input number').fill('85853916378');
    await page.getByRole('button', { name: 'SHOW COUNT' }).click();
    await page.waitForTimeout(3000);
    const checkElement = await page.getByText('Estimated Recipient : 1');
    if (await checkElement.isVisible()) {
      await expect(page.getByText('Estimated Recipient : 1')).toBeVisible();
    } else {
      await expect(page.getByText('Estimated Recipient : 2')).toBeVisible();
    }
    await todoPage.submitCampaign();
  });

  test('C92255: Create SMS Blast (With Schedule)', async ({ page }) => {
    await todoPage.campaignName('Test Sms Blast Later');
    await todoPage.campaignDescription('Test Description');
    await todoPage.timeCampaign('later')
    await page.getByRole('radio', { name: 'Specific Member' }).click();
    await page.getByPlaceholder('Choose specific member').click();
    await page.getByText('Phone Number').click();
    await page.getByPlaceholder('Input number').fill('85853916378');
    await page.getByRole('button', { name: 'SHOW COUNT' }).click();
    await page.waitForTimeout(3000);
    const checkElement = await page.getByText('Estimated Recipient : 1');
    if (await checkElement.isVisible()) {
      await expect(page.getByText('Estimated Recipient : 1')).toBeVisible();
    } else {
      await expect(page.getByText('Estimated Recipient : 2')).toBeVisible();
    }
    await todoPage.submitCampaign();
  });

  test('C92256: Create Save as draft (Without Schedule)', async ({ page }) => {
    await todoPage.campaignName('Test Sms Blast Draft Now');
    await todoPage.campaignDescription('Test Description');
    await todoPage.timeCampaign('now')
    await todoPage.specificMember();
    await todoPage.saveAsDraft();
  });

  test('C92257: Create Save as draft (With Schedule)', async ({ page }) => {
    await todoPage.campaignName('Test Sms Blast Draft Later');
    await todoPage.campaignDescription('Test Description');
    await todoPage.timeCampaign('later')
    await todoPage.specificMember();
    await todoPage.saveAsDraft();
  });

  test('C92258: Create by duplicate (Without Schedule)', async ({ page }) => {
    await todoPage.campaignName('Test Sms Blast Later');
    await todoPage.campaignDescription('Test Description');
    await todoPage.timeCampaign('later')
    await page.getByRole('radio', { name: 'Specific Member' }).click();
    await page.getByPlaceholder('Choose specific member').click();
    await page.getByText('Phone Number').click();
    await page.getByPlaceholder('Input number').fill('85853916378');
    await page.getByRole('button', { name: 'SHOW COUNT' }).click();
    await page.waitForTimeout(3000);
    const checkElement = await page.getByText('Estimated Recipient : 1');
    if (await checkElement.isVisible()) {
      await expect(page.getByText('Estimated Recipient : 1')).toBeVisible();
    } else {
      await expect(page.getByText('Estimated Recipient : 2')).toBeVisible();
    }
    await todoPage.submitCampaign();
    await todoPage.filterCampaign('SMS Blast', 'Scheduled', 'Test Sms Blast Later');
    await todoPage.turnOff();
    await todoPage.filterCampaign('SMS Blast', 'Completed', 'Test Sms Blast Later');
    await todoPage.duplicate();
    await todoPage.timeCampaign('now')
    await expect(page.getByText('Estimated Recipient : 1')).toBeVisible();
    await todoPage.submitCampaign();
  });

  test('C92259: Create by duplicate (With Schedule)', async ({ page }) => {
    await todoPage.campaignName('Test Sms Blast Later');
    await todoPage.campaignDescription('Test Description');
    await todoPage.timeCampaign('later')
    await page.getByRole('radio', { name: 'Specific Member' }).click();
    await page.getByPlaceholder('Choose specific member').click();
    await page.getByText('Phone Number').click();
    await page.getByPlaceholder('Input number').fill('85853916378');
    await page.getByRole('button', { name: 'SHOW COUNT' }).click();
    await page.waitForTimeout(3000);
    const checkElement = await page.getByText('Estimated Recipient : 1');
    if (await checkElement.isVisible()) {
      await expect(page.getByText('Estimated Recipient : 1')).toBeVisible();
    } else {
      await expect(page.getByText('Estimated Recipient : 2')).toBeVisible();
    }
    await todoPage.submitCampaign();
    await todoPage.filterCampaign('SMS Blast', 'Scheduled', 'Test Sms Blast Later');
    await todoPage.turnOff();
    await todoPage.filterCampaign('SMS Blast', 'Completed', 'Test Sms Blast Later');
    await todoPage.duplicate();
    await todoPage.timeCampaign('later')
    await expect(page.getByText('Estimated Recipient : 1')).toBeVisible();
    await todoPage.submitCampaign();
  });

  test('C92260: Delete Draft', async ({ page }) => {
    await page.goto('/campaigns')
    await todoPage.filterCampaign('SMS Blast', 'Draft', '');
    await todoPage.delete();
  });

  test('C92261: Empty State', async ({ page }) => {
    await page.getByRole('button', { name: 'CONTINUE' }).click();
    await expect(page.locator('div[class="alert open alert-with-icon top right alert-danger"]')).toBeVisible();
    await expect(page.getByText('Please write down the campaign description.')).toBeVisible();
    await page.getByText('Please fill the criteria').click();
  });

  test('C92263: Turn Off Campaign', async ({ page }) => {
    await page.goto('/campaigns')
    await todoPage.filterCampaign('SMS Blast', 'Scheduled', '');
    await todoPage.turnOff();
  });

  test('C92265: Change later date when status scheduled', async ({ page }) => {
    await page.goto('/campaigns')
    await todoPage.filterCampaign('SMS Blast', 'Scheduled', '');
    await todoPage.edit();
    await expect(page.getByText('Estimated Recipient : 1')).toBeVisible();
    await todoPage.submitCampaign();
  });

  test('C92266: Change later date when status draft', async ({ page }) => {
    await todoPage.campaignName('Test Sms Blast Draft Later');
    await todoPage.campaignDescription('Test Description');
    await todoPage.timeCampaign('later')
    await page.getByRole('radio', { name: 'Specific Member' }).click();
    await page.getByPlaceholder('Choose specific member').click();
    await page.getByText('Phone Number').click();
    await page.getByPlaceholder('Input number').fill('85853916378');
    await page.getByRole('button', { name: 'SHOW COUNT' }).click();
    await page.waitForTimeout(3000);
    const checkElement = await page.getByText('Estimated Recipient : 1');
    if (await checkElement.isVisible()) {
      await expect(page.getByText('Estimated Recipient : 1')).toBeVisible();
    } else {
      await expect(page.getByText('Estimated Recipient : 2')).toBeVisible();
    }
    await todoPage.saveAsDraft();
    await page.goto('/campaigns')
    await todoPage.filterCampaign('SMS Blast', 'Draft', '');
    await todoPage.edit();
    await expect(page.getByText('Estimated Recipient : 1')).toBeVisible();
    await todoPage.submitCampaign();
  });

  test('C92267: Change now to later date when status draft', async ({ page }) => {
    await todoPage.campaignName('Test Sms Blast Draft Now');
    await todoPage.campaignDescription('Test Description');
    await todoPage.timeCampaign('now')
    await page.getByRole('radio', { name: 'Specific Member' }).click();
    await page.getByPlaceholder('Choose specific member').click();
    await page.getByText('Phone Number').click();
    await page.getByPlaceholder('Input number').fill('85853916378');
    await page.getByRole('button', { name: 'SHOW COUNT' }).click();
    await page.waitForTimeout(3000);
    const checkElement = await page.getByText('Estimated Recipient : 1');
    if (await checkElement.isVisible()) {
      await expect(page.getByText('Estimated Recipient : 1')).toBeVisible();
    } else {
      await expect(page.getByText('Estimated Recipient : 2')).toBeVisible();
    }
    await todoPage.saveAsDraft();
    await page.goto('/campaigns')
    await todoPage.filterCampaign('SMS Blast', 'Draft', 'Test Sms Blast Draft Now');
    await todoPage.edit();
    await todoPage.timeCampaign('later');
    await expect(page.getByText('Estimated Recipient : 1')).toBeVisible();
    await todoPage.submitCampaign();
  });
});