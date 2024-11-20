interface ScoreCardProps {
    runs: number;
    wickets: number;
    overs: number;
    extras: { wide: number; noball: number; bye: number; legbye: number };
  }
  
  export default function ScoreCard({ runs, wickets, overs, extras }: ScoreCardProps) {
    return (
      <div className="p-4 border rounded bg-gray-100">
        <h2 className="text-xl font-bold">Scorecard</h2>
        <p>
          <strong>Runs:</strong> {runs} | <strong>Wickets:</strong> {wickets} |{" "}
          <strong>Overs:</strong> {overs}
        </p>
        <p>
          <strong>Extras:</strong> Wide: {extras.wide}, No Ball: {extras.noball}, Bye:{" "}
          {extras.bye}, Leg Bye: {extras.legbye}
        </p>
      </div>
    );
  }
  