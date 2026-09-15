const statuts = [
  {
    label: "À faire",
    value: 25,
    className: "todo"
  },
  {
    label: "En cours",
    value: 30,
    className: "progress"
  },
  {
    label: "Terminées",
    value: 45,
    className: "completed"
  }]

export default function TaskProgressChart() {
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