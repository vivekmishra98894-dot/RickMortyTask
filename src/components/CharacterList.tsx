import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../api/rickAndMortyApi';
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import { useNavigate } from '@tanstack/react-router';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
}

interface CharacterListProps {
  page: number;
  onPageChange: (newPage: number) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ page, onPageChange }) => {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['characters', page],
    queryFn: () => fetchCharacters(page),
    keepPreviousData: true,
  });

  const columns: ColumnDef<Character>[] = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Status', accessorKey: 'status' },
    { header: 'Species', accessorKey: 'species' },
    { header: 'Gender', accessorKey: 'gender' },
  ];

  const table = useReactTable({
    data: data?.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading characters.</p>;

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() =>
                navigate({ to: '/character/$id', params: { id: row.original.id.toString() } })
              }
              style={{ cursor: 'pointer' }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => onPageChange(page - 1)} disabled={!data.info.prev}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>Page {page}</span>
        <button onClick={() => onPageChange(page + 1)} disabled={!data.info.next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
