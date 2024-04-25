import React from 'react';
import {CharacterData} from './RickAndMortyCharacters'; // Import the CharacterData type
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    image: {
        width: '100%',
        height: 'auto',
        marginBottom: theme.spacing(2),
    },
}));

interface ModalProps {
    character: CharacterData | null,
    isOpen: boolean,
    onClose?: () => void
}

const Modal: React.FC<ModalProps> = ({character, isOpen, onClose}) => {
    const classes = useStyles();

    if (!character) return null;

    return (
        <Dialog open={isOpen} onClose={() => {
        }}>
            <DialogTitle>{character.name}</DialogTitle>
            <DialogContent>
                <img src={character.image} alt={character.name} className={classes.image}/>
                <DialogContentText>
                    Status: {character.status}<br/>
                    Species: {character.species}<br/>
                    Type: {character.type}<br/>
                    Gender: {character.gender}<br/>
                    {/* Add more details as needed */}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
