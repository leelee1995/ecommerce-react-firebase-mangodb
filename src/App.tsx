import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import NavBar from "./components/NavBar";
import { useState } from "react";
import { AuthProvider } from "./AuthContext";
import NotFoundPage from "./pages/NotFoundPage";
import UserRegistryPage from "./pages/UserRegistryPage";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <AuthProvider>
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
                <Route path="/user_registry" element={<UserRegistryPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
