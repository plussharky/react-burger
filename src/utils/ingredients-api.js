const ingredientsApiConfig = {
    baseUrl: "https://norma.nomoreparties.space/api/ingredients",
}

const getResponse = (res) => {
    if (res.ok) {
      return res.json()
        .then((response) => {
            if(response.success) {
                return response.data;
            }
            else {
                return Promise.reject(`Ошибка сервер вернул ответ с ошибкой`); 
            }
        });
    }

    return Promise.reject(`Ошибка ${res.status}`); 
};

export const getIngredients = () => {
    return fetch(ingredientsApiConfig.baseUrl)
        .then(getResponse);
}