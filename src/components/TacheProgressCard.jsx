
export default function TaskProgressChart({total, termine, enCours, aFaire }) {
  const calculPourcentage = (valeur) => {
    if(total === 0) return 0;
    return Math.round((valeur / total) * 100)
  }
  const statuts = [
    {
      label: "À faire",
      value: calculPourcentage(aFaire),
      className: "todo"
    },
    {
      label: "En cours",
      value: calculPourcentage(enCours),
      className: "progress"
    },
    {
      label: "Terminées",
      value: calculPourcentage(termine),
      className: "completed"
    }]
  return (
    <div className="task-chart">

      {statuts.map((statut) => (
        <div
          key={statut.label}
          className="chart-column"
        >

          <span className="chart-value">
            {statut.value}%
          </span>

          <div className="chart-bar">

            <div
              className={`chart-fill ${statut.className}`}
              style={{ height: `${statut.value}%` }}
            ></div>

          </div>

          <span className="chart-label">
            {statut.label}
          </span>

        </div>
      ))}

    </div>
  );
}