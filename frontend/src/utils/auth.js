// Helper functions for authentication

export const saveUserToLocalStorage = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
};

export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const isLoggedIn = () => {
    return !!localStorage.getItem("token");
};

export const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login"; // Optional redirect
};