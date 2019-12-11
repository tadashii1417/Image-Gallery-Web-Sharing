export function setToken(token) {
    localStorage.setItem("x-access-token", token);
}

export function getToken() {
    return localStorage.getItem("x-access-token");
}

export function clearToken() {
    return localStorage.clear();
}

export function getImageBase() {
    return "http://localhost/web/backend";
}

export function getDefaultAvatar() {
    return "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
}

export function toDataURL(url) {
    let serverUrl = "http://localhost/web/backend/api/image/fetch_an_image_from_server.php?image=" + url;
    return fetch(serverUrl).then((response) => {
        console.log(response);
        return response.blob();
    }).then(blob => {
        return URL.createObjectURL(blob);

    });
}
