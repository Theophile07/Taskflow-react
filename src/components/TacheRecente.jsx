export default function TacheRecente({ titre, projet, priorite, echeance, statut }) {
  return (
    <tr>
      <td>{titre}</td>

      <td>{projet}</td>

      <td>
        <span className={`badge badge-priority-${priorite}`}>
          {priorite}
        </span>
      </td>

      <td>{echeance}</td>

      <td>
        <span className={`badge badge-status-${statut}`}>
          {statut.replace("_", " ")}
        </span>
      </td>
    </tr>
  );
}