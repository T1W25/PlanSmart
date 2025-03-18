import { useState, useEffect } from "react";

const App = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      console.log("📢 Fetching event requests...");
      try {
        const response = await fetch("http://localhost:5050/api/Portfolio");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("📢 Received data:", data);

        if (Array.isArray(data)) {
          setPortfolio(data);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (error) {
        console.error("❌ Error fetching portfolios:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <div style={styles.container}>
      <h1> Event Requests</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {portfolio.length === 0 && !loading && <p>No event requests found.</p>}

      <div style={styles.grid}>
        {portfolio.map((portfolio) => (
          <div key={portfolio._id} style={styles.card}>
            {portfolio.image && (
              <img src={portfolio.image} alt={portfolio.name} style={styles.image} />
            )}
            <h2>{portfolio.name}</h2>
            <p>{portfolio.description}</p>
            {portfolio.date && <p><strong> Event Date:</strong> {portfolio.date}</p>}
            
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple inline CSS styles
const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    textAlign: "left",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
  },
};

export default App;
