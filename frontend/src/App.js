import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  return (
    <div className="container">
      <h1>AWS Product Store</h1>

      <div className="grid">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <h2>{product.name}</h2>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;