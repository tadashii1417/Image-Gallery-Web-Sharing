export function setToken(token) {
    localStorage.setItem("x-access-token", token);
}

export function getToken() {
    return localStorage.getItem("x-access-token");
}

export function clearToken() {
    return localStorage.clear();
}