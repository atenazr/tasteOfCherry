<template>

      <base-page v-if="movie">

          <template v-slot:box>
            <!-- box -->
              <base-button @clickButton="backHome" class="flex items-center">
                <span class="material-symbols-outlined mr-1">
                keyboard_backspace
                </span>
                <span>
                  Back
                </span>
              </base-button>

              <a :href="homeLink" target="_blank" class="title flex flex-col ml-16 mr-auto">
                <span class="leading-5 text-lg font-bold">
                    {{ title }}
                </span>
                <span class="leading-5 text-lg mt-1.5">
                    {{ tagline }}
                </span>
              </a>

          </template>

          <template v-slot:content>
            <!-- content -->
            <div v-if="isLoading">
                  <base-spinner></base-spinner>
            </div>
            
            <div v-else class="my-16 py-3.5">
              <!-- lead section -->
                  <div class="flex flex-row items-start justify-between">

                    <div class="cover" >
                      <img :src="img" alt="ttt" >
                    </div>

                    <div class="info">

                        <base-item-info>

                              <template v-slot:name>
                                  Budget
                              </template>
                              <template v-slot:value>
                                  $ {{ budget }}
                              </template>

                        </base-item-info>

                        <base-item-info>

                              <template v-slot:name>
                                  Revenue
                              </template>
                              <template v-slot:value>
                                  $ {{ revenue }}
                              </template>

                        </base-item-info>

                        <base-item-info>

                              <template v-slot:name>
                                  Release Date
                              </template>
                              <template v-slot:value>
                                  {{ releaseDate }}
                              </template>

                        </base-item-info>

                        <base-item-info>

                              <template v-slot:name>
                                  Runtime
                              </template>
                              <template v-slot:value>
                                  {{ runtime }}
                              </template>

                        </base-item-info>

                        <base-item-info>

                              <template v-slot:name>
                                  Score
                              </template>
                              <template v-slot:value>
                                    <span>
                                      {{ voteAverage }}
                                    </span>
                                    <span class="sub-item">
                                      ( {{voteCount}} votes )
                                    </span>
                              </template>

                        </base-item-info>

                        <base-item-info>

                              <template v-slot:name>
                                  Genres
                              </template>
                              <template v-slot:value>
                                  {{ genres }}
                              </template>

                        </base-item-info>

                        <base-item-info>

                              <template v-slot:name>
                                  IMDB Link
                              </template>
                              <template v-slot:value>
                                  <a :href="imdbLink">link</a>
                              </template>

                        </base-item-info>

                        <base-item-info>

                              <template v-slot:name>
                                  Homepage Link
                              </template>
                              <template v-slot:value>
                                  <a :href="homeLink">link</a>
                              </template>

                        </base-item-info>

                    </div>

                </div>

              <!-- description section -->
                  <div class="description">
                    {{ overview }}
                  </div>

              <!-- credits section -->
                  <div class="">
                    <div class="text-lg font-bold mb-3">
                      Credit :
                    </div>
                    <div class="credits text-sm">
                      {{ credits }}
                    </div>
                  </div>
                  
            </div>

          </template>
      
      </base-page>

</template>

<script>
export default {
    data(){
      return{
        id : 0,
        movie:null,
        isLoading:false
      }
    },
    async created(){

        this.isLoading = true;
        try{
          this.id = this.$route.params.id;
          await this.$store.dispatch('getTheMovie',{id:this.id});
          await this.$store.dispatch('getCreditMovie',{id:this.id});
          
          this.movie = this.$store.getters.theMovie;
          // console.log('movie',this.movie);
        }catch(err){
          console.log('err',err)
        }
        this.isLoading = false
    
    },
    methods:{
      backHome(){
        this.$router.push({path:'/home'});
      },
      convertNumber(price){
        let dollarUSLocale = Intl.NumberFormat('en-US');
        return dollarUSLocale.format(price);
      },
      toHoursAndMinutes(totalMinutes) {
          const minutes = totalMinutes % 60;
          const hours = Math.floor(totalMinutes / 60);

          return `${hours}h ${this.padTo2Digits(minutes)}m`;
      },
      padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
    },
    computed:{
      title(){
        return this.movie.title
      },
      tagline(){
        return this.movie.tagline
      },
      budget(){
        let budget = this.convertNumber(this.movie.budget);
        return budget;
      },
      revenue(){
        let revenue = this.convertNumber(this.movie.revenue);
        return revenue;
      },
      releaseDate(){
        return this.movie.release_date;
      },
      runtime(){
        return this.toHoursAndMinutes(this.movie.runtime);
      },
      voteAverage(){
        return this.movie.vote_average;
      },
      voteCount(){
        return this.movie.vote_count;
      },
      genres(){
        // console.log('genres',this.movie.genres)
        let genres = [];
        this.movie.genres.forEach(element => {
            genres.push(element.name)
        });
        return String(genres.join(', '));
      },
      imdbLink(){
        return this.movie.imdbLink;
      },
      homeLink(){
        return this.movie.homepage;
      },
      overview(){
        return this.movie.overview;
      },
      img(){
        return this.movie.img;
      },
      credits(){
        return String(this.movie.credits.join(', '));
      }
    }
}
</script>

<style scoped>
.box{
  justify-content: start;
  padding-left: 35px;
  width: 100%;
}
.button .material-symbols-outlined{
  font-size: 16px;
  line-height: 18px;
}


.cover{
  width: 330px !important;
  height: 495px;
}
.cover img{
  border-radius: 12px;
  height: 100%;
  width: 100% !important;
  object-fit: cover;
}
.info{
  width: 606px;
  margin:0 18px 0 70px;
  padding: 25px 0;
  color:#151515;
}
.info .item{
  margin-bottom: 18px;
}
.info .item a{
  text-decoration: underline;
  color:#62a9ec;
}
.info .item .sub-item{
  font-size: 14px;
}

.description{
  margin: 53px 0 80px 7px;
  font-size: 16px;
  line-height: 22px;
  color: #1E1E1E;
}

.credits{
  color:#1E1E1E;
}

</style>