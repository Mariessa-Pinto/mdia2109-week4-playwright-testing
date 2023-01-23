import { test, expect } from '@playwright/test'
import exp from 'constants'

var homePage = 'http://localhost:3000'
var aboutPage = 'http://localhost:3000/about'

test('should navigate to the about page and check the headings', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto(homePage)
  // Find an element with the text 'About Page' and click on it
  await page.click('text=About Page')
  // The new url should be "/about" (baseURL is used there)
  await expect(page).toHaveURL(aboutPage)

  // The new page should contain an h1 with "About Page"
  await expect(page.locator('h1')).toContainText('About Page')

  await page.click('text=Go Back')
  // The new url should be "/about" (baseURL is used there)
  await expect(page).toHaveURL(homePage)
})

test('should navigate to the about page and check the buttons', async ({ page }) => { 
  await page.goto(aboutPage)

  // about page should contain a button
  const submitButton = page.locator('button[type="submit"]');
  await expect(submitButton).toBeDisabled();
})

test('should navigate to the home page from the about page', async ({ page }) => { 
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto(aboutPage)

  await page.click('text=Go Back')
  // The new url should be "/about" (baseURL is used there)
  await expect(page).toHaveURL(homePage)
})


test.describe('Square area', () => {
  test('Example box', async({ page }) => { 
      await page.goto(aboutPage)

      const boxItem = page.locator('#boxArea');

      const grabbedHeight = await boxItem.evaluate((ele) => {
          return window.getComputedStyle(ele).getPropertyValue("height")
      })
      console.log(grabbedHeight);
      expect(grabbedHeight).toBe("200px");

      const grabbedWidth = await boxItem.evaluate((ele) => {
        return window.getComputedStyle(ele).getPropertyValue("width")
      })
      console.log(grabbedWidth);
      expect(grabbedHeight).toBe("200px");

      const grabbedBackgroundColor = await boxItem.evaluate((ele) => {
        return window.getComputedStyle(ele).getPropertyValue("background-color")
      })
      console.log(grabbedBackgroundColor);
      expect(grabbedBackgroundColor).toBe("rgba(32, 128, 113, 0.8)");
  })
})