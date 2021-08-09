import baseUrl from "../utils/baseUrl";
import axios from "axios";
import catchErrors from './catchErrors';
import Router from "next/router";
import cookie from "js-cookie";

export const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

const setToken = (token) => {
    cookie.set("token", token);
    Router.push("/");
}

export const registerUser = async (user, profilePhotoUrl, setError, setLoading) => {
    setLoading(true);
    try {
        const res = await axios.post(`${baseUrl}/api/signup`, { user, profilePhotoUrl});
        setToken(res.data);
    }
    catch (err) {
        catchErrors(err, setError);

    }
    setLoading(false);
};

export const loginUser = async (user, setError, setLoading) => {
    setLoading(true);
    try {
        const res = await axios.post(`${baseUrl}/api/auth`, { user });
        setToken(res.data);
    }
    catch (err) {
       catchErrors(err, setError);
    }
    setLoading(false);

};

export const redirectUser = async (ctx, loc) => {
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: loc });
        ctx.res.end();
    }
    else {
        Router.push(location);
    }
}

export const logoutUser = (email) => {
    cookie.set("userEmail", email);
    cookie.remove("token");
    Router.push("/login");
    Router.reload();
}