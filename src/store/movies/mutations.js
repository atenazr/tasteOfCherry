const mutations ={
    setMovies(state,payload){
        state.movies = payload;
    },
    setGenres(state,payload){
        state.genres = payload;
    },
    setTheMovie(state,payload){
        state.theMovie = payload;
    },
    addCredit(state,payload){
        state.theMovie = {
            ...state.theMovie,
            credits:payload
        }
    }

}

export default mutations;