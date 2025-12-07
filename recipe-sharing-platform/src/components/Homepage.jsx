import { useState, useEffect } from "react";
import data from "./data.json";
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((fetchedData) => setData(fetchedData));
  }, []);
  return (
     <div>
      <h1>Recipes</h1>
      {data.map(recipe => (
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <p>Ingredients: {recipe.ingredients.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}

export default App ;