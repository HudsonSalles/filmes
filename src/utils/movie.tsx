// Gerar uma lista de filmes com tamanho que eu desejar

export function getListMovies(size: any, movies: any) {
    let popularMovies = [];

    for (let i = 0, l = size; i < l; i++) {
        popularMovies.push(movies[i])
    }

    return popularMovies;
}