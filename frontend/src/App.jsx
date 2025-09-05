import { useState } from "react";
import ResultCard from "./components/ResultCard";
import "./index.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleCompare = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResults(null);

    try {
      const res = await fetch(`${API_URL}/compare`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setResults(data);
      }
    } catch (err) {
      console.error(err);
      alert("Error talking to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Prompare</h1>
      <p className="subtitle">
        Compare LLM responses, tokens, latency & emissions
      </p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
      />
      <button onClick={handleCompare} disabled={loading}>
        {loading ? "Comparing..." : "Compare"}
      </button>

      {results && (
        <div className="results">
          <ResultCard title="GROQ" data={results.groq} />
          <ResultCard title="DeepSeek" data={results.deepseek} />
        </div>
      )}
    </div>
  );
}
