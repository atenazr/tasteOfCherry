<template>
        <base-page>

            <!-- search box -->
            <template v-slot:box >

                    <div class="search-input flex flex-row">
                        <div @click="seearchMovie" class="mr-7 text-base leading-5">
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
                            <span 
                                @click="prevPage"
                                class="prev-next text-right text-base font-bold">
                                Previuos Page
                            </span>
                            <span class="line mx-7 border-r-2">
                            </span>
                            <span 
                                @click="nexPage"
                                class="prev-next text-left text-base  font-bold">
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

            console.log('home c1',this.$store.getters.movies);
            this.movies = this.$store.getters.movies;

            if( this.movies.length === 0){
                    this.isLoading = true;
                    try{
                        await this.$store.dispatch('loadGenres');
                        await this.$store.dispatch('loadMovies');
                        this.movies = await this.$store.getters.movies;
                        console.log('home',this.movies);
                    }catch(error){
                        console.log('error',error);
                    }
                    this.isLoading =false;
            }
    },
    data(){
        return{
            movies:[],
            rangeFrom:[],
            rangeTo:[],
            resultSearch:[],
            isLoading:false,
            indexPage:1,
            pageSize:12,
            modeSch:false
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
                let start = (this.indexPage - 1) * this.pageSize + 1;
                let end = start + length - 1;
                return `${start} - ${end}`;
            }
            else{
                return 'no items'
            }
        },
        showMovies(){
            if(this.rangeFrom.length && this.rangeTo.length && this.modeSch){
                return this.paginate(this.resultSearch,this.pageSize,this.indexPage);
            }
            else{
                return this.paginate(this.movies,this.pageSize,this.indexPage);
            }
        }
    },
    methods:{
        prevPage(){
            if(this.indexPage === 1){
                return
            }else{
                this.indexPage = this.indexPage - 1;
            }
        },
        nexPage(){
            if( (this.indexPage * this.pageSize ) >= this.movies.length){
                return
            }else{
                this.indexPage = this.indexPage + 1;
            }
        },
        paginate(array, page_size, page_number) {
            // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
            return array.slice((page_number - 1) * page_size, page_number * page_size);
        },
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

            this.modeSch = true;

        },
        clearRange(){
           this.rangeFrom = [];
           this.rangeTo = []; 
           this.modeSch = false;
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
.mx-datepicker-range{
    width: 221px;
}
.search-input input{
    /* width: 221px; */
    background: #FFFFFF;
    border: 1px solid #CFCFCF;
    height: 33px;
}

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
.pagination .prev-next:hover{
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