import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const utilisateurSauvegarde = localStorage.getItem(
      "utilisateur-taskflow"
    );

    if (utilisateurSauvegarde) {
      setUtilisateur(JSON.parse(utilisateurSauvegarde));
    }

    setChargement(false);
  }, []);

  const login = (utilisateurConnecte) => {
    setUtilisateur(utilisateurConnecte);

    localStorage.setItem(
      "utilisateur-taskflow",
      JSON.stringify(utilisateurConnecte)
    );
  };

  const logout = () => {
    setUtilisateur(null);
    localStorage.removeItem("utilisateur-taskflow");
  };

  return (
    <AuthContext.Provider
      value={{
        utilisateur,
        chargement,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}