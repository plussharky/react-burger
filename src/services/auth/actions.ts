import { AppDispatch } from "../../types";
import { 
    login as apiLogin,
    logout as apiLogout,
    register as apiRegister, 
    getUser as apiGetUser,
    patchUser as apiUpdateUser} from "../../utils/auth-api";
import { TUser } from "../../utils/types";

export const SET_AUTH_CHECKED: "SET_AUTH_CHECKED" = "SET_AUTH_CHECKED";
export const SET_USER: "SET_USER" = "SET_USER";
export const AUTH_ERROR: "AUTH_ERROR" = "AUTH_ERROR";

export type TSetAuthErrorAction = {
    readonly type: typeof AUTH_ERROR;
    readonly message: string;
};

export type TSetAuthCheckedAction = {
    readonly type: typeof SET_AUTH_CHECKED;
    readonly isAuthChecked: boolean;
}

export type TSetUserAction = {
    readonly type: typeof SET_USER;
    readonly user: TUser | null
}

export type TAuthActions = TSetAuthErrorAction | TSetAuthCheckedAction | TSetUserAction;

export const setAuthError = (message: string): TSetAuthErrorAction => ({
    type: AUTH_ERROR,
    message,
});

export const setAuthChecked = (isAuthChecked: boolean): TSetAuthCheckedAction => ({
  type: SET_AUTH_CHECKED,
  isAuthChecked,
});

export const setUser = (user: TUser | null): TSetUserAction => ({
  type: SET_USER,
  user,
});

export const login = (email: string, password: string) => 
    (dispatch: AppDispatch) => 
        apiLogin(email, password)
            .then(res => {
                localStorage.setItem("accessToken", res.accessToken);
                localStorage.setItem("refreshToken", res.refreshToken);
                dispatch(setUser(res.user));
                dispatch(setAuthChecked(true));
            });

export const register = (email: string, password: string, name: string) => 
    (dispatch: AppDispatch) => 
        apiRegister(email, password, name)
            .then(res => {
                localStorage.setItem("accessToken", res.accessToken);
                localStorage.setItem("refreshToken", res.refreshToken);
                dispatch(setUser(res.user));
                dispatch(setAuthChecked(true));
            })

export const getUser = () => {
    const token = localStorage.getItem("accessToken");
    return (dispatch: AppDispatch) => {
        return apiGetUser(token!).then(res => {
            dispatch(setUser(res.user));
        })
    }
}

export const updateUser = (email: string, password: string, name: string) => {
    const token = localStorage.getItem("accessToken");
    return (dispatch: AppDispatch) => {
        return apiUpdateUser(email, password, name, token!).then(res => {
            dispatch(setUser(res.user));
        })
    }
}

export const checkUserAuth = () => {
    return (dispatch: AppDispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
              .catch(() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  dispatch(setUser(null));
               })
              .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};

export const logout = () => {
    const token = localStorage.getItem("refreshToken");
    return (dispatch: AppDispatch) => 
        apiLogout(token!)
            .then(() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch(setUser(null));
            });
};