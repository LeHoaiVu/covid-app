import axios from "axios";
import { buildUrlParams } from "../utils/helpers";

//GET
const apiGet = async (url, retries = 3, params) => {
    const result = { error: null, data: null };
    if (params) {
        url += params;
    }
    try {
        const resp = await axios.get(url);
        result.data = resp.data;
        return result;
    } catch (error) {
        result.error = error;
        if (retries > 0) {
            if (params) {
                return await apiGet(url, retries - 1, params);
            }
            return await apiGet(url, retries - 1);
        }
        return result;
    }
};

export const getCovidData = async () =>
    await apiGet("https://api.covid19api.com/summary", 3);

export const getInfoCountry = async (countryCode) =>
    await apiGet("https://restcountries.com/v3.1/alpha/", 3, countryCode);
