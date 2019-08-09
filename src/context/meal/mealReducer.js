import { GET_MEALS, FILTER_MEALS, CLEAR_FILTER, SET_LOADING } from '../types'

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
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }

    default:
      return state
  }
}
