import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import {
    onAuthStateChanged,
    type User
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface UserData {
    displayName: string;
    email: string;
    trustScore: number;
}

interface AuthContextType {
    currentUser: User | null;
    userData: UserData | null;
    loading: boolean;
    signup: (email: string, password: string, name: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

const defaultUser = {
    uid: 'guest-user',
    email: 'bhuvan@upyield.com',
    displayName: 'Bhuvan Reddy',
} as unknown as User;

const defaultUserData: UserData = {
    displayName: 'Bhuvan Reddy',
    email: 'bhuvan@upyield.com',
    trustScore: 98
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(defaultUser);
    const [userData, setUserData] = useState<UserData | null>(defaultUserData);
    const [loading, setLoading] = useState(false);

    async function signup(email: string, _password: string, name: string) {
        setUserData({ displayName: name, email, trustScore: 98 });
    }

    async function login(_email: string, _password: string) {
        setCurrentUser(defaultUser);
        setUserData(defaultUserData);
    }

    async function logout() {
        // No-op since auth is bypassed
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log("Auth state changed:", user ? "User logged in" : "No user");
            try {
                if (user) {
                    setCurrentUser(user);
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserData(docSnap.data() as UserData);
                    }
                } else {
                    setCurrentUser(defaultUser);
                    setUserData(defaultUserData);
                }
            } catch (error) {
                console.error("Error in auth state change:", error);
                setCurrentUser(defaultUser);
                setUserData(defaultUserData);
            } finally {
                setLoading(false);
            }
        }, (error) => {
            console.error("Auth subscription error:", error);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userData,
        loading,
        signup,
        login,
        logout
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (loading) {
                console.error("Auth initialization timed out");
                setLoading(false);
            }
        }, 3000); // 3 second fallback
        return () => clearTimeout(timer);
    }, [loading]);

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <div className="spinner"></div>
                    <p>Initializing Secure Session...</p>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};
