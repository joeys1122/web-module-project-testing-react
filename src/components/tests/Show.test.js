import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

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

test('renders without errors', ()=>{
  render(<Show show={mockShow} selectedSeason={'none'}/>);
});

test('renders Loading component when prop show is null', () => {
  render(<Show show={null}/>);

  const loading = screen.getByTestId('loading-container');
  
  expect(loading).toBeInTheDocument();
});


test('renders same number of options seasons are passed in', ()=>{
  render(<Show show={mockShow} selectedSeason={'none'}/>);

  const options = screen.getAllByTestId('season-option');

  expect(options.length).toEqual(mockShow.seasons.length);
});

test('handleSelect is called when an season is selected', () => {
  const mockHandleSelect = jest.fn();

  render(<Show show={mockShow} selectedSeason={'none'} handleSelect={mockHandleSelect}/>);

  const selectBox = screen.getByRole('combobox');
  userEvent.selectOptions(selectBox, ['0']);

  expect(mockHandleSelect).toHaveBeenCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
  const { rerender } = render(<Show show={mockShow} selectedSeason={'none'}/>);

  let episodes = screen.queryByTestId('episodes-container');

  expect(episodes).not.toBeInTheDocument();

  rerender(<Show show={mockShow} selectedSeason={'0'}/>);

  episodes = screen.getByTestId('episodes-container');

  expect(episodes).toBeInTheDocument();
});
