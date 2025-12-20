import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import AddRecipeForm from './components/AddRecipeForm';
import EditRecipeForm from './components/EditRecipeForm';
import DeleteRecipeButton from './components/DeleteRecipeButton';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                <a href="/" className="hover:text-blue-600">Recipe Book</a>
              </h1>
              <div className="flex gap-4">
                <a href="/" className="text-gray-700 hover:text-blue-600">Recipes</a>
                <a href="/add" className="text-gray-700 hover:text-blue-600">Add Recipe</a>
              </div>
            </div>
          </div>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/add" element={<AddRecipeForm />} />
            <Route path="/edit/:id" element={<EditRecipeForm />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        <footer className="bg-gray-800 text-white py-6 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p>Recipe Book App &copy; {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

