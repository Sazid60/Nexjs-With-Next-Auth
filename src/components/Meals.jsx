'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Meals = () => {
    const [search, setSearch] = useState("apple")
    const [meals, setMeals] = useState([])

    const loadData = async () => {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        const data = await res.json()

        // Handle the case where no meals are found (data.meals is null)
        setMeals(data.meals || [])
    }

    const handler = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        loadData()
    }, [search])

    return (
        <div className='mt-12'>
            <input
                onChange={handler}
                className='p-4 border-2 mr-4 outline-none'
                type="text"
                placeholder='Search Meals' />
            <button className='p-4 bg-red-400'>Search</button>
            <div className='mt-12 grid grid-cols-3 gap-12'>
                {
                    meals.length > 0 ? (
                        meals.map((meal) => (
                            <div className='border-2 p-3' key={meal.idMeal}>
                               <Image src={meal?.strMealThumb} alt={meal.strMeal} width={500} height={500} />
                                <h6>{meal.strMeal}</h6>
                                <p>{meal.strInstructions}</p>
                            </div>
                        ))
                    ) : (
                        <p>No meals found</p>
                    )
                }
            </div>
        </div>
    );
};

export default Meals;
