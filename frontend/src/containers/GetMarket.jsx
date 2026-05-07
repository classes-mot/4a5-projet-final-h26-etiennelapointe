import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MarketList from "../components/marketlist/MarketList";
import ErrorMsg from "../components/UIElements/ErrorMsg";
import { useContext } from "react";
import Spinner from "../components/UIElements/Spinner";

const Market = () => {
    const [loadedSales, setLoadedSales] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSales = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}market`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setLoadedSales(data.numbers);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSales();
    }, [fetch]);

    return (
        <>
            <div>
                {isLoading && <Spinner />}
                <ErrorMsg message={error} onClose={() => setError(null)} />
            </div>
            <MarketList items={loadedSales} />
        </>
    );
};

export default Market;
