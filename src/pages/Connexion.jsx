import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Connexion() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErreur("");
    setChargement(true);

    try {
      const response = await fetch(
        `http://localhost:3000/utilisateurs?email=${encodeURIComponent(email)}`
      );

      if (!response.ok) {
        throw new Error("Erreur serveur");
      }

      const utilisateurs = await response.json();

      const utilisateur = utilisateurs.find(
        (user) => user.motDePasse === motDePasse
      );

      if (!utilisateur) {
        setErreur("Email ou mot de passe incorrect.");
        return;
      }

      login(utilisateur);
      navigate("/dashboard");
    } catch (error) {
      setErreur("Impossible de se connecter. Vérifie que json-server fonctionne.");
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div className="auth-brand-content">
          <div className="auth-brand-logo">
            <div className="logo-icon">T</div>
            <strong>TaskFlow</strong>
          </div>

          <h1>Organisez vos projets. Avancez plus vite.</h1>

          <p>
            Centralisez vos projets, vos tâches et votre progression dans un
            espace simple et efficace.
          </p>
        </div>
      </div>

      <div className="auth-form-wrapper">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-header">
            <h2>Bon retour 👋</h2>
            <p>Connectez-vous à votre compte TaskFlow.</p>
          </div>

          {erreur && <div className="auth-error">{erreur}</div>}

          <div className="form-group">
            <label htmlFor="email">Adresse email</label>

            <div className="auth-input-wrapper">
              <Mail size={18} />

              <input
                id="email"
                type="email"
                placeholder="exemple@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="motDePasse">Mot de passe</label>

            <div className="auth-input-wrapper">
              <LockKeyhole size={18} />

              <input
                id="motDePasse"
                type={afficherMotDePasse ? "text" : "password"}
                placeholder="Votre mot de passe"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
              />

              <button
                type="button"
                className="auth-password-toggle"
                onClick={() =>
                  setAfficherMotDePasse(!afficherMotDePasse)
                }
                aria-label={
                  afficherMotDePasse
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                {afficherMotDePasse ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-full"
            disabled={chargement}
          >
            {chargement ? "Connexion..." : "Se connecter"}
          </button>

          <p className="auth-footer">
            Vous n'avez pas encore de compte ?{" "}
            <Link to="/inscription" className="auth-link">
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}