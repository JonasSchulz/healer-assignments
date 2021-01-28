import React, { useState } from "react";
import { Player, PlayerSelection } from "./Components/PlayerSelection";
import { FightTable } from './FightTable'

const App = () => {
  const [players, setPlayers] = useState<Player[]>([])

  return (
    <div>
      <header>
        <PlayerSelection players={players} onPlayersChange={(updatedPlayers) => setPlayers(updatedPlayers)}></PlayerSelection>
        <FightTable players={players}></FightTable>
      </header>
    </div>
  );
}

export default App;
