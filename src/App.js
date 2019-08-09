import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'
// import M from 'materialize-css/dist/js/materialize.min.js'
import './App.css'

import Meals from './components/meals/Meals'
import SearchBar from './components/layout/SearchBar'

import MealState from './context/meal/MealState'

function App() {
  return (
    <MealState>
      <SearchBar />
      <Meals />
    </MealState>
  )
}

export default App
