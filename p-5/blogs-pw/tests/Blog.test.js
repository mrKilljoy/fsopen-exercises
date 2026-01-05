const { test, expect, beforeEach, afterAll, describe } = require('@playwright/test');
const { after, before } = require('node:test');
const { resetDatabase, logIn, createBlog, createUser, likeBlog, TestUserEntry, FrontendUrl, logOut } = require('../helpers/testHelpers');

describe('Blog app', () => {
  describe('Login', () => {
    beforeEach(async ({ page, request }) => {
      await resetDatabase(request);

      page.context().clearCookies();
      await page.goto(FrontendUrl);
    });

    test('login form is shown', async ({ page }) => {
      const btnLocator = page.getByText('Login');
      const formLocator = btnLocator.locator('..');

      await expect(formLocator).toHaveClass('login-form');
      await expect(formLocator).toBeVisible();
    });

    test('succeeds with correct credentials', async ({ page }) => {
      const loginBtnLocator = await logIn(page, TestUserEntry);

      const logoutBtnLocator = page.getByText('Logout', { exact: true });
      await expect(logoutBtnLocator).toBeVisible();
      await expect(loginBtnLocator).not.toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      const loginBtnLocator = await logIn(page, TestUserEntry);

      await expect(loginBtnLocator).toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      await resetDatabase(request);

      await page.goto(FrontendUrl);
    });

    test('a new blog can be created', async ({ page }) => {
      await logIn(page, TestUserEntry);

      const blogTitle = 'Test blog #1';
      const blogAuthor = 'Test author';

      await createBlog(page, blogTitle);

      expect(page.getByText(blogTitle)).toBeDefined();
      await expect(page.getByText(blogAuthor)).toBeVisible();
    });

    test('a blog can be liked', async ({ page }) => {
      await logIn(page, TestUserEntry);

      const blogTitle = 'Test blog #1';
      await createBlog(page, blogTitle);

      const blogItemLocator = await likeBlog(page, blogTitle);

      const likesLocator = blogItemLocator.locator('.blog-item-ext').getByText('Likes: 1');
      await expect(likesLocator).toBeVisible();
    });

    test('a blog can be deleted', async ({ page, request }) => {
      page.on('dialog', async d => await d.accept()); // accepts all dialogs
      await logIn(page, TestUserEntry);

      const firstBlogTitle = 'Test blog #1';
      const secondBlogTitle = 'Test blog #2';

      await createBlog(page, firstBlogTitle);
      await createBlog(page, secondBlogTitle);

      const blogDeleteBtnLocator = page
        .getByText(firstBlogTitle)
        .last()
        .locator('..')
        .locator('.blog-item-buttons')
        .getByText('Delete');
      await expect(blogDeleteBtnLocator).toBeVisible();

      await blogDeleteBtnLocator.click();

      await logOut(page);

      const secondUser = {
        username: 'bobthebuilder@mail.com',
        name: 'bobbinator',
        password: '789081'
      };
      await createUser(request, secondUser);
      await logIn(page, secondUser);

      const secondBlogDeleteBtnLocator = page
        .getByText(secondBlogTitle)
        .last()
        .locator('..')
        .locator('.blog-item-buttons')
        .getByText('Delete');
      await expect(secondBlogDeleteBtnLocator).toBeVisible();
      await secondBlogDeleteBtnLocator.click();

      await expect(secondBlogDeleteBtnLocator).toBeVisible();
    });

    test('blogs are ordered by number of likes', async ({ page, request }) => {
      await logIn(page, TestUserEntry);

      const firstBlogTitle = 'Test blog #1';
      const secondBlogTitle = 'Test blog #2';
      const thirdBlogTitle = 'Test blog #3';

      await createBlog(page, firstBlogTitle);
      await createBlog(page, secondBlogTitle);
      await createBlog(page, thirdBlogTitle);

      const firstBlogLikes = 1;
      const secondBlogLikes = 5;
      const thirdBlogLikes = 3;
      const expectedOrder = [firstBlogLikes, thirdBlogLikes, secondBlogLikes];

      for (let i = 0; i < secondBlogLikes; i++) {
        await likeBlog(page, secondBlogTitle, true);
      }

      for (let i = 0; i < thirdBlogLikes; i++) {
        await likeBlog(page, thirdBlogTitle, true);
      }
       
      for (let i = 0; i < firstBlogLikes; i++) {
        await likeBlog(page, firstBlogTitle, true);
      }

      await page.reload();
      await page.locator('.blog-item').first().waitFor(); // Wait for fresh blog items to be rendered

      const likes = [];
      const blogItemsCount = await page.locator('.blog-item').count();
      for (let i = 0; i < blogItemsCount; i++) {
        const blogItemLocator = page.locator('.blog-item').nth(i);
        await blogItemLocator.waitFor();
        const detailsBtn = blogItemLocator
          .locator('.blog-item-buttons')
          .getByText('Show details');
        await detailsBtn.waitFor();

        await expect(detailsBtn).toBeVisible();
        await detailsBtn.click();

        const likesLocator = blogItemLocator
          .locator('.blog-item-likes')
          .locator('span')
          .first();
        await likesLocator.waitFor();

        const rawLikesText = await likesLocator.textContent();
        const likesNumber = parseInt(rawLikesText.replace('Likes: ', ''));
        likes[i] = likesNumber;
      };

      expect(likes).toEqual(expectedOrder);
    });

    test('clear everything', async ({ page, request }) => {
      await resetDatabase(request);
    });
  });
});