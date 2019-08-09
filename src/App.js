import React, { useEffect } from 'react'

import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import './App.css'

import Meals from './components/meals/Meals'
import AddMealModal from './components/meals/AddMealModal'
import EditMealModal from './components/meals/EditMealModal'
import SearchBar from './components/layout/SearchBar'
import AddBtn from './components/layout/AddBtn'

import MealState from './context/meal/MealState'

const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit()
  })

  return (
    <MealState>
      <SearchBar />
      <AddBtn />
      <AddMealModal />
      <EditMealModal />
      <Meals />
    </MealState>
  )
}

export default App
