import React from 'react'
import { prices } from './prices'

const PriceRadio = ({handlePrice}) => {

    const handleChange = e => {
        let price = prices.find(p => p.id == e.target.value)
        let priceValue = price.value

        handlePrice(priceValue,'price')
    }


    return (
        <>
            <h1 className='text-2xl font-bold underline mt-5 mb-3'>Prices</h1>
            {
                prices.map(price => {
                    return <div class="flex items-center mb-4" key={price.id}>
                        <input id={price.id} type="radio" value={price.id} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" name='prices' onChange={handleChange} />
                        <label for={price.id} class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{price.title}</label>
                    </div>
                })
            }
        </>
    )
}

export default PriceRadio