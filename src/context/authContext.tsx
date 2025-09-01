import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../constants/firebaseConfig";
import type { componentProps } from "../components/types";

type AuthContextType = {
    user: componentProps["userProps"] | null;
    loading: boolean;
    isAuthenticated: boolean;
    logout: () => Promise<void>;
    // 👇 Add setters if you want to use them in LoginPage
    setUser: React.Dispatch<React.SetStateAction<componentProps["userProps"] | null>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<componentProps["userProps"] | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (firebaseUser) => {
            try {
                if (firebaseUser) {
                    setUser({
                        name: firebaseUser.displayName || "",
                        email: firebaseUser.email || "",
                        avatar: firebaseUser.photoURL || "",
                        userType: "default",
                    });
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
                
            } catch (error) {
                
            }
      finally {
                setLoading(false);
              

            }
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await FIREBASE_AUTH.signOut();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated,
                logout,
                setUser,
                setIsAuthenticated,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return auth;
}
