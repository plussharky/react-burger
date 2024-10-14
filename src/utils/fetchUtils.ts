import { BASE_URL } from "./api-config";
import { TOptions, TTokenResponse } from "./types";

type TBaseResponse = {
    success: boolean;
    message?: string;
};

export const getResponse = <T>(res: Response): Promise<T> => {
    return res.json()
    .then((response: T & TBaseResponse ) => {
        if(response.success) {
            return response;
        } else {
            return Promise.reject(response.message || `Ошибка сервер вернул ответ с ошибкой ${res.status}`); 
        }
    });
};

const checkReponse = <T>(res: Response): Promise<T>  => {
    return res.ok 
    ? res.json() 
    : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = (): Promise<TTokenResponse> => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
        }),
    })
    .then(checkReponse<TTokenResponse>)
    .then((refreshData: TTokenResponse) => {
        if (!refreshData.success) {
            return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken); 
        localStorage.setItem("accessToken", refreshData.accessToken);
        return refreshData;
    });
};

export const fetchWithRefresh = async (url: string, options: TOptions) => {
    try {
        return await fetch(url, options);
    } catch (err: any) {
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