import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { listStore } from '../../stores/ListStore';
import SortSelect from './SortSelect';
import '@testing-library/jest-dom';

jest.mock('../../stores/ListStore', () => ({
  listStore: {
    sortOption: 'stars',
    setSortOption: jest.fn(),
  },
}));

describe('SortSelect компонент', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('Рендер правильного текущего варианта сортировки', () => {
    render(<SortSelect />);
    
    expect(screen.getByText('По звездам')).toBeInTheDocument();
  });

  it('Вызывает setSortOption при изменении значения', () => {
    render(<SortSelect />);

    fireEvent.mouseDown(screen.getByRole('combobox'));
    
    fireEvent.click(screen.getByText('По форкам'));
    
    expect(listStore.setSortOption).toHaveBeenCalledTimes(1);
    expect(listStore.setSortOption).toHaveBeenCalledWith('forks'); 
  });
});
