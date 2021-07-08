import _api from './api';

export const login = async ({ email, password }) => {
    try {
        const res = await _api.post(`login/`, {
            username: email,
            password: password,
        });
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const signup = async ({ name, email, password }) => {
    try {
        const res = await _api.post(`signup/`, {
            name: name,
            email: email,
            password: password,
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
};

export const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
}

export const resetRequest = async ({ email }) => {
    try {
        const res = await _api.post(`reset_password/`, {
            email: email
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const resetConfirmRequest = async ({password}) => {
    let token = sessionStorage.getItem('token');
    try {
        const res = await _api.post(`reset_password/confirm/`, {
            password: password,
            token: token
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// export const getUser = async () => {

//     try {
//         let res = await api.get(`me/`);

//         return res.data.user;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// };

// export const logout = async () => {
//     try {
//         await api.get(`logout/`);
//     } catch (error) {
//         console.log(error);
//     }
// };