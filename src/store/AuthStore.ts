import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

interface AuthState {
  user: User | null;
  setUser: (newUser: User | null) => void;
  signin: (email: string, password: string) => Promise<unknown>;
  signout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (newUser: User | null) => {
          set({ user: newUser });
        },
        signin: (email: string, password: string) =>
          new Promise((resolve, reject) =>
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                resolve(userCredential);
              })
              .catch((error) => {
                reject(error.message);
              })
          ),
        signout: async () => {
          await auth.signOut();
        },
      }),
      {
        name: "auth-storage",
      }
    )
  )
);
