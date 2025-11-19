import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { create } from 'zustand'
// import { useRecipeStore, RecipeList } from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'


export default function App() {
  const [count, setCount] = useState(0)

  return(
    <>
    <RecipeList />
    <AddRecipeForm />
    </>
  )

}

