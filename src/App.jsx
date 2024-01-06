import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchDataFromApi } from './utils/api'
import { getApiConfiguration, getGenres } from './store/homeSlice'

import { Home, Explore, SearchResult, PageNotFound, Details } from './pages'
import {Header, Footer} from './components'

function App() {

    const dispatcher = useDispatch();
    const { url } = useSelector(state => state.home)
    useEffect(() => {
        fetchApiConfig();
        genresCall();
    }, [])

    const fetchApiConfig = () => {
        fetchDataFromApi('/configuration')
            .then(res => {
                const imgUrl = {
                    backdrop: res.images.secure_base_url + "original",
                    poster: res.images.secure_base_url + "original",
                    profile: res.images.secure_base_url + "original",
                }
                dispatcher(getApiConfiguration(imgUrl))
                
            });
    }

    const genresCall = async () => {
        let promises = []
        let endPts = ['tv', 'movie']
        let allGenres = {}

        endPts.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        })
        const data = await Promise.all(promises);
        data.map(({genres}) => {
            return genres.map((item) => {
                allGenres[item.id] = item;
            })
        })

        dispatcher(getGenres(allGenres))
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
