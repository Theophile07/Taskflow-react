import {
  X,
  Camera,
  Lock,
  AlertTriangle
} from "lucide-react";


export default function ParametreModal({
  modal,
  onClose
}) {


  // ==================================================
  // AUCUN MODAL
  // ==================================================

  if (!modal) {

    return null;

  }


  // ==================================================
  // RENDU
  // ==================================================

  return (

    <div
      className="modal-overlay"
      onClick={onClose}
    >


      {/* ==================================================
          CONTENU DU MODAL
      ================================================== */}

      <div
        className="settings-modal"
        onClick={(event) => event.stopPropagation()}
      >


        {/* ==================================================
            MODIFIER LE PROFIL
        ================================================== */}

        {modal === "profil" && (

          <>

            {/* HEADER */}

            <div className="modal-header">

              <div>

                <h2>
                  Modifier mon profil
                </h2>

                <p>
                  Modifiez les informations de votre compte.
                </p>

              </div>


              <button
                type="button"
                className="modal-close"
                onClick={onClose}
                aria-label="Fermer"
              >

                <X size={20} />

              </button>

            </div>


            {/* BODY */}

            <div className="modal-body">


              {/* PHOTO */}

              <div className="profile-photo-editor">

                <div className="profile-photo-wrapper">

                  <img
                    src="/avatars/default.png"
                    alt="Photo de profil"
                  />


                  <button
                    type="button"
                    className="profile-photo-button"
                  >

                    <Camera size={16} />

                  </button>

                </div>


                <div>

                  <strong>
                    Photo de profil
                  </strong>

                  <p>
                    JPG, PNG ou WEBP.
                    2 Mo maximum.
                  </p>

                </div>

              </div>


              {/* NOM */}

              <div className="form-group">

                <label htmlFor="nom">

                  Nom

                </label>


                <input
                  id="nom"
                  className="input"
                  type="text"
                  defaultValue="Jean Dupont"
                />

              </div>


              {/* EMAIL */}

              <div className="form-group">

                <label htmlFor="email">

                  Adresse email

                </label>


                <input
                  id="email"
                  className="input"
                  type="email"
                  defaultValue="jean@email.com"
                />

              </div>

            </div>


            {/* FOOTER */}

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >

                Annuler

              </button>


              <button
                type="button"
                className="btn btn-primary"
                onClick={onClose}
              >

                Enregistrer

              </button>

            </div>

          </>

        )}


        {/* ==================================================
            MODIFIER LE MOT DE PASSE
        ================================================== */}

        {modal === "motDePasse" && (

          <>

            {/* HEADER */}

            <div className="modal-header">

              <div>

                <h2>
                  Modifier le mot de passe
                </h2>

                <p>
                  Choisissez un nouveau mot de passe sécurisé.
                </p>

              </div>


              <button
                type="button"
                className="modal-close"
                onClick={onClose}
                aria-label="Fermer"
              >

                <X size={20} />

              </button>

            </div>


            {/* BODY */}

            <div className="modal-body">


              {/* ICÔNE */}

              <div className="modal-info-icon">

                <Lock size={22} />

              </div>


              {/* ANCIEN MOT DE PASSE */}

              <div className="form-group">

                <label htmlFor="ancienMotDePasse">

                  Mot de passe actuel

                </label>


                <input
                  id="ancienMotDePasse"
                  className="input"
                  type="password"
                  placeholder="Votre mot de passe actuel"
                />

              </div>


              {/* NOUVEAU MOT DE PASSE */}

              <div className="form-group">

                <label htmlFor="nouveauMotDePasse">

                  Nouveau mot de passe

                </label>


                <input
                  id="nouveauMotDePasse"
                  className="input"
                  type="password"
                  placeholder="Votre nouveau mot de passe"
                />

              </div>


              {/* CONFIRMATION */}

              <div className="form-group">

                <label htmlFor="confirmationMotDePasse">

                  Confirmer le mot de passe

                </label>


                <input
                  id="confirmationMotDePasse"
                  className="input"
                  type="password"
                  placeholder="Confirmez votre nouveau mot de passe"
                />

              </div>

            </div>


            {/* FOOTER */}

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >

                Annuler

              </button>


              <button
                type="button"
                className="btn btn-primary"
                onClick={onClose}
              >

                Modifier le mot de passe

              </button>

            </div>

          </>

        )}


        {/* ==================================================
            SUPPRIMER LE COMPTE
        ================================================== */}

        {modal === "supprimer" && (

          <>

            {/* HEADER */}

            <div className="modal-header">

              <div>

                <h2>
                  Supprimer mon compte
                </h2>

                <p>
                  Cette action est définitive.
                </p>

              </div>


              <button
                type="button"
                className="modal-close"
                onClick={onClose}
                aria-label="Fermer"
              >

                <X size={20} />

              </button>

            </div>


            {/* BODY */}

            <div className="modal-body">


              {/* AVERTISSEMENT */}

              <div className="delete-warning">

                <div className="delete-warning-icon">

                  <AlertTriangle size={24} />

                </div>


                <div>

                  <h3>
                    Êtes-vous sûr ?
                  </h3>


                  <p>
                    La suppression de votre compte entraînera
                    la suppression de vos projets, tâches et
                    autres données. Cette action ne pourra pas
                    être annulée.
                  </p>

                </div>

              </div>


              {/* CONFIRMATION */}

              <div className="form-group">

                <label htmlFor="confirmationSuppression">

                  Pour confirmer, saisissez

                  <strong>
                    {" "}SUPPRIMER
                  </strong>

                </label>


                <input
                  id="confirmationSuppression"
                  className="input"
                  type="text"
                  placeholder="SUPPRIMER"
                />

              </div>

            </div>


            {/* FOOTER */}

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >

                Annuler

              </button>


              <button
                type="button"
                className="btn btn-danger"
              >

                Supprimer définitivement

              </button>

            </div>

          </>

        )}

      </div>

    </div>

  );

}