import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Column, useTable } from 'react-table';
import Swal from "sweetalert2";

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
}

const RickAndMortyCharacters = () => {
    const [data, setData] = useState<Character[]>([]);
    const [info, setInfo] = useState<Character[]>([]);
    const [pageNumber, setPageNumber] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Character[]>(`https://rickandmortyapi.com/api/character/?page=${pageNumber + 1}`);
                if (response.data.length === 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No data found.'
                    });
                } else {
                    setData(response.data.results);
                    setInfo(response.data.info);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [pageNumber]);

    const columns: Column<Character>[] = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Species',
                accessor: 'species',
            },
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Gender',
                accessor: 'gender',
            },
        ],
        []
    );

    const canNextPage = pageNumber < info.pages;
    const canPreviousPage = pageNumber > 1;
    const nextPage = () => setPageNumber(pageNumber + 1);
    const previousPage = () => setPageNumber(pageNumber - 1);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<Character>({ columns, data });

    return (
        <div>
            <h1>Rick and Morty Characters</h1>
            <div className="container">
                <table {...getTableProps()} className="highlight">
                    <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}
                                    style={{textAlign: 'left'}}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}
                                               style={{textAlign: 'left'}}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <div style={{marginTop: '15px'}}>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        Previous Page
                    </button>
                    {' '}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        Next Page
                    </button>
                    {' '}
                </div>
            </div>
        </div>
    );
};

export default RickAndMortyCharacters;
