import React from 'react';
import {CharacterData} from './RickAndMortyCharacters'; // Import the CharacterData type

interface ModalProps {
    character: CharacterData | null,
    isOpen: boolean,
    onClose?: () => void
}

const Modal: React.FC<ModalProps> = ({ character, isOpen, onClose }) => {
    if (!character || !isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-black p-8 max-w-md mx-auto rounded-md shadow-md">
                    <h2 className="text-lg font-bold mb-4">{character.name}</h2>
                    <img src={character.image} alt={character.name} className="w-full h-auto mb-4" />
                    <p>Status: {character.status}</p>
                    <p>Species: {character.species}</p>
                    <p>Type: {character.type}</p>
                    <p>Gender: {character.gender}</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
