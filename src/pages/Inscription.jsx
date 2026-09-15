import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Inscription() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErreur("");

    if (motDePasse !== confirmation) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }

    if (motDePasse.length < 6) {
      setErreur(
        "Le mot de passe doit contenir au moins 6 caractères."
      );
      return;
    }

    setChargement(true);

    try {
      const verification = await fetch(
        `http://localhost:3000/utilisateurs?email=${encodeURIComponent(email)}`
      );

      const utilisateursExistants = await verification.json();

      if (utilisateursExistants.length > 0) {
        setErreur("Cette adresse email est déjà utilisée.");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/utilisateurs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nom,
            email,
            motDePasse
          })
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription");
      }

      const nouvelUtilisateur = await response.json();

      login(nouvelUtilisateur);

      navigate("/dashboard");
    } catch (error) {
      setErreur(
        "Impossible de créer le compte. Vérifie que json-server fonctionne."
      );
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

          <h1>Votre espace de travail, au même endroit.</h1>

          <p>
            Créez vos projets, ajoutez vos tâches et suivez votre
            progression simplement.
          </p>
        </div>
      </div>

      <div className="auth-form-wrapper">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-header">
            <h2>Créer un compte</h2>
            <p>Commencez à organiser vos projets avec TaskFlow.</p>
          </div>

          {erreur && <div className="auth-error">{erreur}</div>}

          <div className="form-group">
            <label htmlFor="nom">Nom complet</label>

            <div className="auth-input-wrapper">
              <User size={18} />

              <input
                id="nom"
                type="text"
                placeholder="Jean Dupont"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>
          </div>

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
                placeholder="Minimum 6 caractères"
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
              >
                {afficherMotDePasse ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmation">
              Confirmer le mot de passe
            </label>

            <div className="auth-input-wrapper">
              <LockKeyhole size={18} />

              <input
                id="confirmation"
                type={afficherMotDePasse ? "text" : "password"}
                placeholder="Répétez votre mot de passe"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-full"
            disabled={chargement}
          >
            {chargement ? "Création..." : "Créer mon compte"}
          </button>

          <p className="auth-footer">
            Vous avez déjà un compte ?{" "}
            <Link to="/connexion" className="auth-link">
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}