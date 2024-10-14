import { BASE_URL } from "./api-config";
import { getResponse } from "./fetchUtils";
import { fetchWithRefresh } from "./fetchUtils";
import { TOptions, 
    TDefaultApiResponse, 
    TLoginResponse, 
    TRegisterResponse,
    TTokenResponse,
    TUserResponse
} from './types'

const AuthApiConfig: TOptions & { baseUrl: string }= {
    baseUrl: BASE_URL,
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
}

export const register = (email: string, password: string, name: string): Promise<TRegisterResponse> => {
    return fetch(AuthApiConfig.baseUrl + "/auth/register", {
        method: AuthApiConfig.method,
        headers: AuthApiConfig.headers,
        mode: AuthApiConfig.mode,
        cache: AuthApiConfig.cache,
        credentials: AuthApiConfig.credentials,
        body: JSON.stringify({email, password, name})
    })
    .then(getResponse<TRegisterResponse>)
}

export const login = (email: string, password: string): Promise<TLoginResponse> => {
    return fetch(AuthApiConfig.baseUrl + "/auth/login", {
        method: AuthApiConfig.method,
        headers: AuthApiConfig.headers,
        body: JSON.stringify({email, password})
    })
    .then(getResponse<TLoginResponse>)
}

export const getUser = (token: string): Promise<TUserResponse> => {
    return fetchWithRefresh(AuthApiConfig.baseUrl + "/auth/user", {
        method: 'GET',
        headers: { 
            ...AuthApiConfig.headers,
            authorization: token,
        },
        mode: AuthApiConfig.mode,
        cache: AuthApiConfig.cache,
        credentials: AuthApiConfig.credentials,
    })
    .then(getResponse<TUserResponse>)
}

export const patchUser = (email: string, password: string, name: string, token: string): Promise<TUserResponse> => {
    return fetchWithRefresh(AuthApiConfig.baseUrl + "/auth/user", {
        method: 'PATCH',
        headers: { 
            ...AuthApiConfig.headers,
            authorization: token,
        },
        mode: AuthApiConfig.mode,
        cache: AuthApiConfig.cache,
        credentials: AuthApiConfig.credentials,
        body: JSON.stringify({email, password, name})
    })
    .then(getResponse<TUserResponse>)
}

export const token = (token: string): Promise<TTokenResponse> => {
    return fetch(AuthApiConfig.baseUrl + "/auth/token", {
        method: AuthApiConfig.method,
        headers: AuthApiConfig.headers,
        body: JSON.stringify({token})
    })
    .then(getResponse<TTokenResponse>)
}

export const forgotPassword = (email: string): Promise<TDefaultApiResponse> => {
    return fetch(AuthApiConfig.baseUrl + "/password-reset", {
        method: AuthApiConfig.method,
        headers: AuthApiConfig.headers,
        mode: AuthApiConfig.mode,
        cache: AuthApiConfig.cache,
        credentials: AuthApiConfig.credentials,
        body: JSON.stringify({email})
    })
    .then(getResponse<TDefaultApiResponse>)
}

export const resetPassword = (password: string, token: string): Promise<TDefaultApiResponse> => {
    return fetch(AuthApiConfig.baseUrl + "/password-reset/reset", {
        method: AuthApiConfig.method,
        headers: AuthApiConfig.headers,
        mode: AuthApiConfig.mode,
        cache: AuthApiConfig.cache,
        credentials: AuthApiConfig.credentials,
        body: JSON.stringify({password, token})
    })
    .then(getResponse<TDefaultApiResponse>)
}

export const logout = (token: string): Promise<TDefaultApiResponse> => {
    return fetch(AuthApiConfig.baseUrl + "/auth/logout", {
        method: AuthApiConfig.method,
        headers: AuthApiConfig.headers,
        body: JSON.stringify({token})
    })
    .then(getResponse<TDefaultApiResponse>)
}