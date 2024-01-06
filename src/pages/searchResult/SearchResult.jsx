import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

import './style.scss'

import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import MovieCard from '../../components/movieCard/MovieCard'
import Spinner from '../../components/spinner/Spinner'
import noResults from '../../assets/no-results.png'

const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query]) 


    const fetchInitialData = () => {
        setLoading(true);
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=d4c0f2bec852eec894b556b7901524fc&query=${query}&page=${pageNum}`)
        .then(res => res.json())
        .then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        })
    }

    const fetchNextPageData = () => {
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=d4c0f2bec852eec894b556b7901524fc&query=${query}&page=${pageNum}`)
        .then(res => res.json())
        .then((res) => {
            if(data?.results) {
                setData({...data, results: [...data?.results, ...res.results]});
            } else setData(res);
            setPageNum((prev) => prev + 1);
        })
    }
    


    return (
        <div className='searchResultsPage'>
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search : ${data.total_results > 1 ? "results" : "result"} of '${query}'`}
                            </div>
                            <InfiniteScroll
                            className='content'
                            dataLength={data?.results?.length || []}
                            next={fetchNextPageData}
                            hasMore={pageNum <= data?.total_pages}
                            loader={<Spinner />}
                            >
                                {data?.results?.map((item, index) => {
                                    if(item.media_type === "person") return;
                                    return (
                                        <MovieCard key={index} data={item} fromSearch={true} />
                                    )
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFound">
                            Sorry, No matching results
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    )
}

export default SearchResult;