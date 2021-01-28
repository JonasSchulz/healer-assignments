import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, TextField} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Player } from './Components/PlayerSelection';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

type Ability = {
    name: string
    timer: string
}

// type Assignment = {}

type DeleteButtonProps = {
    onDelete: any
}
const DeleteButton = ({onDelete}: DeleteButtonProps) => {
    return (
        <Button onClick={onDelete}>
            <DeleteIcon></DeleteIcon>
        </Button>
    );
};

const defaultAbility = {name: '', timer: ''}


type FightTableProps = {
    players: Player[]
}
export const FightTable = (props: FightTableProps) => {
    const {players} = props
    const classes = useStyles();

    const [abilities, setAbilities] = useState<Ability[]>([])
    // const [assignments, setAssignments] = useState<Assignment[]>([])
    const [newAbility, setNewAbility] = useState<Ability>(defaultAbility)

    const addAbility = () => {
        setAbilities([...abilities, newAbility])
        setNewAbility(defaultAbility)
    }
    
    const removeAbility = (index: number) => setAbilities(abilities.filter((_, i) => index !== i))
    

    const getAssignment = (_: Player) => {
        return 'just heal 4 head'
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ability</TableCell>
                            <TableCell>Timer</TableCell>
                            {players.map(({name, spec}) => (
                                <>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{spec}</TableCell>
                                </>)
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {abilities.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.timer}</TableCell>
                                {players.map(player => (
                                    <TableCell colSpan={2}>{getAssignment(player)}</TableCell>
                                ))}
                                <TableCell>
                                    <DeleteButton onDelete={() => removeAbility(index)}/>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell><TextField value={newAbility?.name} onChange={event => setNewAbility({...newAbility, name: event.target.value})} label="Name" /></TableCell>
                            <TableCell><TextField value={newAbility?.timer} onChange={event => setNewAbility({...newAbility, timer: event.target.value})} label="Timer" /></TableCell>
                            <TableCell><Button onClick={addAbility}><AddIcon/></Button></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}