import { expect, test } from 'e2e';

test('shows the greeting form', async ({ app, screen }) => {
  await app.open();

  await expect(screen.getByText('Say hello')).toBeVisible();
  await expect(screen.getByTestId('name')).toBeVisible();
});

test('asks for a name when the field is empty', async ({ app, screen }) => {
  await app.open();

  await screen.getByTestId('greet').tap();

  await expect(screen.getByTestId('error')).toHaveText('Enter a name first.');
});

test('greets the name you type', async ({ app, screen }) => {
  await app.open();

  await screen.getByTestId('name').fill('Ada');
  await screen.getByTestId('greet').tap();

  await expect(screen.getByTestId('greeting')).toHaveText('Hello, Ada!');
});
