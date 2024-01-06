import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch.jsx";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper.jsx";
import "./style.scss";

const HeroBanner = () => {
    const [background, setBackground] = useState(""); //Bg image of hero is diff every time website loads
    const [query, setQuery] = useState(""); // for storing content of search feild
    const navigator = useNavigate(); // to navigate to links of movies searched
    const { data, loading } = useFetch("/movie/upcoming"); //Api call using custom hook
    const { url } = useSelector((state) => state.home);

    useEffect(() => {
        let firstHalf = url.backdrop === undefined ? "https://image.tmdb.org/t/p/original" : url.backdrop;

        let secondHalf =  data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path === undefined ? "/50stq3Jlny6oEgJjsXbQvbajCNw.jpg" : data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;

        let bgImgLink = firstHalf + secondHalf;

        setBackground(bgImgLink);

    }, [data]);

    const searchQueryHandler = (e) => {
        // Only calls api after type some content in search and hitting enter
        if (e.key === "Enter" && query.length > 0) {
            navigator(`/search/${query}`);
        }
    };
// 
    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity-layer"></div>

            <ContentWrapper>
                <div className="heroBanner-content">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover. Explore now.
                    </span>
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show"
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button
                        onClick={() => {
                            query.length > 0 ? navigator(`/search/${query}`) : '';
                        }}
                        >Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
