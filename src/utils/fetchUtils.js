export const getResponse = (res) => {
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