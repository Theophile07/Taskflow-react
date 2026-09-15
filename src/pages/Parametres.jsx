import { useState } from "react";

import {
  User,
  Bell,
  Lock,
  Palette,
  Languages,
  LogOut,
  Trash2,
  ChevronRight
} from "lucide-react";

import ParametreSection from "../components/ParametreSection";
import ParametreModal from "../components/ParametreModal";


function Parametres() {

  // --------------------------------------------------
  // ÉTATS
  // --------------------------------------------------

  const [notifications, setNotifications] = useState(true);

  const [theme, setTheme] = useState("clair");

  const [langue, setLangue] = useState("fr");

  const [modal, setModal] = useState(null);


  // --------------------------------------------------
  // OUVRIR UN MODAL
  // --------------------------------------------------

  function ouvrirModal(type) {

    setModal(type);

  }


  // --------------------------------------------------
  // FERMER LE MODAL
  // --------------------------------------------------

  function fermerModal() {

    setModal(null);

  }


  // --------------------------------------------------
  // DÉCONNEXION
  // --------------------------------------------------

  function handleDeconnexion() {

    console.log("Déconnexion");

  }


  // --------------------------------------------------
  // RENDU
  // --------------------------------------------------

  return (

    <div className="settings-page">

      {/* ================================================
          HEADER
      ================================================= */}

      <div className="settings-header">

        <div>

          <p className="page-eyebrow">
            CONFIGURATION
          </p>

          <h1>
            Paramètres
          </h1>

          <p>
            Gérez votre profil, vos préférences et
            la sécurité de votre compte.
          </p>

        </div>

      </div>


      {/* ================================================
          PROFIL
      ================================================= */}

      <ParametreSection
        titre="Profil"
        description="Gérez les informations associées à votre compte."
      >

        <div className="settings-profile">

          <div className="settings-profile-left">

            <img
              src="/avatars/default.png"
              alt="Photo de profil"
              className="settings-avatar"
            />

            <div>

              <h3>
                Jean Dupont
              </h3>

              <p>
                jean@email.com
              </p>

            </div>

          </div>


          <button
            className="btn btn-secondary"
            onClick={() => ouvrirModal("profil")}
          >
            <User size={18} />

            Modifier
          </button>

        </div>

      </ParametreSection>


      {/* ================================================
          PRÉFÉRENCES
      ================================================= */}

      <ParametreSection
        titre="Préférences"
        description="Personnalisez votre expérience sur TaskFlow."
      >

        {/* LANGUE */}

        <div className="settings-row">

          <div className="settings-row-info">

            <div className="settings-row-icon">

              <Languages size={20} />

            </div>

            <div>

              <h3>
                Langue
              </h3>

              <p>
                Choisissez la langue utilisée dans
                l'application.
              </p>

            </div>

          </div>


          <select
            className="settings-select"
            value={langue}
            onChange={(event) => setLangue(event.target.value)}
          >

            <option value="fr">
              Français
            </option>

            <option value="en">
              English
            </option>

          </select>

        </div>


        {/* THÈME */}

        <div className="settings-row">

          <div className="settings-row-info">

            <div className="settings-row-icon">

              <Palette size={20} />

            </div>

            <div>

              <h3>
                Thème
              </h3>

              <p>
                Choisissez l'apparence de TaskFlow.
              </p>

            </div>

          </div>


          <select
            className="settings-select"
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
          >

            <option value="clair">
              Clair
            </option>

            <option value="sombre">
              Sombre
            </option>

            <option value="systeme">
              Système
            </option>

          </select>

        </div>


        {/* NOTIFICATIONS */}

        <div className="settings-row">

          <div className="settings-row-info">

            <div className="settings-row-icon">

              <Bell size={20} />

            </div>

            <div>

              <h3>
                Notifications
              </h3>

              <p>
                Recevoir des notifications concernant
                vos tâches et projets.
              </p>

            </div>

          </div>


          <button
            type="button"
            className={`settings-toggle ${
              notifications ? "active" : ""
            }`}
            onClick={() =>
              setNotifications(!notifications)
            }
            aria-label="Activer ou désactiver les notifications"
          >

            <span></span>

          </button>

        </div>

      </ParametreSection>


      {/* ================================================
          SÉCURITÉ
      ================================================= */}

      <ParametreSection
        titre="Sécurité"
        description="Protégez votre compte et vos informations."
      >

        {/* MOT DE PASSE */}

        <button
          type="button"
          className="settings-action-row"
          onClick={() => ouvrirModal("motDePasse")}
        >

          <div className="settings-row-info">

            <div className="settings-row-icon">

              <Lock size={20} />

            </div>

            <div>

              <h3>
                Modifier le mot de passe
              </h3>

              <p>
                Changez régulièrement votre mot de passe
                pour sécuriser votre compte.
              </p>

            </div>

          </div>


          <ChevronRight size={20} />

        </button>


        {/* DÉCONNEXION */}

        <button
          type="button"
          className="settings-action-row"
          onClick={handleDeconnexion}
        >

          <div className="settings-row-info">

            <div className="settings-row-icon">

              <LogOut size={20} />

            </div>

            <div>

              <h3>
                Déconnexion
              </h3>

              <p>
                Se déconnecter de votre compte TaskFlow.
              </p>

            </div>

          </div>


          <ChevronRight size={20} />

        </button>

      </ParametreSection>


      {/* ================================================
          ZONE DANGEREUSE
      ================================================= */}

      <ParametreSection
        titre="Zone dangereuse"
        description="Ces actions peuvent entraîner une perte définitive de données."
        danger={true}
      >

        <button
          type="button"
          className="settings-action-row settings-delete-row"
          onClick={() => ouvrirModal("supprimer")}
        >

          <div className="settings-row-info">

            <div className="settings-row-icon danger">

              <Trash2 size={20} />

            </div>

            <div>

              <h3>
                Supprimer mon compte
              </h3>

              <p>
                Supprimer définitivement votre compte,
                vos projets et vos tâches.
              </p>

            </div>

          </div>


          <ChevronRight size={20} />

        </button>

      </ParametreSection>


      {/* ================================================
          MODALES
      ================================================= */}

      <ParametreModal
        modal={modal}
        onClose={fermerModal}
      />

    </div>

  );

}


export default Parametres;