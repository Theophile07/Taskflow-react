export async function recupererProjet() {
    const resProjet = await fetch("http://localhost:3000/projets")
    return resProjet.json()
}