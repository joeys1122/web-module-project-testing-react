import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';


test("renders without error", () => {
  render(<Episode episode={{}}/>);
});

test("renders the summary test passed as prop", ()=>{
  render(<Episode episode={{
    summary:'Test Summary'
  }}/>);

  const summary = screen.getByText('Test Summary');

  expect(summary).toBeInTheDocument();
  expect(summary).toBeTruthy();
  expect(summary).toHaveTextContent('Test Summary');
});

test("renders default image when image is not defined", ()=>{
  render(<Episode episode={{
    image:null
  }}/>);

  const defaultImg = screen.getByRole('img');

  expect(defaultImg.alt).toBe('https://i.ibb.co/2FsfXqM/stranger-things.png');
});
