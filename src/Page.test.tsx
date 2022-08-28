import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Page } from './Page';
afterEach(cleanup);
test('When the Page component is rendered, it should contain the correct title and content', () => {
  const { queryByText } = render(
    <Page title="Title test">
      <span>Test content</span>
    </Page>,
  );
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const title = queryByText('Title test');
  expect(title).not.toBeNull();

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const content = queryByText('Test content');
  expect(content).not.toBeNull();
});
