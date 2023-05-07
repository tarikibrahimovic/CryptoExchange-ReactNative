import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);


  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={{marginTop: 30}}
    />
  );
};

export default MyComponent;
