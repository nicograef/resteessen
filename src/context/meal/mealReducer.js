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

export default (state, action) => {
  switch (action.type) {
    case GET_MEALS:
      return {
        ...state,
        meals: action.payload,
        loading: false
      }
    case FILTER_MEALS:
      return {
        ...state,
        filtered: state.meals.filter(meal => {
          // TODO: use regular expressions to test (instead of string)
          // const regex = new RegExp(`${action.payload}`, 'gi')
          const matchingIngredients = meal.ingredients.filter(i => action.payload.includes(i))
          meal.matchingIngredients = matchingIngredients
          meal.matchingScore = matchingIngredients.length / meal.ingredients.length
          return matchingIngredients.length / meal.ingredients.length >= 0.5
        })
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        meals: state.meals.map(meal => {
          delete meal.matchingIngredients
          delete meal.matchingScore
          return meal
        })
      }
    case ADD_MEAL:
      return {
        ...state,
        meals: [...state.meals, action.payload],
        loading: false
      }
    case UPDATE_MEAL:
      return {
        ...state,
        meals: state.meals.map(meal => (meal.id === action.payload.id ? action.payload : meal)),
        editMode: false,
        loading: false
      }
    case DELETE_MEAL:
      return {
        ...state,
        meals: state.meals.filter(meal => meal.id !== action.payload),
        editMode: false,
        loading: false
      }
    case SET_EDIT_MODE:
      return {
        ...state,
        editMode: true
      }
    case CLEAR_EDIT_MODE:
      return {
        ...state,
        editMode: false
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }

    default:
      return state
  }
}
