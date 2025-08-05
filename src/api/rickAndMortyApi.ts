
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export const fetchCharacters = async (page = 1) => {
  const res = await api.get(`/character?page=${page}`);
  return res.data;
};

export const fetchCharacterById = async (id: string) => {
  const res = await api.get(`/character/${id}`);
  return res.data;
};
