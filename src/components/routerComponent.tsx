import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BlogDetails, FooterComponent, HomePage, LoginPage, NavbarComponent, NotFoundPage, ProfilePage, Register, useAuth } from "../constants/path";

export default function RouterComponent() {
    const { isAuthenticated } = useAuth()
    return (
        <BrowserRouter>
            <NavbarComponent />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog/details/:id" element={<BlogDetails />} />
                <Route
                    path="/login"
                    element={isAuthenticated ? <HomePage /> : <LoginPage />}
                />
                <Route
                    path="/register"
                    element={isAuthenticated ? <HomePage /> : <Register />}
                />

                <Route
                    path="/profile"
                    element={isAuthenticated ? <ProfilePage /> : <LoginPage />}
                />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <FooterComponent />
        </BrowserRouter>
    );
}

