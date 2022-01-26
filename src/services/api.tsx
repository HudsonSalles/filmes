import axios from 'axios';

//URL FILMES EM CARTAZ:
// /movie/now_playing ?api_key=4dfb99791a668162b19c432d58d409c3 &language=pt-BR

export const key = "4dfb99791a668162b19c432d58d409c3";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});

export default api;
