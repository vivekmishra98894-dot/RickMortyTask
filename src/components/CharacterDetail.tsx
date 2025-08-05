
import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '../api/rickAndMortyApi';

const CharacterDetail = () => {
  const { id } = useParams({ from: '/character/$id' });
  const { data, isLoading } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Character not found</p>;

  return (
    <div>
      <h2>{data.name}</h2>
      <img src={data.image} alt={data.name} />
      <p><strong>Status:</strong> {data.status}</p>
      <p><strong>Species:</strong> {data.species}</p>
      <p><strong>Gender:</strong> {data.gender}</p>
    </div>
  );
};

export default CharacterDetail;
