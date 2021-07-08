import _api from './api';

export const getAssumption = async (id) => {
    try {
        const res = await _api.get(`assumption/${id}/`);

        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateAssumption = async ({ id, data }) => {
    try {
        const res = await _api.put(`assumption/${id}/`, {
            ...data
          });

        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const addAssumption = async ({ name, value, unit, source, service_by_building }) => {
    try {
        const res = await _api.post(`assumption/`, {
            name: name,
            value: value,
            unit: unit,
            source: source,
            service_by_building: service_by_building
          });

        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const deleteAssumption = async ({ id }) => {
    try {
        const res = await _api.delete(`assumption/${id}/`);

        if(res.status === 204) {
            return {data: true};
        }
        else return {data: false};
        
    } catch (error) {
        console.log(error);
        throw error;
    }
};


