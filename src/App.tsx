import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { firebaseApp } from "./firebase";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const auth = getAuth(firebaseApp);
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            <NavBar
                sideBarVisible={sidebarOpen}
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                firebaseUser={user}
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
