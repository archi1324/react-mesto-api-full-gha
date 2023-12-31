export const BASE_URL = "https://api.mesto.sayahov.nomoredomainsrocks.ru";

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const registerUser = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }).then(checkResponse);
}

export const loginUser = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }).then(checkResponse);
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then(checkResponse);
}