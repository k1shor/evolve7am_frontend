import React, { useEffect, useState } from 'react'
import CategoryCheckbox from '../Components/CategoryCheckbox'
import PriceRadio from '../Components/priceRadio'
import { getFilteredProducts } from '../api/productApi'
import ProductCard from '../Components/ProductCard'

const products = () => {
  let [product, setProducts] = useState([])
  const [filters, setFilters] = useState({
    category: [], price: []
  })

  const handleFilters = (filter, filterBy) => {
    setFilters({ ...filters, [filterBy]: filter })
  }
  console.log(filters)

  useEffect(() => {
    getFilteredProducts(filters)
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          setProducts(data)
        }
      })
  }, [filters])

  return (
    <>
      <div className="grid grid-cols-5">
        <div className="col-span-1 p-5 shadow-2xl">
          <CategoryCheckbox handleCategory={handleFilters} />
          <PriceRadio handlePrice={handleFilters} />
        </div>
        <div className="col-span-4 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
          {
            product.length > 0 && 
            product.map(prod=>{
              return <ProductCard key={prod._id} product={prod} />
            })
          }



        </div>
      </div>

    </>
  )
}

export default products