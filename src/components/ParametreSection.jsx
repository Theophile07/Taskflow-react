function ParametreSection({
  titre,
  description,
  children,
  danger = false
}) {
  return (
    <section
      className={`settings-section ${
        danger ? "settings-section-danger" : ""
      }`}
    >
      <div className="settings-section-header">
        <div>
          <h2>{titre}</h2>

          {description && (
            <p>{description}</p>
          )}
        </div>
      </div>

      <div className="settings-section-content">
        {children}
      </div>
    </section>
  );
}

export default ParametreSection;