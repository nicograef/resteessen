import React, { useEffect, useContext } from 'react'
import MealItem from './MealItem'
import MealContext from '../../context/meal/mealContext'

const Meals = () => {
  const mealContext = useContext(MealContext)
  const { meals, filtered, loading, getMeals, clearEditMode } = mealContext

  useEffect(() => {
    getMeals()
    // eslint-disable-next-line
  }, [])

  if (!meals.length) return <p>Keine Gerichte vorhanden.</p>

  return (
    <div className='container-grid' onClick={() => clearEditMode()}>
      {filtered
        ? filtered.map(meal => <MealItem key={meal.id} meal={meal} />)
        : meals.map(meal => <MealItem key={meal.id} meal={meal} />)}
    </div>
  )
}

export default Meals
