function ResultCard({ title, data }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p className="output">{data?.output ?? "–"}</p>
      <div className="metrics">
        <p><strong>Tokens:</strong> {data?.tokens ?? "–"}</p>
        <p><strong>Emissions:</strong> {data?.emissions ?? "–"} g</p>
        <p><strong>Latency:</strong> {data?.latency ?? "–"} ms</p>
      </div>
    </div>
  );
}

export default ResultCard;
