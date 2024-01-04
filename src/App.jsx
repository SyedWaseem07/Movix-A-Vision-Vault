import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchDataFromApi } from './utils/api'
import { getApiConfiguration } from './store/homeSlice'

import { Home, Explore, SearchResult, PageNotFound, Details } from './pages'
import {Header, Footer} from './components'

function App() {

    const dispatcher = useDispatch();
    const { url } = useSelector(state => state.home)
    useEffect(() => {
        fetchApiConfig();
    }, [])

    const fetchApiConfig = () => {
        fetchDataFromApi('/configuration')
            .then(res => {
                const url = {
                    backdrop: res.images.secure_base_url + "original",
                    poster: res.images.secure_base_url + "original",
                    profile: res.images.secure_base_url + "original",
                }
                dispatcher(getApiConfiguration(url))
                
            });
    }

    return (
        <BrowserRouter>

            <Header />

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/:mediaType/:id' element={<Details />} />
                <Route path='/:search/:query' element={<SearchResult />} />
                <Route path='/:explore/:mediaType' element={<Explore />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>

            <Footer />

        </BrowserRouter>
    )
}

export default App
