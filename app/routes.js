
import { createTravel } from "./scenes/private/adminViews/create travels/create";
import { editTravel } from "./scenes/private/adminViews/edit travels/edit";
import { bookScene } from "./scenes/private/book/book";
import { homeScene } from "./scenes/private/home/home";
import { Login } from "./scenes/public/login/login";
import { Register } from "./scenes/public/register/register";

export const routes = {
    public: [
        {path:'/register', scene: Register},
        {path: '/login', scene: Login}
    ],
    private: [
        {path:'/home', scene: homeScene},
        {path:'/bookScene', scene: bookScene}
    ],
    admin: [
        {path:'/createTravel', scene: createTravel},
        {path:'/editTravel', scene: editTravel}
    ]
}