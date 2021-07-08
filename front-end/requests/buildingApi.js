import _api from './api';
import querystring from 'query-string';

export const getBuildings = async (params) => {
    try {
        const res = await _api.get(`buildings/?${querystring.stringify(params, { arrayFormat: 'comma' })}`);

        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getBuildingType = async (id) => {
    try {
        const res = await _api.get(`building_types/${id}/`);
        
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}