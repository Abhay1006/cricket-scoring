interface PlayerSelectorProps {
    label: string;
    players: string[];
    selectedPlayer: string;
    onSelect: (player: string) => void;
  }
  
  export default function PlayerSelector({
    label,
    players,
    selectedPlayer,
    onSelect,
  }: PlayerSelectorProps) {
    return (
      <div className="mb-4">
        <label className="block text-gray-700">{label}</label>
        <select
          value={selectedPlayer}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full px-2 py-1 border rounded"
        >
          {players.map((player) => (
            <option key={player} value={player}>
              {player}
            </option>
          ))}
        </select>
      </div>
    );
  }
  