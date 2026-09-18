const formatStatut = {
  a_faire: "À faire",
  en_cours: "En cours",
  terminee: "Terminée",
};
export default function TacheRecente({ titre, nomProjet, couleurProjet, priorite, echeance, statut }) {
  return (
    <tr>
      <td>{titre}</td>

      <td>
        <div className="task-project">
          <span className="project-dot" style={{backgroundColor: couleurProjet}}>
          </span>

          <span>
            {nomProjet}
          </span>
        </div>

      </td>

      <td>
        <span className={`badge badge-priority-${priorite}`}>
          {priorite}
        </span>
      </td>

      <td>{echeance}</td>

      <td>
        <span className={`badge badge-status-${statut}`}>
          {formatStatut[statut] || statut}
          {/* {statut.replace("_", " ")} */}
        </span>
      </td>
    </tr>
  );
}