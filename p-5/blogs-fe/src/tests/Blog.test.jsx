import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import { expect, test, vi } from 'vitest';

test('blog has title and author by default', async () => {
  const mock = vi.fn();

  const blogItem = {
    title: "Test Title",
    author: "Test Author",
    url: 'http://testblog.com',
    likes: 5,
  };

  render(<Blog blog={blogItem} handleLike={mock} handleDelete={mock} />);

  const element1 = screen.getByText(blogItem.title);
  const element2 = screen.getByText(blogItem.author);

  expect(element1).toBeDefined();
  expect(element2).toBeDefined();
});

test('blog does not have url by default', async () => {
  const mock = vi.fn();

  const blogItem = {
    title: "Test Title",
    author: "Test Author",
    url: 'http://testblog.com',
    likes: 5,
  };

  render(<Blog blog={blogItem} handleLike={mock} handleDelete={mock} />);

  const element = screen.queryByText(blogItem.url);

  expect(element).not.toBeInTheDocument();
});

test('blog has url when expanded', async () => {
  const mock = vi.fn();

  const blogItem = {
    title: "Test Title",
    author: "Test Author",
    url: 'http://testblog.com',
    likes: 5,
  };

  render(<Blog blog={blogItem} handleLike={mock} handleDelete={mock} />);
  const actor = userEvent.setup();

  const element = screen.getByText('Show details');
  await actor.click(element);

  expect(element).toBeDefined();
  expect(screen.getByText('Likes: 5')).toBeDefined();
});

test('like button is used twice', async () => {
  const mock = vi.fn();

  const blogItem = {
    title: "Test Title",
    author: "Test Author",
    url: 'http://testblog.com',
    likes: 5,
  };

  render(<Blog blog={blogItem} handleLike={mock} handleDelete={mock} />);
  const actor = userEvent.setup();

  const expandBtn = screen.getByText('Show details');
  await actor.click(expandBtn);

  const likeBtn = screen.getByText('Like');
  await actor.click(likeBtn);
  await actor.click(likeBtn);
  
  expect(likeBtn).toBeDefined();
  expect(mock.mock.calls).toHaveLength(2);
});

test('blog form triggers passed event handlers', async () => {
  const mock = vi.fn();

  render(<BlogForm handleAddBlog={mock} />);
  const actor = userEvent.setup();

  const submitBlog = screen.getByText('Add Blog');
  await actor.click(submitBlog);
  
  expect(submitBlog).toBeDefined();
  expect(mock.mock.calls).toHaveLength(1);
});