import { BASE_URL } from "./api-config";
import { getResponse } from "./fetchUtils";
import { fetchWithRefresh } from "./fetchUtils";

const AuthApiConfig = {
    baseUrl: BASE_URL,
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
}

export const register = (email, password, name) => {
    return fetch(AuthApiConfig.baseUrl + "/auth/register", {
        method: AuthApiConfig.method,
        headers: AuthApiConfig.headers,
        mode: AuthApiConfig.mode,
        cache: AuthApiConfig.cache,
        credentials: AuthApiConfig.credentials,
        body: JSON.stringify({email, password, name})
    })
    .then(getResponse)
}

export const login = (email, password) => {
    return fetch(AuthApiConfig.baseUrl + "/auth/login", {
        method: AuthApiConfig.method,
        headers: AuthApiConfig.headers,
        body: JSON.stringify({email, password})
    })
    .then(getResponse)
}

export const getUser = (token) => {
    return fetchWithRefresh(AuthApiConfig.baseUrl + "/auth/user", {
        method: 'GET',
        headers: AuthApiConfig.headers,
        mode: AuthApiConfig.mode,
        cache: AuthApiConfig.cache,
        credentials: AuthApiConfig.credentials,
        authorization: token,
    })
    .then(getResponse)
}

export const patchUser = (email, password, name, token) => {
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
    .then(getResponse)
}

export const token = (token) => {
    return fetch(AuthApiConfig.baseUrl + "/auth/token", {
        method: AuthApiConfig.method,
        headers: AuthApiConfig.headers,
        body: JSON.stringify({token})
    })
    .then(getResponse)
}

export const forgotPassword = (email) => {
    return fetch(AuthApiConfig.baseUrl + "/password-reset", {
        method: AuthApiConfig.method,
        headers: AuthApiConfig.headers,
        mode: AuthApiConfig.mode,
        cache: AuthApiConfig.cache,
        credentials: AuthApiConfig.credentials,
        body: JSON.stringify({email})
    })
    .then(getResponse)
}

export const resetPassword = (password, token) => {
    return fetch(AuthApiConfig.baseUrl + "/password-reset/reset", {
        method: AuthApiConfig.method,
        headers: AuthApiConfig.headers,
        mode: AuthApiConfig.mode,
        cache: AuthApiConfig.cache,
        credentials: AuthApiConfig.credentials,
        body: JSON.stringify({password, token})
    })
    .then(getResponse)
}

export const logout = (token) => {
    return fetch(AuthApiConfig.baseUrl + "/auth/logout", {
        method: AuthApiConfig.method,
        headers: AuthApiConfig.headers,
        body: JSON.stringify({token})
    })
    .then(getResponse)
}