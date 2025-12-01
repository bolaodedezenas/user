"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db} from "@/libs/firebase/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore"; // <-- importa doc/getDoc
import { loginWithGoogle, logout, loginWithEmail } from "@/libs/firebase/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      const unsubscribeAuth = auth.onAuthStateChanged(async (firebaseUser) => {

        if (!firebaseUser) {
          console.log('❌ Usuário não logado');
          setTimeout(() => setLoading(false), 3000);
          setUser(null);
          return;
        }

        if (firebaseUser) {
          //Verifica se o e-mail foi confirmado
          if (!firebaseUser.emailVerified ) {
            console.log('❌ E-mail nao verificado');
            setUser(null);
            setTimeout(() => setLoading(false) , 3000);
            return;
          }

          const docRef = doc(db, 'users', firebaseUser.uid);
          const snap = await getDoc(docRef);

         if (snap.exists()) {
           setUser({ id: firebaseUser.uid, ...snap.data() });
           localStorage.setItem("Photo", JSON.stringify(snap.data().photoURL));
         } else {
           setUser({
             id: firebaseUser.uid,
             ...firebaseUser,
           });
           localStorage.setItem("Photo", JSON.stringify(firebaseUser.photoURL));
         }


          setTimeout(() => setLoading(false), 3000);
        }
        
      });

      // verifica se o token mudou para atualizar o state do contexto 
      const unsubscribeToken = auth.onIdTokenChanged(async (user) => {
        if (user) {
          const newToken = await user.getIdToken();
          setUserToken(newToken);
        } else {
          setUserToken(null);
        }
      });
      
      return () => {
        unsubscribeAuth();
        unsubscribeToken();
      };
    } catch (error) {
      console.error('Erro no useEffect:', error);
    }
  }, []);


  const handleLoginWithGoogle = async () => {
    const { user, error } = await loginWithGoogle();
    if (error) return { error };
    return { user };
  };

  const handleLoginWithEmail = async (email, password) => {
    const { user, error } = await loginWithEmail(email, password);
    if (error) return { error };
    return { user };
  };

  const handleLogout = async () => {
    setLoading(true);
    await logout();
  };


 

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userToken,
        setUser,
        setLoading,
        handleLoginWithGoogle,
        handleLoginWithEmail,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
