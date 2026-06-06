"use client";

import { useState } from "react";

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
    const stats: Record<string, { runs: number; balls: number }> = {};
    batsmanOptions.forEach((player) => {
      stats[player] = { runs: 0, balls: 0 };
    });
    return stats;
  });

  const [bowlerStats, setBowlerStats] = useState(() => {
    const stats: Record<string, { wickets: number; runs: number }> = {};
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

  const handleExtra = (type: "wide" | "noBall" | "bye" | "legBye") => {
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
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 350px", gap: "2rem", alignItems: "start" }}>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        
        {/* Controls Panel */}
        <div className="glass-panel" style={{ padding: "2rem" }}>
          <h2 style={{ marginBottom: "1.5rem", fontSize: "1.25rem" }}>Match Controls</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>Striker</label>
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
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>Non-Striker</label>
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
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>Bowler</label>
              <select value={bowler} onChange={(e) => setBowler(e.target.value)}>
                {bowlerOptions.map((player) => (
                  <option key={player} value={player}>
                    {player}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "1rem" }}>
            <button className="btn-primary" onClick={() => handleRun(1)}>1 Run</button>
            <button className="btn-primary" onClick={() => handleRun(2)}>2 Runs</button>
            <button className="btn-primary" onClick={() => handleRun(4)}>4 Runs</button>
            <button className="btn-primary" onClick={() => handleRun(6)}>6 Runs</button>
            <button className="btn-secondary" onClick={handleWicket} style={{ borderColor: "#ef4444", color: "#ef4444" }}>Wicket</button>
            <button className="btn-secondary" onClick={() => handleExtra("wide")}>Wide</button>
            <button className="btn-secondary" onClick={() => handleExtra("noBall")}>No Ball</button>
            <button className="btn-secondary" onClick={() => handleExtra("bye")}>Bye</button>
            <button className="btn-secondary" onClick={() => handleExtra("legBye")}>Leg Bye</button>
          </div>
        </div>

        {/* Scorecards */}
        <div className="glass-panel" style={{ padding: "2rem" }}>
          <h3 style={{ marginBottom: "1rem", color: "var(--accent-blue)" }}>Batting Scorecard</h3>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Batsman</th>
                  <th>Runs</th>
                  <th>Balls</th>
                </tr>
              </thead>
              <tbody>
                {batsmanOptions.map((player) => {
                  const isOut = dismissedBatsmen.includes(player);
                  const isBatting = player === striker || player === nonStriker;
                  const hasBatted = batsmanStats[player]?.balls > 0 || isBatting || isOut;
                  if (!hasBatted) return null;
                  
                  return (
                    <tr key={player} style={{ opacity: isOut ? 0.5 : 1 }}>
                      <td style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {player}
                        {player === striker && <span style={{ color: "var(--accent-blue)", fontSize: "0.8rem" }}>* (Striker)</span>}
                        {player === nonStriker && <span style={{ color: "var(--accent-purple)", fontSize: "0.8rem" }}>*</span>}
                        {isOut && <span style={{ color: "#ef4444", fontSize: "0.8rem" }}>(Out)</span>}
                      </td>
                      <td><b>{batsmanStats[player]?.runs}</b></td>
                      <td>{batsmanStats[player]?.balls}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <h3 style={{ marginTop: "3rem", marginBottom: "1rem", color: "var(--accent-purple)" }}>Bowling Stats</h3>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Bowler</th>
                  <th>Wickets</th>
                  <th>Runs</th>
                </tr>
              </thead>
              <tbody>
                {bowlerOptions.map((player) => {
                  const hasBowled = bowlerStats[player]?.runs > 0 || bowlerStats[player]?.wickets > 0 || player === bowler;
                  if (!hasBowled) return null;

                  return (
                    <tr key={player}>
                      <td style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {player}
                        {player === bowler && <span style={{ color: "var(--accent-blue)", fontSize: "0.8rem" }}>* (Current)</span>}
                      </td>
                      <td><b>{bowlerStats[player]?.wickets}</b></td>
                      <td>{bowlerStats[player]?.runs}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Floating Summary */}
      <div className="glass-panel" style={{ padding: "2rem", position: "sticky", top: "2rem" }}>
        <h2 className="gradient-text" style={{ fontSize: "1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>Live Score</h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>Runs</span>
            <span style={{ fontSize: "4rem", fontWeight: "700", lineHeight: "1" }}>{runs}<span style={{ fontSize: "2rem", color: "#ef4444" }}>/{wickets}</span></span>
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>Overs</span>
            <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>{overs}.{balls}</span>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid var(--glass-border)", margin: "1rem 0" }} />
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem", textTransform: "uppercase" }}>Striker</span> 
              <p style={{ fontWeight: "600", fontSize: "1.1rem" }}>{striker}</p>
            </div>
            <div>
              <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem", textTransform: "uppercase" }}>Non-Striker</span> 
              <p style={{ fontWeight: "600", fontSize: "1.1rem" }}>{nonStriker}</p>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem", textTransform: "uppercase" }}>Current Bowler</span> 
              <p style={{ fontWeight: "600", fontSize: "1.1rem", color: "var(--accent-blue)" }}>{bowler}</p>
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid var(--glass-border)", margin: "1rem 0" }} />
          
          <div>
             <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem", textTransform: "uppercase" }}>Extras</span>
             <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem", fontSize: "0.85rem", fontWeight: "600" }}>
               <span style={{ background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: "6px" }}>WD: {extras.wide}</span>
               <span style={{ background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: "6px" }}>NB: {extras.noBall}</span>
               <span style={{ background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: "6px" }}>B: {extras.bye}</span>
               <span style={{ background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: "6px" }}>LB: {extras.legBye}</span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
