import _api from './api';
import querystring from 'query-string';

export const getBuildings = async (id, params) => {
    try {
        const res = await _api.get(`/client_rfxs/${id}/buildings/?${querystring.stringify(params, { arrayFormat: 'comma' })}`);

        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getClientServices = async () => {
    try {
        const res = await _api.get(`client-service/`);

        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateSettings = async ({ id, settings }) => {
    try {
        const res = await _api.put(`client_rfxs/${id}/`, {
            settings: settings
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};



export const getdeliveryModels = async () => {
    try {
        const res = await _api.get(`delivery/`);

        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
