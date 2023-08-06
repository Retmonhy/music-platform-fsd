import { Box, debounce } from '@material-ui/core';
import React, { FC } from 'react';

import { CustomInput, Loader } from '@shared/components';

interface ISearchInputProps {
  searchHandler: (query: string) => void;
  isSearching: boolean;
  label: string;
}

export const SearchInput: FC<ISearchInputProps> = ({ searchHandler, isSearching, label }) => {
  const searchInputHandler = debounce((event) => {
    searchHandler(event.target.value);
  }, 500);

  return (
    <Box>
      <CustomInput size='small' type='search' onChange={searchInputHandler} label={label} />
      <Box> {isSearching ? <Loader /> : null}</Box>
    </Box>
  );
};
