const orderApiConfig = {
    baseUrl: "https://norma.nomoreparties.space/api/orders",
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}

const getResponse = (res) => {
    if (res.ok) {
      return res.json()
        .then((response) => {
            if(response.success) {
                return response;
            }
            else {
                return Promise.reject(`Ошибка сервер вернул ответ с ошибкой`); 
            }
        });
    }

    return Promise.reject(`Ошибка ${res.status}`); 
};

export const postOrder = (ingredients) => {
    return fetch(orderApiConfig.baseUrl, {
        method: orderApiConfig.method,
        headers: orderApiConfig.headers,
        body: JSON.stringify(ingredients)
    })
    .then(getResponse);
};