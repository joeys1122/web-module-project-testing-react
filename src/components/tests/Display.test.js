import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';

import mockFetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');

const mockShow = {
  name: 'Test Name',
  image: 'https://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg',
  summary: 'Test Summary',
  seasons: [
    {id:0, name: "Season 1", episodes: []}, 
    {id:1, name: "Season 2", episodes: []}, 
    {id:2, name: "Season 3", episodes: []}, 
    {id:3, name: "Season 4", episodes: []}
  ]
}

test('renders without errors with no props', ()=>{
  render(<Display/>);
});

test('renders Show component when the button is clicked ', async ()=>{
  mockFetchShow.mockResolvedValueOnce(mockShow);

  render(<Display/>);

  const button = screen.getByRole('button');
  userEvent.click(button);

  const show = await screen.findByTestId('show-container');

  expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async ()=>{
  mockFetchShow.mockResolvedValueOnce(mockShow);

  render(<Display/>);

  const button = screen.getByRole('button');
  userEvent.click(button);

  const options = await screen.findAllByTestId('season-option');

  expect(options.length).toEqual(mockShow.seasons.length);
});
