<template>
        <base-page>

            <!-- search box -->
            <template v-slot:box >

                    <div class="search-input flex flex-row">

                        <div @click="seearchMovie">
                            Search by release date :
                        </div>
                        <!-- <input type="date"> -->
                        <date-picker  @rangeDate="setRangeSearch" @clearRange="clearRange"/>

                    </div>

                    <base-button @clickButton="searchMovie" class="ml-auto">
                    Search</base-button>

            </template>

            <!-- results - list of movies   -->
            <template v-slot:content>
                <div>

                    <div class="loading" v-if="isLoading">
                        <base-spinner></base-spinner>
                    </div>

                    <div class="results grid grid-cols-3 gap-y-8 gap-x-16" v-else>

                        <single-movie 
                            v-for="movie in showMovies"
                            :key="movie.id"
                            :movie="movie"></single-movie>

                    </div>

                    <!-- pagination -->
                    <div class="pagination flex flex-col items-center justify-center">

                        <div class="h-max">
                            <span class="prev-next text-right text-base font-bold">
                                Previuos Page
                            </span>
                            <span class="line mx-7 border-r-2">
                            </span>
                            <span class="prev-next active text-left font-bold">
                                Next Page
                            </span>
                        </div>

                        <div class="num-results my-6">
                            Showing results {{ numberResults }}
                        </div>

                    </div>
                
                </div>
            </template>

        </base-page>
</template>

<script>
import singleMovie from '../components/singleMovie.vue'
import datePicker from '../components/datePicker.vue' 
import BasePage from '@/components/UI/basePage.vue';

export default {
    async created(){
       
        this.isLoading = true;
        try{
            await this.$store.dispatch('loadGenres');
            await this.$store.dispatch('loadMovies');
            this.movies = await this.$store.getters.movies;
            // console.log('home',this.movies);
        }catch(error){
            console.log('error',error);
        }
        this.isLoading =false;
    },
    data(){
        return{
            movies:[],
            rangeFrom:[],
            rangeTo:[],
            resultSearch:[],
            isLoading:false
        }
    },
    components:{
       singleMovie,
       datePicker,
        BasePage
    },
    computed:{
        numberResults(){
            let length = this.showMovies.length;
            if( length){
                return `1 - ${length}`;
            }
            else{
                return 'no items'
            }
        },
        showMovies(){
            if( this.rangeFrom.length === 0  && this.rangeTo.length === 0 ){
                return this.movies;
            }else{
                return this.resultSearch;
            }
        }
    },
    methods:{
        setRangeSearch(date){
            // console.log('date',date);
            this.rangeFrom = date[0].split("-");
            this.rangeTo = date[1].split("-");
            console.log('date',this.rangeFrom);
        },
        searchMovie(){
            let temp = [];

            this.movies.forEach(movie => {
                const relDate = movie.release_date.split("-")

                var from = new Date(this.rangeFrom[0], parseInt(this.rangeFrom[1])-1, this.rangeFrom[2]);  // -1 because months are from 0 to 11
                var to   = new Date(this.rangeTo[0], parseInt(this.rangeTo[1])-1, this.rangeTo[2]);
                var check = new Date(relDate[0], parseInt(relDate[1])-1, relDate[2]);

                // console.log('movie',relDate,this.rangeTo,this.rangeFrom)
                if(check > from && check < to){
                    console.log(check > from && check < to);
                    temp.push(movie);
                }
            });
            this.resultSearch = temp;

        },
        clearRange(){
           this.rangeFrom = [];
           this.rangeTo = []; 
        }
    }
}
</script>

<style>

.search-input{
     justify-content: center;
    align-items: center;
}
.search-input span{
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
    margin-right: 29px;
}

.search-input input{
    /* width: 221px; */
    background: #FFFFFF;
    border: 1px solid #CFCFCF;
    height: 33px;
}

/* .button{
    background: #549DF2;
    border-radius: 100px;
    width:74px;
    height:33px;
    cursor: pointer;
}

.button span{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    margin: 12px 7px;
    color: #FFFFFF;
} */

.results{
    padding: 2px 5px;
}

.pagination{
    margin: 10rem auto 4rem;
}
.pagination .prev-next{
    line-height: 18.75px;
    color: rgba(0,0,0,.48);
    cursor: pointer;
}
.pagination .prev-next.active{
    color:#318FE7;
}
.pagination .num-results{
    color:#989898;
    font-size: 1rem;
    line-height: 18.75px;
}
.pagination .line{
    border-color: #6A6A6A;
    padding: 10px 0;
}

</style>