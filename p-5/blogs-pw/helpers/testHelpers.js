const { expect } = require('@playwright/test');

const TestUserEntry = {
  username: 'bamesjond@mail.com',
  name: 'bames',
  password: '123456'
};

const BackendUrl = 'http://localhost:3003';
const FrontendUrl = 'http://localhost:5173';

const resetDatabase = async (request) => {
    await request.post(`${BackendUrl}/api/testing/reset`);

    await createUser(request, TestUserEntry);
};

const createUser = async (request, user) => {
    if (!user) {
      return;
    }

    await request.post(`${BackendUrl}/api/users`, {
        data: {
          username: user.username,
          name: user.name,
          password: user.password
        }
    });
};

const logIn = async (page, user) => {
    const loginBtnLocator = page.getByText('Login');
    const formLocator = loginBtnLocator.locator('..');

    await expect(loginBtnLocator).toBeVisible();

    await formLocator.getByPlaceholder('Username').fill(user.username);
    await formLocator.getByPlaceholder('Password').fill(user.password);

    await loginBtnLocator.click();

    return loginBtnLocator;
};

const logOut = async (page) => {
    const loginBtnLocator = page.getByText('Logout');
    await loginBtnLocator.click();

    return loginBtnLocator;
};

const createBlog = async (page, title, author = 'Test author') => {
    if (!title) {
      return;
    }

    const newBlogBtnLocator = page.getByText('Add blog...', { exact: true });
    await expect(newBlogBtnLocator).toBeVisible();
    await newBlogBtnLocator.click();

    const blogTitle = title;
    const blogAuthor = !author ? 'Test author' : author;
    await page.getByPlaceholder('Title').fill(blogTitle);
    await page.getByPlaceholder('Author').fill(blogAuthor);
    await page.getByPlaceholder('Url').fill(`http://${title}.com`);
    const addBlogBtnLocator = page.getByText('Add Blog', { exact: true });
    await expect(addBlogBtnLocator).toBeVisible();

    await addBlogBtnLocator.click();
};

const likeBlog = async (page, title, hideDetails = false) => {
    const blogItemLocator = page
      .getByText(title)
      .locator('..')
      .locator('..');
    const blogDetailsBtnLocator = page
      .getByText(title)
      .locator('..')
      .locator('.blog-item-buttons')
      .getByText('Show details');

    await expect(blogDetailsBtnLocator).toBeVisible();
    await blogDetailsBtnLocator.click();

    await blogItemLocator
      .locator('.blog-item-ext')
      .locator('button', { hasText: 'Like' })
      .click();

      if (hideDetails === true) {
        const hideDetailsBtnLocator = page
          .getByText(title)
          .locator('..')
          .locator('.blog-item-buttons')
          .getByText('Hide details');
        await hideDetailsBtnLocator.click();
      }

    return blogItemLocator;
};

module.exports = { resetDatabase, logIn, logOut, createUser, createBlog, likeBlog, TestUserEntry, BackendUrl, FrontendUrl };