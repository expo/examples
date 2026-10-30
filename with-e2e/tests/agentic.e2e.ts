import { expect, test } from 'e2e';

// Agent steps call the model in e2e.config.ts. Without a key these tests are skipped.
const skip = process.env.AI_GATEWAY_API_KEY ? false : 'set AI_GATEWAY_API_KEY to run agent tests';

test('the agent gets a greeting', { skip }, async ({ app, agent, screen }) => {
  await app.open();

  // The agent works out which field and button to use.
  await agent.act('get the app to greet {name}', { params: { name: 'Grace' } });

  // Pair each agent step with a check that does not depend on the model.
  await expect(screen.getByTestId('greeting')).toHaveText('Hello, Grace!');
  await agent.assert('the app greets Grace by name');
});

test('the agent finds the empty-name error', { skip }, async ({ app, agent, screen }) => {
  await app.open();

  await agent.act('press Greet without typing a name');

  await expect(screen.getByTestId('error')).toHaveText('Enter a name first.');
  await agent.assert('the app asks for a name');
});
