// Import dependencies
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Outdoor from '..';

// After each test, make sure there isnt any leftover memory that could give you false results
afterEach(cleanup);

// Declare the components you are testing
describe('Outdoor component', () => {
  // verify the component is rendering properly
  it('Outdoor component renders', () => {
    render(<Outdoor />);
  });

  // compare snapshot versions of the DOM node structure
  it('matches snapshot DOM node structure', () => {
    const { asFragment } = render(<Outdoor />);
    expect(asFragment()).toMatchSnapshot();
  });
});