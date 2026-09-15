export default function ProjetAvancement({ nom, progression, couleur }) {
  return (
    <div className="project-progress">

      <div className="project-progress-header">

        <div className="project-info">
          <span
            className="project-dot"
            style={{ backgroundColor: couleur }}
          ></span>

          <div>
            <h4>{nom}</h4>
            <p>Avancement du projet</p>
          </div>
        </div>

        <span className="project-progress-value">
          {progression}%
        </span>

      </div>

      <div className="project-progress-bar">

        <div
          className="project-progress-fill"
          style={{
            width: `${progression}%`,
            backgroundColor: couleur
          }}
        ></div>

      </div>

    </div>
  );
}