import "../styles/globals.css";
import type { AppProps } from "next/app";
import Signin from "../components/Signin";
import { auth, db } from "../firebase";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Provider } from "react-redux";
import { store } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        const userData = {
          email: user?.email,
          displayName: user?.displayName,
          photoURL: user?.photoURL,
          uid: user?.uid,
        };
        setDoc(doc(db, "users", user?.uid), userData);

        setIsLoggedin(true);
      } else setIsLoggedin(false);
    });

    return () => {
      unsub();
    };
  }, []);

  if (loading) return <Loading />;
  if (!isLoggedin) return <Signin />;
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
