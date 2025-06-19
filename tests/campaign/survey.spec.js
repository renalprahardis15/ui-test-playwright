import { test, expect } from '@playwright/test';
const { CampaignPage } = require('../../pages/campaign.page');

test.describe('Survey', () => {
  let todoPage;
  test.use({ storageState: '.auth/user.json' });
  test.beforeEach(async ({ page }) => {
    todoPage = new CampaignPage(page)
    await page.goto('/campaigns/surveys');
  });

  test('C92468: View', async ({ page }) => {
    await expect(page.getByText('Campaign Survey')).toBeVisible();
    await expect(page.getByText('Campaign Information')).toBeVisible();
    await expect(page.getByPlaceholder('Input campaign name')).toBeVisible();
    await expect(page.getByRole('button', { name: 'UPLOAD IMAGE' })).toBeVisible();
    await expect(page.frameLocator('iframe[title="Rich Text Editor\\, editor1"]').locator('html')).toBeVisible();
    await expect(page.getByPlaceholder('Select Privileges')).toBeVisible();
    await expect(page.getByPlaceholder('Select Program')).toBeVisible();
    await expect(page.getByPlaceholder('Select balance/wallet')).toBeVisible();
    await expect(page.getByRole('radio', { name: 'One Time' })).toBeVisible();
    await expect(page.getByPlaceholder('Input your phone number...')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
  });

  test('C92469: Inactive Program', async ({ page }) => {
    await page.getByPlaceholder('Select Program').click();
    await expect(page.locator('li').filter({ hasText: 'Program Inactive' })).not.toBeVisible();
  })

  test('C92470: Check condition when program balance is hidden', async ({ page }) => {
    await page.getByPlaceholder('Select Program').click();
    await page.getByText('Program Hide Balance').click();
    await page.getByPlaceholder('Select balance/wallet').click();
    await expect(page.locator('li').filter({ hasText: 'Balance / Wallet' })).toBeVisible();
  })

  test('C92471: Empty state survey', async ({ page }) => {
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('alert').getByText('Please fill the campaign name.')).toBeVisible();
    await expect(page.getByText('Please fill the content')).toBeVisible();
    await expect(page.getByText('Please fill the privilege')).toBeVisible();
    await expect(page.getByText('Please fill the select')).toBeVisible();
    await expect(page.getByText('Please fill the end date')).toBeVisible();
    await expect(page.getByText('Please fill the end time')).toBeVisible();
    await expect(page.getByText('Please fill the form title.')).toBeVisible();
  })

  test('C92473: Add question type - Text', async ({ page }) => {
    await page.getByText('Add a Question').click();
    await page.getByPlaceholder('Add New Category').nth(3).click();
    await page.locator('li').filter({ hasText: 'Short Text' }).nth(3).click();
    await expect(page.getByPlaceholder('Input your text')).toBeVisible();
  })

  test('C92474: Add question type - Radio button', async ({ page }) => {
    await page.getByText('Add a Question').click();
    await page.getByPlaceholder('Add New Category').nth(3).click();
    await page.getByText('Radio Button').nth(3).click();
    await page.getByRole('button', { name: 'Add Option' }).click();
    await page.getByRole('button', { name: 'Add Option' }).click();
    await page.locator('input[name="option-3-0"]').click();
    await page.locator('input[name="option-3-0"]').fill('Option 1');
    await page.locator('input[name="option-3-1"]').click();
    await page.locator('input[name="option-3-1"]').fill('Option 2');
    await expect(page.locator('input[name="option-3-0"]')).toHaveValue('Option 1');
    await expect(page.locator('input[name="option-3-1"]')).toHaveValue('Option 2');
  })

  test('C92475: Add question type - Checkbox', async ({ page }) => {
    await page.getByText('Add a Question').click();
    await page.getByPlaceholder('Add New Category').nth(3).click();
    await page.getByText('Checkbox').nth(3).click();
    await page.getByRole('button', { name: 'Add Option' }).click();
    await page.locator('input[name="option-3-0"]').click();
    await page.locator('input[name="option-3-0"]').fill('Checkbox 1');
    await page.getByRole('button', { name: 'Add Option' }).click();
    await page.locator('input[name="option-3-1"]').click();
    await page.locator('input[name="option-3-1"]').fill('Checkbox 2');
    await expect(page.locator('input[name="option-3-0"]')).toHaveValue('Checkbox 1');
    await expect(page.locator('input[name="option-3-1"]')).toHaveValue('Checkbox 2');
  })

  test('C92476: Add question type - Image Upload', async ({ page }) => {
    await page.getByText('Add a Question').click();
    await page.getByPlaceholder('Add New Category').nth(3).click();
    await page.getByText('Upload Image').nth(4).click();
    await expect(page.getByPlaceholder('Input your text')).toBeVisible();
  })

  test('C92477: Delete Question', async ({ page }) => {
    await page.getByText('Add a Question').click();
    await page.getByPlaceholder('Add New Category').nth(3).click();
    await page.getByText('Radio Button').nth(3).click();
    await expect(page.getByRole('button', { name: 'Add Option' })).toBeVisible();
    await page.locator('div:nth-child(6) > .col-lg-3 > div > img:nth-child(2)').click();
    await expect(page.getByRole('button', { name: 'Add Option' })).not.toBeVisible();
  })

  test('C92478: Delete Answer', async ({ page }) => {
    await page.getByText('Add a Question').click();
    await page.getByPlaceholder('Add New Category').nth(3).click();
    await page.locator('li').filter({ hasText: 'Checkbox' }).nth(3).click();
    await page.getByRole('button', { name: 'Add Option' }).click();
    await page.locator('input[name="option-3-0"]').click();
    await page.locator('input[name="option-3-0"]').fill('Answer 1');
    await expect(page.locator('input[name="option-3-0"]')).toHaveValue('Answer 1');
    await page.getByRole('button', { name: 'Add Option' }).click();
    await page.locator('input[name="option-3-1"]').fill('Answer 2');
    await page.locator('.fa').click();
    await page.getByRole('button', { name: 'Add Option' }).click();
    await expect(page.locator('input[name="option-3-1"]')).not.toHaveValue('Answer 1');
  })

  test('C92479: Empty state answer for checkbox/radio button', async ({ page }) => {
    await page.getByText('Add a Question').click();
    await page.getByPlaceholder('Add New Category').nth(3).click();
    await page.locator('li').filter({ hasText: 'Checkbox' }).nth(3).click();
    await page.getByRole('button', { name: 'Add Option' }).click();
    await page.locator('input[name="option-3-0"]').click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Please fill the question-')).toBeVisible();
  });

  test('C92481: Create survey without question', async ({ page }) => {
    await page.locator('img:nth-child(2)').first().click();
    await page.waitForTimeout(1000)
    await page.locator('img:nth-child(2)').first().click();
    await page.waitForTimeout(1000)
    await page.getByRole('img').nth(3).click();
    await expect(page.getByText('One question must be active')).toBeVisible();
  });





});