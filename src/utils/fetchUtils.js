import { BASE_URL } from "./api-config";

export const getResponse = (res) => {
    return res.json()
    .then((response) => {
        console.log(response);
        if(response.success) {
            return response;
        }
        else {
            console.log(response.message)
            return Promise.reject(response.message || `Ошибка сервер вернул ответ с ошибкой ${res.status}`); 
        }
    });
};

const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
        }),
    })
    .then(checkReponse)
    .then((refreshData) => {
        if (!refreshData.success) {
            return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken); 
        localStorage.setItem("accessToken", refreshData.accessToken);
        return refreshData;
    });
};

export const fetchWithRefresh = async (url, options) => {
    try {
        return await fetch(url, options);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); 
            options.headers = options.headers || {};
            options.headers.authorization = refreshData.accessToken;
            return await fetch(url, options);
        } else {
            return Promise.reject(err);
        }
    }
};