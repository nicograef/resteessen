import React, { useContext } from 'react'
import MealContext from '../../context/meal/mealContext'

const AddBtn = () => {
  const mealContext = useContext(MealContext)
  const { filtered, setEditMode } = mealContext

  if (filtered) return null

  return (
    <div className='fixed-action-btn'>
      <a href='#add-meal-modal' className='btn-floating btn-large blue darken-2 modal-trigger'>
        <i className='large material-icons'>add</i>
      </a>
      <ul>
        <li>
          <a href='#!' onClick={e => setEditMode()} className='btn-floating btn green'>
            <i className='material-icons'>edit</i>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default AddBtn
