"use client";

import { useState, useEffect } from "react";
import "../app/admin/admin.css";    

const AdminPanel = () => {
  const batsmanOptions = [
    "Player 1", "Player 2", "Player 3", "Player 4", "Player 5", "Player 6", "Player 7", "Player 8", "Player 9", "Player 10", "Player 11"
  ];
  const bowlerOptions = [
    "Bowler 1", "Bowler 2", "Bowler 3", "Bowler 4", "Bowler 5"
  ];

  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);
  const [overs, setOvers] = useState(0);
  const [striker, setStriker] = useState(batsmanOptions[0]);
  const [nonStriker, setNonStriker] = useState(batsmanOptions[1]);
  const [bowler, setBowler] = useState(bowlerOptions[0]);

  const [batsmanStats, setBatsmanStats] = useState(() => {
    const stats = {};
    batsmanOptions.forEach((player) => {
      stats[player] = { runs: 0, balls: 0 };
    });
    return stats;
  });

  const [bowlerStats, setBowlerStats] = useState(() => {
    const stats = {};
    bowlerOptions.forEach((player) => {
      stats[player] = { wickets: 0, runs: 0 };
    });
    return stats;
  });

  const [extras, setExtras] = useState({ wide: 0, noBall: 0, bye: 0, legBye: 0 });
  const [dismissedBatsmen, setDismissedBatsmen] = useState<string[]>([]);

  const changeBowler = () => {
    const currentIndex = bowlerOptions.indexOf(bowler);
    const nextBowler = bowlerOptions[(currentIndex + 1) % bowlerOptions.length];
    setBowler(nextBowler);
  };

  const incrementBallCount = () => {
    setBalls((prev) => prev + 1);

    if (balls + 1 === 6) {
      setOvers((prev) => prev + 1);
      setBalls(0);
      changeBowler();
    }
  };

  const handleRun = (run: number) => {
    setRuns((prev) => prev + run);
    incrementBallCount();

    setBatsmanStats((prevStats) => ({
      ...prevStats,
      [striker]: {
        runs: prevStats[striker].runs + run,
        balls: prevStats[striker].balls + 1,
      },
    }));

    setBowlerStats((prevStats) => ({
      ...prevStats,
      [bowler]: {
        ...prevStats[bowler],
        runs: prevStats[bowler].runs + run,
      },
    }));

    if (run % 2 !== 0) {
      const temp = striker;
      setStriker(nonStriker);
      setNonStriker(temp);
    }
  };

  const handleWicket = () => {
    setWickets((prev) => prev + 1);
    incrementBallCount();

    setBowlerStats((prevStats) => ({
      ...prevStats,
      [bowler]: {
        wickets: prevStats[bowler].wickets + 1,
        runs: prevStats[bowler].runs + 1,
      },
    }));

    let newBatsman = prompt("Enter new batsman name:");

    while (newBatsman && (dismissedBatsmen.includes(newBatsman) || !batsmanOptions.includes(newBatsman))) {
      newBatsman = prompt("Invalid batsman. Please select a valid, not-out batsman:");
    }

    setDismissedBatsmen((prev) => [...prev, striker]);
    setStriker(newBatsman || striker);
  };

  const handleExtra = (type: string) => {
    setExtras((prev) => ({
      ...prev,
      [type]: (prev[type] || 0) + 1,
    }));
    setRuns((prev) => prev + 1);

    setBowlerStats((prevStats) => ({
      ...prevStats,
      [bowler]: {
        ...prevStats[bowler],
        runs: prevStats[bowler].runs + 1,
      },
    }));

    if (type === "wide" || type === "noBall") return;

    incrementBallCount();
  };

  return (
    <div className="admin-panel">
      <div className="dropdowns">
        <div>
          <label>Striker: </label>
          <select value={striker} onChange={(e) => setStriker(e.target.value)}>
            {batsmanOptions
              .filter((player) => !dismissedBatsmen.includes(player))
              .map((player) => (
                <option key={player} value={player}>
                  {player}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label>Non-Striker: </label>
          <select value={nonStriker} onChange={(e) => setNonStriker(e.target.value)}>
            {batsmanOptions
              .filter((player) => !dismissedBatsmen.includes(player))
              .map((player) => (
                <option key={player} value={player}>
                  {player}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label>Bowler: </label>
          <select value={bowler} onChange={(e) => setBowler(e.target.value)}>
            {bowlerOptions.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="score-buttons">
        <button onClick={() => handleRun(1)}>1 Run</button>
        <button onClick={() => handleRun(2)}>2 Runs</button>
        <button onClick={() => handleRun(4)}>4 Runs</button>
        <button onClick={() => handleRun(6)}>6 Runs</button>
        <button onClick={handleWicket}>Wicket</button>
        <button onClick={() => handleExtra("wide")}>Wide</button>
        <button onClick={() => handleExtra("noBall")}>No Ball</button>
        <button onClick={() => handleExtra("bye")}>Bye</button>
        <button onClick={() => handleExtra("legBye")}>Leg Bye</button>
      </div>

      <div className="score-summary-top-right">
        <h3>Score Summary</h3>
        <p>Overs: {overs}.{balls}</p>
        <p>Runs: {runs}</p>
        <p>Wickets: {wickets}</p>
        <p>Striker: {striker}</p>
        <p>Non-Striker: {nonStriker}</p>
        <p>Bowler: {bowler}</p>
        <p>Extras: {`Wide: ${extras.wide}, No Ball: ${extras.noBall}, Bye: ${extras.bye}, Leg Bye: ${extras.legBye}`}</p>
      </div>

      <div className="scorecard">
        <h3>Scorecard</h3>
        <table>
          <thead>
            <tr>
              <th>Batsman</th>
              <th>Runs</th>
              <th>Balls</th>
            </tr>
          </thead>
          <tbody>
            {batsmanOptions.map((player) => (
              <tr key={player}>
                <td>{player}</td>
                <td>{batsmanStats[player]?.runs}</td>
                <td>{batsmanStats[player]?.balls}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Bowler Stats</h3>
        <table>
          <thead>
            <tr>
              <th>Bowler</th>
              <th>Wickets</th>
              <th>Runs</th>
            </tr>
          </thead>
          <tbody>
            {bowlerOptions.map((player) => (
              <tr key={player}>
                <td>{player}</td>
                <td>{bowlerStats[player]?.wickets}</td>
                <td>{bowlerStats[player]?.runs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
