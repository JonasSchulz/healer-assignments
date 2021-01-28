import React, { useState } from "react"
import {TextField, Select, MenuItem, Button} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

enum Spec {
    DRUID_RESTO = 'Restoration Druid',
    MONK_MW = 'Mistweaver Monk',
    PALA_HOLY = 'Holy Paladin',
    PRIEST_DISC = 'Discipline Priest',
    PRIEST_HOLY = 'Holy Priest',
    SHAMAN_RESTO = 'Restoration Shaman',
}

export type Player = {
    name: string
    spec: Spec
}

const defaultPlayer = {
    name: '', 
    spec: Spec.PALA_HOLY
}

type PlayerSelectionProps = {
    players: Player[]
    onPlayersChange: (updatedPlayers: Player[]) => void
}
export const PlayerSelection = (props: PlayerSelectionProps) => {
    const {players, onPlayersChange} = props

    const [newPlayer, setNewPlayer] = useState<Player>(defaultPlayer)

    const addPlayer = () => {
        onPlayersChange([...players, newPlayer])
        setNewPlayer(defaultPlayer)
    }
    const removePlayer = (index: number) => onPlayersChange(players.filter((_, i) => index !== i))
    
    return (
        <>
            <div>
                {players.map((player, index) => (
                    <div key={index}>
                        <span>{player.name}</span>
                        <span>{player.spec}</span>
                        <Button onClick={() => removePlayer(index)}><DeleteIcon/></Button>
                    </div>)
                )}
                <div>
                    <TextField value={newPlayer.name} onChange={event => setNewPlayer({...newPlayer, name: event.target.value})} label="Name" />
                    <Select value={newPlayer.spec} onChange={event => setNewPlayer({...newPlayer, spec: event.target.value as Spec})}>
                        <MenuItem value={Spec.DRUID_RESTO}>{Spec.DRUID_RESTO}</MenuItem>
                        <MenuItem value={Spec.MONK_MW}>{Spec.MONK_MW}</MenuItem>
                        <MenuItem value={Spec.PALA_HOLY}>{Spec.PALA_HOLY}</MenuItem>
                        <MenuItem value={Spec.PRIEST_DISC}>{Spec.PRIEST_DISC}</MenuItem>
                        <MenuItem value={Spec.PRIEST_HOLY}>{Spec.PRIEST_HOLY}</MenuItem>
                        <MenuItem value={Spec.SHAMAN_RESTO}>{Spec.SHAMAN_RESTO}</MenuItem>
                    </Select>
                    <Button onClick={addPlayer}><AddIcon/></Button>
                </div>
            </div>
        </>
    );
}