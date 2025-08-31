import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BlogDetails, HomePage, LoginPage, NavbarComponent } from "../constants/path";

export default function RouterComponent() {
    return (
        <BrowserRouter>
            <NavbarComponent />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="blog/details/:id" element={<BlogDetails />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

