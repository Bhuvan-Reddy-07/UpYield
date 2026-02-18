import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    async function signup(email: string, password: string, name: string) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            displayName: name,
            email: email,
            trustScore: 98, // Default starting score
            createdAt: new Date().toISOString()
        });

        setUserData({ displayName: name, email, trustScore: 98 });
    }

    function login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password).then(() => { });
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log("Auth state changed:", user ? "User logged in" : "No user");
            try {
                setCurrentUser(user);
                if (user) {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserData(docSnap.data() as UserData);
                    }
                } else {
                    setUserData(null);
                }
            } catch (error) {
                console.error("Error in auth state change:", error);
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
