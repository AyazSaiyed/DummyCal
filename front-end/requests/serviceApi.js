import _api from './api';
import querystring from 'query-string';

export const getServices = async (params) => {
    try {
        const res = await _api.get(`service/?${querystring.stringify(params, { arrayFormat: 'comma' })}`);
        
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const doServiceMapping = async (data) => {
    try {
        const res = await _api.post(`service-mapping/`, [...data]);

        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getServiceByBuildingList = async (params) => {
    try {
        const res = await _api.get(`service-by-building/?${querystring.stringify(params, { arrayFormat: 'comma' })}`);
        
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getServiceByBuilding = async (id) => {
    try {
        const res = await _api.get(`service-by-building/${id}/`);
        
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const updateServiceByBuilding = async ({id, data, building, client_service}) => {
    try {
        const res = await _api.put(`service-by-building/${id}/`, {
            ...data,
            building: building,
            client_service: client_service
          });
        
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const addServiceByBuilding = async (building, client_service) => {
    try {
        const res = await _api.post(`service-by-building/`, {
            building: building,
            client_service: client_service
          });
        
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


