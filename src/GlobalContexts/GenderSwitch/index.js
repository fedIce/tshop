import React, { createContext, useContext, useState } from 'react'


const gender = {
    gender: null,
    toggleGender: () => null
}

const GenderSwitchContext = createContext(gender)

const GenderSwitch = ({children}) => {
    const [gender, setGender] = useState('female')

    const toggleGender = (value = null) => {
        if(value){
            setGender(value)
            return
        }

        if(gender === 'male'){
            setGender('female')
        }else{
            setGender('male')
        }
    }

    const value = {toggleGender, gender}

  return (
    <GenderSwitchContext.Provider value={value}>{children}</GenderSwitchContext.Provider>
  )
}

export const useGenderSwitch = () => useContext(GenderSwitchContext)

export default GenderSwitch