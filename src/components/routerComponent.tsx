import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BlogDetails, HomePage, LoginPage, NavbarComponent, NotFoundPage, Register, useAuth } from "../constants/path";

export default function RouterComponent() {
    const { isAuthenticated } = useAuth()
    return (
        <BrowserRouter>
            <NavbarComponent />
            <Routes>
                <Route path="/" element={<HomePage /> } />
                <Route path="/blog/details/:id" element={<BlogDetails />} />
                <Route
                    path="/login"
                    element={isAuthenticated ? <HomePage /> : <LoginPage />}
                />
                <Route
                    path="/register"
                    element={isAuthenticated ? <HomePage /> : <Register />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

        </BrowserRouter>
    );
}

