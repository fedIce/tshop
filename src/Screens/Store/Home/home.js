import React from 'react'
import HomeTiledProductShowCaseConfiguration from '../../../Components/HomeTiledProductShowCaseConfiguration'
import NewIn from '../../../Components/NewIn/Index'

const HomeScreen = () => {
    return (
        <div>
            <HomeTiledProductShowCaseConfiguration />
            <div>
                <NewIn category="Sports" />
            </div>
            <div className='w-full h-[400px]'></div>
        </div>
    )
}

export default HomeScreen