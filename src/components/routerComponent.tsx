import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BlogDetails, HomePage, NavbarComponent } from "../constants/path";

export default function RouterComponent() {
    return (
        <BrowserRouter>
            <NavbarComponent />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="blog/details/:id" element={<BlogDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

