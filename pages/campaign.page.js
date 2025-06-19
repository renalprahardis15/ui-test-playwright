import { test, expect } from '@playwright/test';
exports.CampaignPage = class CampaignPage {
  constructor(page) {
    this.page = page;
  }

  async specificMember() {
    await this.page.getByRole('radio', { name: 'Specific Member' }).click();
    await this.page.getByPlaceholder('Choose specific member').click();
    await this.page.getByText('Phone Number').click();
    await this.page.getByPlaceholder('Input number').fill('81222333444');
    await this.page.getByRole('button', { name: 'SHOW COUNT' }).click();
    await this.page.waitForTimeout(3000);
    const checkElement = await this.page.getByText('Estimated Recipient : 1');
    if (await checkElement.isVisible()) {
      await expect(this.page.getByText('Estimated Recipient : 1')).toBeVisible();
    } else {
      await expect(this.page.getByText('Estimated Recipient : 2')).toBeVisible();
    }
  }

  async campaignName(name) {
    const checkElement = await this.page.getByPlaceholder('Insert campaign name E.g:"');
    const checkElement1 = await this.page.locator('input[name="campaign-campaign name"]');
    await this.page.waitForLoadState('networkidle')
    if (await checkElement.isVisible()) {
      await this.page.getByPlaceholder('Insert campaign name E.g:"').fill(name);
    } else if (await checkElement1.isVisible()) {
      await this.page.locator('input[name="campaign-campaign name"]').fill(name);
    }
  }

  async uploadImage(index, path) {
    if (index == 1) {
      await this.page.locator('input[type="file"]').first().setInputFiles(path);
    } else if (index == 2) {
      await this.page.locator('input[type="file"]').nth(1).setInputFiles(path);
    }
    await expect(this.page.getByText('Image uploaded successfully.')).toBeVisible();
  }

  async campaignTitle(title) {
    await this.page.getByPlaceholder('Insert your campaign title').fill(title);
  }

  async campaignDescription(text) {
    const checkElement = await this.page.frameLocator('iframe[title="Rich Text Editor\\, editor1"]').locator('html');
    await this.page.waitForLoadState('networkidle')
    if (await checkElement.isVisible()) {
      await this.page.getByLabel('Source').click();
      await this.page.getByRole('textbox', { name: 'Rich Text Editor, editor1' }).fill(text);
      await this.page.getByRole('button', { name: 'Embed' }).click();
    } else {
      await this.page.locator('textarea[name="campaign-campaign description"]').fill(text);
    }
  }

  async timeCampaign(time) {
    if (time == 'now') {
      await this.page.getByRole('radio', { name: 'Now' }).click();
      await this
      const check = this.page.getByPlaceholder('End Date');
      if (await check.isVisible()) {
        await this.page.getByPlaceholder('End Date').click();
        await this.page.waitForTimeout(3000);
        const checkElement = await this.page.locator('td[class="available today current"]').first();
        if (await checkElement.isVisible()) {
          await this.page.locator('td[class="available today current"]').first().click();
        } else {
          await this.page.locator('td[class="available today"]').first().click();
        }
        await this.page.getByPlaceholder('Time select').click();
        await this.page.getByText(':59').click();
      }
    } else if (time == 'later') {
      await this.page.getByRole('radio', { name: 'Later' }).click();
      await this.page.getByPlaceholder('Start Date', { exact: true }).click();

      await this.page.waitForTimeout(3000);
      const checkElement = await this.page.locator('td[class="available today current"]').first();
      if (await checkElement.isVisible()) {
        await this.page.locator('td[class="available today current"]').first().click();
      } else {
        await this.page.locator('td[class="available today"]').first().click();
      }
      await this.page.locator('input[name="start later time"]').click();
      await this.page.waitForTimeout(2000);
      const checkClock1 = await this.page.getByText('21:00');
      const checkClock2 = await this.page.getByText('21:00').nth(1);
      const checkClock3 = await this.page.getByText('21:').nth(2);
      if (await checkClock3.isVisible()) {
        await this.page.getByText('21:').nth(2).click();
      } else if (await checkClock2.isVisible()) {
        await this.page.getByText('21:00').nth(1).click();
      } else {
        await this.page.getByText('21:00').click();
      }
      await this.page.waitForTimeout(1000);
      const checkEndDate = await this.page.getByPlaceholder('End Date');
      if (await checkEndDate.isVisible()) {
        await this.page.getByPlaceholder('End Date').click();
        await this.page.waitForTimeout(3000);
        const checkElement2 = await this.page.locator('td[class="available today current"]').nth(1);
        if (await checkElement2.isVisible()) {
          await this.page.locator('td[class="available today current"]').nth(1).click();
        } else {
          await this.page.locator('td[class="available today"]').first().click();
        }
        await this.page.getByPlaceholder('Time select').nth(1).click();
        await this.page.getByText(':59').nth(1).click();
      }
    }
  }
  async submitCampaign(edit) {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(3000);
    const checkElement = await this.page.getByRole('radio', { name: 'Only for Existing Members' });
    if (edit !== true && await checkElement.isVisible()) {
      await this.page.getByRole('radio', { name: 'Only for Existing Members' }).click();
    }
    await this.page.getByRole('button', { name: 'CONTINUE' }).click();
    await this.page.getByRole('button', { name: 'SEND NOW' }).click();
    await expect(this.page.locator('div[class="alert open alert-with-icon top right alert-danger"]')).not.toBeVisible();
    await expect(this.page.locator('p').filter({ hasText: 'Campaign History' })).toBeVisible();
  }

  async saveAsDraft(edit) {
    const checkElement = await this.page.getByRole('radio', { name: 'Only for Existing Members' });
    if (edit !== true && await checkElement.isVisible()) {
      await this.page.getByRole('radio', { name: 'Only for Existing Members' }).click();
    }
    await this.page.getByRole('button', { name: 'SAVE AS DRAFT' }).click();
    await this.page.getByRole('button', { name: 'YES, SAVE AS DRAFT' }).click();
    await expect(this.page.locator('div[class="alert open alert-with-icon top right alert-danger"]')).not.toBeVisible();
    await expect(this.page.locator('p').filter({ hasText: 'Campaign History' })).toBeVisible();
  }

  async filterCampaign(campaign, status, search) {
    await this.page.getByRole('textbox', { name: 'All Campaign' }).click();
    await this.page.locator('li').filter({ hasText: campaign }).nth(1).click();
    await this.page.getByRole('textbox', { name: 'All Status' }).click();
    await this.page.locator('li').filter({ hasText: status }).nth(1).click();
    await this.page.getByRole('searchbox', { name: 'Search campaign' }).fill(search);
    await this.page.getByRole('button', { name: 'Filter', exact: true }).click();
    await this.page.waitForTimeout(12000);
  }

  async selectRewards(program, wallet) {
    await this.page.getByRole('radio', { name: 'Balance / Point' }).click();
    await this.page.getByPlaceholder('Select Program').click();
    await this.page.getByText(program).click();
    await this.page.getByPlaceholder('Select Wallet').click();
    await this.page.getByText(wallet, { exact: true }).click();
    await this.page.getByPlaceholder('Input Amount, E.g:"100.000"').fill('100');
  }

  async turnOff() {
    await this.page.locator('td:nth-child(12)').first().click();
    await this.page.getByRole('button', { name: 'TURN OFF' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'TURN OFF' }).click();
    await expect(this.page.locator('div[class="alert open alert-with-icon top right alert-danger"]')).not.toBeVisible();
    await expect(this.page.locator('p').filter({ hasText: 'Campaign History' })).toBeVisible();
  }

  async duplicate() {
    await this.page.getByRole('cell', { name: 'ic-threedot' }).first().click();
    await this.page.getByRole('button', { name: 'DUPLICATE' }).click();
  }

  async delete() {
    await this.page.locator('td:nth-child(12)').first().click();
    await this.page.getByRole('button', { name: 'DELETE' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'DELETE' }).click();
    await expect(this.page.locator('div[class="alert open alert-with-icon top right alert-danger"]')).not.toBeVisible();
    await expect(this.page.locator('p').filter({ hasText: 'Campaign History' })).toBeVisible();
  }

  async edit() {
    await this.page.getByRole('cell', { name: 'ic-threedot' }).first().click();
    await this.page.getByRole('button', { name: 'EDIT' }).click();
  }

  async waTemplate() {
    await this.page.getByPlaceholder('Select Template').click();
    await this.page.locator('span').filter({ hasText: /^Test CTA Template$/ }).click();
  }


}