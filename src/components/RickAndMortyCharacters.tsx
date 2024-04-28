import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Column, useTable } from 'react-table';
import Swal from "sweetalert2";
import Modal from './Modal'; // Import the Modal component

interface Info {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export interface CharacterData {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

interface CharacterApiResponse {
    info: Info;
    results: CharacterData[];
}

const apiUrl = import.meta.env.VITE_BACKEND_URL;
// console.log('API URL:', apiUrl);

const RickAndMortyCharacters = () => {
    const [data, setData] = useState<CharacterData[]>([]);
    const [info, setInfo] = useState<Info>({count: 0, pages: 0, next: null, prev: null});
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedCharacter, setSelectedCharacter] = useState<CharacterData | null>(null); // Track the selected character for editing
    const [isModalOpen, setIsModalOpen] = useState(false); // Track the modal state



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<CharacterApiResponse>(`${apiUrl}${pageNumber}`);
                if (response.data.results.length === 0) {
                    await Swal.fire({
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

    const columns: Column<CharacterData>[] = React.useMemo(
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
            // Action column
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <div>
                        <button onClick={() => handleInfo(row.original)}>Info</button>
                        {/*<button onClick={() => handleDelete(row.original)}>Delete</button>*/}
                    </div>
                ),
            },
        ],
        []
    );

    const canNextPage = pageNumber < info.pages;
    const canPreviousPage = pageNumber > 1;
    const nextPage = () => setPageNumber(pageNumber + 1);
    const previousPage = () => setPageNumber(pageNumber - 1);

    const handleInfo = (character: CharacterData) => {
        setSelectedCharacter(character); // Set the selected character
        setIsModalOpen(true); // Open the modal
    };

   /* const handleDelete = (character: CharacterData) => {
        // Handle delete action
        console.log('Delete:', character);
    };*/

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<CharacterData>({ columns, data });

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
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} character={selectedCharacter} /> {/* Render the modal component */}
            </div>
        </div>
    );
};

export default RickAndMortyCharacters;
