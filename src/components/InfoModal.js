import React, { useEffect, useState } from "react";
import { getInfoCountry } from "../services/handleCallApi";
import Loading from "./Loading";

function InfoModal({ setOpenModal, countryCode }) {
    const [countryData, setCountryData] = useState([]);
    useEffect(() => {
        getInfoCountry(countryCode).then((res) => {
            setCountryData(res.data[0]);
        });
    }, []);

    return countryData.length != 0 ? (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>

                <div className="modal-content">
                    <div className="modal-content-left">
                        <img
                            className="flag"
                            alt={countryData.name}
                            src={countryData.flags.png}
                        />
                        <h4>{countryData.name.official}</h4>
                    </div>
                    <div className="modal-content-right">
                        <h4>{`Region: ${countryData.region}`}</h4>
                        <h4>
                            {`Subregion: ${
                                countryData.subregion
                                    ? countryData.subregion
                                    : "No data"
                            }`}{" "}
                        </h4>
                        <h4>
                            {`Capital: ${
                                countryData.capital
                                    ? countryData.capital
                                    : " No data"
                            }`}{" "}
                        </h4>
                        <h4>
                            {`Population: ${
                                countryData.population
                                    ? countryData.population
                                    : "No data"
                            } people`}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <p>No data</p>
    );
}

export default InfoModal;
