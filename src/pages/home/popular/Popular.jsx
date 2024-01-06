import React, { useState} from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper.jsx'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel.jsx'

const Popular = () => {
    const [endPt, setEndPt] = useState('movie')
    const { data, loading } = useFetch(`/${endPt}/popular`)

    const onTabChange = (tab) => {
        setEndPt((tab === 'Movies') ? 'movie' : 'tv');
    }

  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">
            What'sPopular
            </span>
            <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}
        endpoint={endPt}/>
        
    </div>
  )
}

export default Popular