import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db } from "../lib/firebase";

type Credentials = {
  email: string;
  password: string;
};

type SignUpCredentials = Credentials & {
  fullName: string;
};

type AuthContextValue = {
  user: User | null;
  profilePhotoUrl: string | null;
  isLoading: boolean;
  signIn: (credentials: Credentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  resendVerificationEmail: (credentials: Credentials) => Promise<void>;
  updateProfilePhoto: (photoUrl: string | null) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user?.uid) {
      setProfilePhotoUrl(null);
      return;
    }

    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      const nextPhotoUrl = snapshot.data()?.profilePhotoUrl;

      if (typeof nextPhotoUrl === "string" && nextPhotoUrl.trim()) {
        setProfilePhotoUrl(nextPhotoUrl);
        return;
      }

      setProfilePhotoUrl(null);
    });

    return unsubscribe;
  }, [user?.uid]);

  const value: AuthContextValue = {
    user,
    profilePhotoUrl,
    isLoading,
    signIn: async ({ email, password }) => {
      const credential = await signInWithEmailAndPassword(auth, email, password);

      await reload(credential.user);

      if (!credential.user.emailVerified) {
        await firebaseSignOut(auth);
        throw new Error("Please confirm your email address before logging in.");
      }
    },
    signUp: async ({ email, password, fullName }) => {
      const credential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(credential.user, {
        displayName: fullName,
      });

      await setDoc(
        doc(db, "users", credential.user.uid),
        {
          uid: credential.user.uid,
          email,
          fullName,
          profilePhotoUrl: null,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      await sendEmailVerification(credential.user);
      await firebaseSignOut(auth);
    },
    resendVerificationEmail: async ({ email, password }) => {
      const credential = await signInWithEmailAndPassword(auth, email, password);

      await reload(credential.user);

      if (credential.user.emailVerified) {
        await firebaseSignOut(auth);
        throw new Error("This email address is already verified. You can log in normally.");
      }

      await sendEmailVerification(credential.user);
      await firebaseSignOut(auth);
    },
    updateProfilePhoto: async (nextPhotoUrl) => {
      if (!auth.currentUser) {
        throw new Error("You must be logged in to change your profile picture.");
      }

      await setDoc(
        doc(db, "users", auth.currentUser.uid),
        {
          profilePhotoUrl: nextPhotoUrl,
        },
        { merge: true }
      );

      setProfilePhotoUrl(nextPhotoUrl);
    },
    signOut: async () => {
      await firebaseSignOut(auth);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return value;
}