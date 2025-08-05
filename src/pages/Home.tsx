import React from 'react';
import { useSearch, useNavigate } from '@tanstack/react-router';
import CharacterList from '../components/CharacterList';

const Home: React.FC = () => {
  const { page = 1 } = useSearch({ from: '/' });
  const navigate = useNavigate({ from: '/' });

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: newPage,
      }),
    });
  };

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <CharacterList page={page} onPageChange={handlePageChange} />
    </div>
  );
};

export default Home;
