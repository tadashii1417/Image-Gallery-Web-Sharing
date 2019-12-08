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

export function toDataURL(id) {
    let url = "http://localhost/web/backend/api/image/fetch_an_image_from_server.php?id=" + id;
    return fetch("http://localhost/web/backend/upload/images/5ddfeecaecbb4.jpg").then((response) => {
        console.log(response);
        return response.blob();
    }).then(blob => {
        return URL.createObjectURL(blob);

    });
}
