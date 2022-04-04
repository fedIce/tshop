import React from 'react'
import { useParams } from 'react-router-dom'
import PCard1 from '../../../Components/ProductCards/PCard1'
import { Database } from '../../../databse'
import { useGenderSwitch } from '../../../GlobalContexts/GenderSwitch'

const ProductCategoryPage = () => {
    const database = new Database()
    const { category } = useParams()
    const gender = useGenderSwitch()
    const _category = database.fetchCategory(category, gender.gender)

    return (
        <div>
            <div>Page Title</div>
            <div className='h-auto w-full'>
                {
                    _category && _category.length > 0 ?

                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center gap-y-4 pb-[150px]'>
                            {

                                _category.map((item, key) => {
                                    return <PCard1 id={item.id} title={item.title} image={item.image} price={item.price} discount_price={item.discount_price} key={key} />
                                })

                            }
                            
                        </div>
                        :
                        (
                            <div className='w-full h-full flex flex-col justify-center items-center'>
                                <span className='w-52 h-52'><img src="https://cdn.dribbble.com/users/1121009/screenshots/11030107/media/25be2b86a12dbfd8da02db4cfcbfe50a.jpg?compress=1&resize=400x300" className='w-full h-full object-cover' /></span>
                                <span className='text-xl text-gray-300 font-medium'>No Items in this Category</span>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default ProductCategoryPage