import axios from '../axios';

let config = {
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
};

export function loginUser(username, password) {
    const data = {
        username: username,
        password: password
    };
    console.log(data);
    return axios.post(`/auth/login.php`, data, config);
}

export function getMe(token) {
    const data = {
        jwt: token
    };
    return axios.post("/auth/validate_token.php", data, config);
}

export function registerUser(fullname, email, username, password, avatar) {
    const formData = new FormData();

    formData.append("avatar", avatar);
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);

    return axios.post('/auth/register', formData)
}

export function logoutUser() {
    return axios.post("/auth/logout");
}