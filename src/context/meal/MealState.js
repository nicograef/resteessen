import React, { useReducer } from 'react'
import MealContext from './mealContext'
import mealReducer from './mealReducer'
import { GET_MEALS, FILTER_MEALS, CLEAR_FILTER, SET_LOADING } from '../types'

const MealState = props => {
  const initialState = {
    meals: [],
    filtered: null,
    loading: false
  }

  const [state, dispatch] = useReducer(mealReducer, initialState)

  // Get meals
  const getMeals = async () => {
    setLoading()
    try {
      const res = await fetch('/meals')
      const data = await res.json()
      dispatch({ type: GET_MEALS, payload: data })
    } catch (err) {
      console.log(err)
    }
  }

  // Filter meals
  const filterMeals = query => {
    query = query.toLowerCase().split(' ')
    dispatch({ type: FILTER_MEALS, payload: query })
  }

  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  // Set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING })
  }

  return (
    <MealContext.Provider
      value={{
        meals: state.meals,
        loading: state.loading,
        filtered: state.filtered,
        getMeals,
        filterMeals,
        clearFilter
      }}
    >
      {props.children}
    </MealContext.Provider>
  )
}

export default MealState
