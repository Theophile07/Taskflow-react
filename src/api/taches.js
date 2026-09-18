const API_URL = "http://localhost:3000"


export async function recupererTache() {
    const resTache = await fetch(`${API_URL}/taches`)
    return resTache.json()
}

export async function recupererTacheParId(id) {
    const resTache = await fetch (`${API_URL}/taches/${id}`)
    return resTache.json()
    
}

export async function recupererTacheProjet(projetId) {
    const resTache = await fetch(`${API_URL}/taches?projetId=${projetId}`)
    return resTache.json()
}

export async function ajouterTache(tache) {
    const resTache = await fetch(`${API_URL}/taches`,
        {
            method: "POST",
            headers:{
                "Content-Type": "applicstion/json"
            },
            body: JSON.stringify(tache)
        }
    )
    return resTache.json()
}

export async function modifierTache(id, tache) {
    const resTache = await fetch(`${API_URL}/taches/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tache)
        }
    )
    return resTache.json()
}

export async function supprimerTache(id) {
    await fetch(
        `${API_URL}/taches/${id}`,
        {
            method: "DELETE"
        }
    )
}