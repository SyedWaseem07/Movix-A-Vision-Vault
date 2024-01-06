import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
    const [data, setData] = useState(null); //Used to store data obtained from API
    const [loading, setLoading] = useState(null); //Used to check loading status
    const [error, setError] = useState(null); //Used to check error status

    useEffect(() => {
        setLoading("loading...");
        setData(null);
        setError(null);

        fetchDataFromApi(url)
            .then((res) => {    //API response received successfully
                setLoading(false);
                setData(res);
            })
            .catch((err) => { // Got Error 
                setLoading(false);
                setError("Something went wrong!");
                alert("No network")
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;