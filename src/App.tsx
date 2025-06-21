import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import NavBar from "./components/NavBar";
import { useState } from "react";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <NavBar
                sideBarVisible={sidebarOpen}
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />
            <Routes>
                <Route
                    path="/"
                    element={<HomePage sideBarVisible={sidebarOpen} />}
                />
                <Route path="/user" element={<UserPage />} />
            </Routes>
        </>
    );
}

export default App;
