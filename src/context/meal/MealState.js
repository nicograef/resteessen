import React, { useReducer } from 'react'
import axios from 'axios'
import MealContext from './mealContext'
import mealReducer from './mealReducer'
import {
  GET_MEALS,
  FILTER_MEALS,
  CLEAR_FILTER,
  SET_LOADING,
  ADD_MEAL,
  UPDATE_MEAL,
  DELETE_MEAL,
  SET_CURRENT,
  SET_EDIT_MODE,
  CLEAR_EDIT_MODE
} from '../types'

const MealState = props => {
  const initialState = {
    meals: [],
    filtered: null,
    current: null,
    editMode: false,
    loading: false
  }

  const [state, dispatch] = useReducer(mealReducer, initialState)

  // Get meals
  const getMeals = async () => {
    setLoading()
    try {
      const res = await axios.get('/meals')
      dispatch({ type: GET_MEALS, payload: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  // Filter meals
  const filterMeals = query => {
    dispatch({ type: FILTER_MEALS, payload: stringToIngredients(query) })
  }

  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  // add a meal to db
  const addMeal = async meal => {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }

    meal.ingredients = stringToIngredients(meal.ingredients)

    setLoading()
    try {
      const res = await axios.post('/meals', meal, config)
      dispatch({ type: ADD_MEAL, payload: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  // update meal
  const updateMeal = async meal => {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }

    meal.ingredients = stringToIngredients(meal.ingredients)

    setLoading()
    try {
      const res = await axios.put(`/meals/${meal.id}`, meal, config)
      dispatch({ type: UPDATE_MEAL, payload: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  // delete meal
  const deleteMeal = async id => {
    setLoading()
    try {
      await axios.delete(`/meals/${id}`)
      dispatch({ type: DELETE_MEAL, payload: id })
    } catch (err) {
      console.log(err)
    }
  }

  // set current meal to edit (update or delete)
  const setCurrent = meal => {
    dispatch({ type: SET_CURRENT, payload: meal })
  }

  // activate edit mode
  const setEditMode = () => {
    dispatch({ type: SET_EDIT_MODE })
  }

  // deactivate edit mode
  const clearEditMode = () => {
    dispatch({ type: CLEAR_EDIT_MODE })
  }

  // Set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING })
  }

  // remove all whitespace from list of ingredients and return an arry of ingredients
  const stringToIngredients = s => {
    return s
      .toLowerCase()
      .trim()
      .replace(/\s*,\s*/g, ',')
      .split(',')
  }

  return (
    <MealContext.Provider
      value={{
        meals: state.meals,
        filtered: state.filtered,
        current: state.current,
        editMode: state.editMode,
        loading: state.loading,
        getMeals,
        filterMeals,
        clearFilter,
        addMeal,
        updateMeal,
        deleteMeal,
        setCurrent,
        setEditMode,
        clearEditMode
      }}
    >
      {props.children}
    </MealContext.Provider>
  )
}

export default MealState
