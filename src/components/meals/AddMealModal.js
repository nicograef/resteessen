import React, { useState, useContext } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import MealContext from '../../context/meal/mealContext'

const AddMealModal = () => {
  const mealContext = useContext(MealContext)
  const { addMeal } = mealContext

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [ingredients, setIngredients] = useState([])

  const onSubmit = () => {
    const newMeal = {
      name,
      image,
      ingredients
    }

    addMeal(newMeal)

    M.toast({ html: `${name} wurde hinzugefügt` })
    clearFields()
  }

  const clearFields = () => {
    setName('')
    setImage('')
    setIngredients('')
  }

  return (
    <div id='add-meal-modal' className='modal'>
      <div className='modal-content'>
        <h4>Neues Gericht</h4>
        <div className='row'>
          <div className='input-field'>
            <input type='text' name='name' value={name} onChange={e => setName(e.target.value)} />
            <label htmlFor='name'>Name</label>
          </div>
          <div className='input-field'>
            <input type='url' name='image' value={image} onChange={e => setImage(e.target.value)} />
            <label htmlFor='image'>Bild</label>
          </div>
          <div className='input-field'>
            <input
              type='text'
              name='ingredients'
              value={ingredients}
              onChange={e => setIngredients(e.target.value)}
            />
            <label htmlFor='ingredients'>Zutaten</label>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a href='#!' onClick={() => clearFields()} className='modal-close waves-effect btn-flat'>
          Abbrechen
        </a>{' '}
        <a href='#!' onClick={onSubmit} className='modal-close waves-effect blue btn'>
          Hinzufügen
        </a>
      </div>
    </div>
  )
}

export default AddMealModal
