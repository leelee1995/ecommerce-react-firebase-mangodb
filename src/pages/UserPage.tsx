import React, { useEffect, useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from "firebase/auth";
import { firebaseApp } from "../firebase";
import type { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
    const [role, setRole] = React.useState<"buyer" | "seller">("seller");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const auth = getAuth(firebaseApp);
    // Create a new Google Auth Provider
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/", { replace: true });
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [auth, navigate]);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Registration successful
                console.log("User registered:", userCredential.user);
            })
            .catch((error) => {
                // Handle errors
                console.error("Registration error:", error.code, error.message);
            });
    };

    // Optional: Add custom scopes if you need access to more user data (e.g., contacts)
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    // Optional: Set custom parameters for the OAuth request (e.g., login_hint)
    // provider.setCustomParameters({
    //   'login_hint': 'user@example.com'
    // });

    // Function to handle Google Sign-in
    async function signInWithGoogle() {
        try {
            // You have two main options for the sign-in flow:
            // 1. signInWithPopup: Opens a pop-up window for authentication.
            //    This is generally preferred for web apps as it keeps the user on your page.
            const result = await signInWithPopup(auth, provider);

            // 2. signInWithRedirect: Redirects the entire page to Google for authentication,
            //    then redirects back to your app. Useful if pop-ups are blocked or not desired.
            //    await signInWithRedirect(auth, provider);
            //    // After redirect, you'd handle the result on page load using getRedirectResult
            //    // const result = await getRedirectResult(auth);

            // The signed-in user information
            const user = result.user;
            console.log("Signed in user:", user);

            // You can also get the Google ID Token and Access Token
            const credential = GoogleAuthProvider.credentialFromResult(result);

            if (!credential) {
                throw new Error("No credential found in the result.");
            }

            const idToken = credential.idToken;
            const accessToken = credential.accessToken;
            console.log("ID Token:", idToken);
            console.log("Access Token:", accessToken);

            // Now the user is signed in to Firebase! You can update your UI or navigate.
        } catch (error: FirebaseError | any) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);

            console.error("Error during Google Sign-in:", errorMessage);
            if (errorCode === "auth/popup-closed-by-user") {
                console.warn("Google sign-in popup was closed by the user.");
            }
            // You might want to show an error message to the user
            alert(
                `Error signing in with Google: ${
                    email ? email : "Unknown user"
                } - ${errorMessage} (This alert dialogue is intentional for testing purposes) ${
                    credential ? `- Credential: ${credential.providerId}` : ""
                }`
            );
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] w-full">
                <div className="text-lg text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] w-full">
            <div className="w-100 border-2 border-purple-500 rounded-md p-4">
                <div className="w-full bg-yellow-200 border-1 border-yellow-500 p-2 rounded-md text-yellow-800 mb-2">
                    <p>
                        <span className="font-bold">Attention:</span> This is a
                        demo application. Authentication is not fully
                        implemented. Do not use business/company credentials,
                        and <span className="font-bold">DO</span> delete your
                        account after exploring this demo under{" "}
                        <span className="underline">profile</span>.
                    </p>
                </div>
                <h1 className="font-bold">Sign up</h1>
                <input
                    id="seller"
                    name="seller"
                    type="radio"
                    checked={role === "seller"}
                    onChange={() => setRole("seller")}
                />
                <label className="ml-2" htmlFor="seller">
                    Seller
                </label>
                <input
                    id="buyer"
                    name="buyer"
                    type="radio"
                    className="ml-4"
                    checked={role === "buyer"}
                    onChange={() => setRole("buyer")}
                />
                <label className="ml-2" htmlFor="buyer">
                    Buyer
                </label>

                <div className="mt-4">
                    <label
                        className="block mb-2"
                        htmlFor={role === "seller" ? "name" : "companyName"}
                    >
                        {role === "seller" ? "Name" : "Company Name"}
                    </label>
                    <input
                        id={role === "seller" ? "name" : "companyName"}
                        name={role === "seller" ? "name" : "companyName"}
                        type="text"
                        className="w-full border p-2 rounded-md"
                    />
                    <form onSubmit={handleRegister}>
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full border p-2 rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="block mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full border p-2 rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="block w-full bg-blue-500 text-white p-2 rounded-md mt-2">
                            Submit
                        </button>
                    </form>
                </div>
                <hr className="border-b-1 border-gray-300 w-full my-2" />
                <h1 className="font-bold">Sign in with:</h1>
                <button
                    className="bg-blue-500 text-white p-2 rounded-md mt-2 w-full hover:cursor-pointer"
                    onClick={signInWithGoogle}
                >
                    Google
                </button>
            </div>
        </div>
    );
};

export default UserPage;
