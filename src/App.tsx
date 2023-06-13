import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { auth } from "./firebase";
import { useAuthStore } from "./store/AuthStore";
import Router from "./Router";

function App() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <HelmetProvider>
        <Router />
      </HelmetProvider>
    </>
  );
}

export default App;
