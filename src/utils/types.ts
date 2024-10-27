export type TUser = {
    email: string;
    name: string;
};

export type TOptions = {
    method: string;
    mode: RequestMode;
    cache: RequestCache;
    credentials: RequestCredentials;
    headers: {
        'Content-Type': string;
        authorization?: string;
    };
    body?: string;
};

export type TDefaultApiResponse = {
    success: boolean;
    message: string;
};

export type TRegisterResponse = {
    success: boolean;
    user: TUser;
    accessToken: string;
    refreshToken: string;
};

export type TLoginResponse = {
    success: boolean;
    user: TUser;
    accessToken: string;
    refreshToken: string;
};

export type TTokenResponse = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
};

export type TUserResponse = {
    success: boolean;
    user: TUser;
}

export type TIngredient = {
    _id: string;
    name: string;
    type: "bun" | "sauce" | "main";
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uniqueId?: string
}

export type TOrder = { 
    number: number;
}

export type TOrderData = {
    name: string;
    order: TOrder;
}