import axios from 'axios';

const url = 'https://images-api.nasa.gov/search';

const findResults = async (searchParams) => {
    try {
        return await axios.get(url, { params: { q: searchParams, page_size: 100, page: 1 } });
    } catch (error) {
        console.log(error);
    }
    
};

export const getURLFromJson = async (json) => {
    try {
        return await axios.get(json);
    } catch (error) {
        console.log(error);
    }
}

export const findResultsByTag = async (tag) => {
    try {
        return await axios.get(url, { params: { keywords: tag, page_size: 25 } })
    } catch (error) {
        console.log(error);
    }
}

export default findResults;