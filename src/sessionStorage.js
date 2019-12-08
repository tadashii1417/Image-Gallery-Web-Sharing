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
  return "http://localhost:80/Gallery-Web-Back-End/";
}

export function getDefaultAvatar() {
  return "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
}

export function toDataURL(url) {
  return fetch(url)
    .then(response => {
      return response.blob();
    })
    .then(blob => {
      return URL.createObjectURL(blob);
    });
}
