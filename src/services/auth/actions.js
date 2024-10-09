import { 
    login as apiLogin,
    logout as apiLogout,
    register as apiRegister, 
    getUser as apiGetUser,
    patchUser as apiUpdateUser} from "../../utils/auth-api";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";
export const AUTH_ERROR = "AUTH_ERROR";

export const setAuthError = (value) => ({
    type: AUTH_ERROR,
    payload: value,
  });

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const login = (email, password) => {
    return (dispatch) => {
        return apiLogin(email, password).then(res => {
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            dispatch(setUser(res.user));
            dispatch(setAuthChecked(true));
        });
    };
};

export const register = (email, password, name) => (dispatch) => {
    return apiRegister(email, password, name).then(res => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
    })
};

export const getUser = () => {
    const token = localStorage.getItem("accessToken");
    return (dispatch) => {
        return apiGetUser(token).then(res => {
            dispatch(setUser(res.user));
        })
    }
}

export const updateUser = (email, password, name) => {
    const token = localStorage.getItem("accessToken");
    return (dispatch) => {
        return apiUpdateUser(email, password, name, token).then(res => {
            dispatch(setUser(res.user));
        })
    }
}

export const checkUserAuth = () => {
    return (dispatch) => {
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
    return (dispatch) => {
        return apiLogout(token)
            .then(() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch(setUser(null));
            });
    };
};