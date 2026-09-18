const API_URL = "http://localhost:3000"

export async function recupererProjet() {
    const resProjet = await fetch(`${API_URL}/projets`)
    return resProjet.json()
}
export async function recupererProjetParId(id) {
    const resProjet = await fetch(`${API_URL}/projets/${id}`)
    return resProjet.json()
}

export async function ajouterProjet(projet) {
    const resProjet = await fetch(`${API_URL}/projets`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projet)

        }
    )
    return resProjet.json()
}

export async function modifierProjet(id, projet) {
    const resProjet = await fetch(
        `${API_URL}/projets/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projet)
        }
    )
    return resProjet.json()
}

export async function supprimerProjet(id) {
    await fetch(
        `${API_URL}/projets/${id}`,
        {
            method: "DELETE"
        }
    )
}