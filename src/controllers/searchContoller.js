import axios from 'axios';

const url = 'https://images-api.nasa.gov/search';

const findResults = async (searchParams) => {
    try {
        return await axios.get(url, { params: { q: searchParams }});
        // console.log(response.data.collection.items);
        // return response.data;
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

export default findResults;