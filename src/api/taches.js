export async function recupererTache() {
    const resTache = await fetch("http://localhost:3000/taches")
    return resTache.json()
}