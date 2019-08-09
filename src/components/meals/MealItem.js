import React, { useState } from 'react'
import PropTypes from 'prop-types'

const MealItem = ({ meal }) => {
  const [showIngredients, setShowIngredients] = useState(false)

  const onClick = e => {
    setShowIngredients(true)
  }

  const onMouseLeave = e => {
    // setShowIngredients(false)
    setTimeout(() => setShowIngredients(false), 1000)
  }

  return (
    <div className='mealItem'>
      <div className='card' onClick={onClick} onMouseLeave={onMouseLeave}>
        <div className='card-image'>
          <img src={meal.image} alt='food' />
          <span className='card-title'>
            {meal.name}
            {meal.matchingScore && (
              <span className='secondary-content white-text'>{meal.matchingScore * 100 + '%'}</span>
            )}
          </span>
        </div>
        {(showIngredients || meal.matchingIngredients) && (
          <div className='card-content'>
            {meal.ingredients.map((ingredient, i) => (
              <span
                key={i}
                className={
                  'ingredient white-text darken-2 ' +
                  (meal.matchingIngredients
                    ? meal.matchingIngredients.includes(ingredient)
                      ? 'green'
                      : 'red'
                    : 'grey')
                }
              >
                {ingredient}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

MealItem.propTypes = {
  meal: PropTypes.object.isRequired
}

export default MealItem
