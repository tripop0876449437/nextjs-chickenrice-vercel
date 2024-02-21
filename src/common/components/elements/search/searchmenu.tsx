// components/SearchBar.js

import { SetStateAction, useState } from 'react';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <input
        className='border border-red-500'
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      <button type="submit"></button>
      
    </form>
  );
};

export default SearchBar;
