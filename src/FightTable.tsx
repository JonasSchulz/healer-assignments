import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, TextField} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

enum Spec {
    'Restoration Shaman',
    'Discipline Priest',
    'Holy Priest',
    'Mistweaver Monk',
    'Holy Paladin',
    'Restoration Druid',
}

type Player = {
    name: string
    spec: Spec
}

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

export const FightTable = () => {
    const classes = useStyles();

    const [players, setPlayers] = useState<Player[]>([])
    const [abilities, setAbilities] = useState<Ability[]>([])
    // const [assignments, setAssignments] = useState<Assignment[]>([])
    const [newAbility, setNewAbility] = useState<Ability>(defaultAbility)

    const addPlayer = () => setPlayers([...players, {name: 'someone', spec: Spec['Discipline Priest']}]);
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
            <Button onClick={addPlayer}>Add player</Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ability</TableCell>
                            <TableCell align="right">Timer</TableCell>
                            {players.map(({name, spec}) => (
                                <>
                                    <TableCell align="right">{name}</TableCell>
                                    <TableCell align="right">{spec}</TableCell>
                                </>)
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {abilities.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.timer}</TableCell>
                                {players.map(player => (
                                    <TableCell align="right" colSpan={2}>{getAssignment(player)}</TableCell>
                                ))}
                                <TableCell>
                                    <DeleteButton onDelete={() => removeAbility(index)}/>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell align="right"><TextField value={newAbility?.name} onChange={event => setNewAbility({...newAbility, name: event.target.value})} label="Name" /></TableCell>
                            <TableCell align="right"><TextField value={newAbility?.timer} onChange={event => setNewAbility({...newAbility, timer: event.target.value})} label="Timer" /></TableCell>
                            <Button onClick={addAbility}>Add ability</Button>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}