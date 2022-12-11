import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import TableContent from "../../components/TableContent";
import { convertStrToDateTime } from "../../utils/helpers";
import { getCovidData } from "./../../services/handleCallApi";

const Home = () => {
    const [covidData, setCovidData] = useState([]);

    useEffect(() => {
        getCovidData().then((data) => {
            console.log("data.data :>> ", data.data);
            setCovidData(data.data);
        });
    }, [getCovidData]);

    return covidData.Global ? (
        <div className="home">
            <div>
                <p>{`Data is updated at ${convertStrToDateTime(
                    covidData.Date
                )}`}</p>
            </div>
            {covidData.Countries && (
                <TableContent countries={covidData.Countries} />
            )}
            {covidData.Message && <p>{`${covidData.Message} ...`}</p>}
        </div>
    ) : (
        <Loading />
    );
};

export default Home;
