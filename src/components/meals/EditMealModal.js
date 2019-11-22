import React, { useState, useContext, useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import MealContext from '../../context/meal/mealContext'

const EditMealModal = () => {
  const mealContext = useContext(MealContext)
  const { current, updateMeal, deleteMeal, clearEditMode } = mealContext

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    if (current) {
      setName(current.name)
      setImage(current.image)
      setIngredients(current.ingredients.join(', '))
      setTimeout(() => M.updateTextFields(), 1)
    }
  }, [current])

  const onUpdate = () => {
    const updatedMeal = {
      id: current.id,
      name,
      image,
      ingredients
    }

    updateMeal(updatedMeal)

    M.toast({ html: `${name} wurde aktualisiert` })
    clearFields()
  }

  const onDelete = () => {
    deleteMeal(current.id)
    M.toast({ html: `${name} wurde gelöscht` })
    clearFields()
  }

  const onCancel = () => {
    clearEditMode()
    clearFields()
  }

  const clearFields = () => {
    setName('')
    setImage('')
    setIngredients('')
  }

  return (
    <div id='edit-meal-modal' className='modal'>
      <div className='modal-content'>
        <h4>Gericht bearbeiten</h4>
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
        <a href='#!' onClick={onCancel} className='modal-close waves-effect btn-flat'>
          Abbrechen
        </a>{' '}
        <a href='#!' onClick={onDelete} className='modal-close waves-effect red btn'>
          Löschen
        </a>{' '}
        <a href='#!' onClick={onUpdate} className='modal-close waves-effect blue btn'>
          Aktualisieren
        </a>
      </div>
    </div>
  )
}

export default EditMealModal
