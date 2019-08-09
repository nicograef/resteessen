import React, { useRef, useContext } from 'react'
import MealContext from '../../context/meal/mealContext'

const SearchBar = () => {
  const mealContext = useContext(MealContext)
  const { filterMeals, clearFilter } = mealContext

  const text = useRef('')

  const onChange = e => {
    if (text.current.value === '') clearFilter()
    else filterMeals(text.current.value)
  }

  const onClear = e => {
    clearFilter()
    text.current.value = ''
  }

  return (
    <nav style={{ marginBottom: '5px' }} className='white'>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              placeholder='Nach Zutaten suchen ...'
              ref={text}
              onChange={onChange}
              className='black-text'
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons black-text'>search</i>
            </label>
            <i className='material-icons' onClick={onClear}>
              close
            </i>
          </div>
        </form>
      </div>
    </nav>
  )
}

export default SearchBar
