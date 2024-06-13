import React from 'react'
import CategoryCheckbox from '../Components/CategoryCheckbox'

const products = () => {
  return (
    <>
    <div className="grid grid-cols-5">
      <div className="col-span-1 p-5">
        <CategoryCheckbox/>
      </div>
      <div className="col-span-4">Products</div>
    </div>
      
    </>
  )
}

export default products