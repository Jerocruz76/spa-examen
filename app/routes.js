import { homeScene } from "./scenes/private/home/home";
import { Login } from "./scenes/public/login/login";
import { Register } from "./scenes/public/register/register";

export const routes = {
    public: [
        {path:'/register', scene: Register},
        {path: '/login', scene: Login}
    ],
    private: [
        {path:'/home', scene: homeScene}
    ]
}