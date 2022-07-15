const url_movies = 'https://api.themoviedb.org/3/discover/movie?api_key=';
const api_key = 'f62f750b70a8ef11dad44670cfb6aa57';
const url_img = 'https://image.tmdb.org/t/p/original';
const url_genres='https://api.themoviedb.org/3/genre/movie/list?api_key=';
const url_the_movie = 'https://api.themoviedb.org/3/movie';
const url_imdb = 'https://www.imdb.com/';


const actions ={

    async loadMovies(context){

            const response = await fetch(
            `${url_movies}${api_key}`
            );

            const responseData = await response.json();
            // console.log('response',responseData.results);

            if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
            }

            const movies = [];
            const genres = context.getters.genres;
            for (const key in responseData.results) {

                const img_path = url_img+responseData.results[key].backdrop_path;
                
                let tempG = [];
                responseData.results[key].genre_ids.forEach(genre => {
                    let index = genres.findIndex(x => x.id === genre);
                    tempG.push(genres[index].name);
                });

                const movie = {
                    ...responseData.results[key],
                    backdrop_path:img_path,
                    genres:tempG
                };
                
                movies.push(movie);
            }

            console.log('movies',movies);
            context.commit('setMovies', movies);
    },

    async loadGenres(context){

        const response = await fetch(
            `${url_genres}${api_key}&language=en-US`
            );

            const responseData = await response.json();
            // console.log('response',responseData.results);

            if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
            }

            context.commit('setGenres',responseData.genres);

    },

    async getTheMovie(context,payload){

        const response = await fetch(
            `${url_the_movie}/${payload.id}?api_key=${api_key}&language=en-US`
            );

            const responseData = await response.json();
            console.log('response',responseData);

            if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
            }

            let imdbLink = `${url_imdb}/${responseData.imdb_id}/`
            let img = `${url_img}${responseData.backdrop_path}`
            const movie = {
                ...responseData,
                imdbLink:imdbLink,
                img:img
            } 

            context.commit('setTheMovie',movie);
    },

    async getCreditMovie(context,payload){

        const response = await fetch(
            `${url_the_movie}/${payload.id}/credits?api_key=${api_key}&language=en-US`
            );

            const responseData = await response.json();
            // console.log('response credi',responseData);

            if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
            }

            responseData.cast.sort(function(a, b) {
                                         let pa = a.popularity;
                                         let pb = b.popularity;
                                         if (pa < pb) return -1;
                                         if (pa > pb) return 1;
                                         return 0;   
                                        });
            
            let sortArr = responseData.cast.slice(-10);
            let credits = [];
            for (const key in sortArr) {
                let element = sortArr[key].name;
                credits.push(element);
            }
            console.log('sort',credits);

            context.commit('addCredit',credits.reverse());
    }

}

export default actions;