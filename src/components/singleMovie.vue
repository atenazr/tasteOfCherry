<template>

  <router-link :to="link" class="single-movie">

      <div class=" flex flex-row h-full">

          <div class="poster flex-none h-full"  >
              <img :src="movieP.backdrop_path" alt="tttt" class="h-full" />
          </div>

          <div class="info flex flex-col my-4 ml-4 mr-8 h-full">

            <div class="title text-base font-bold">
                {{ movie.title }}
            </div>

            <div class="release-date flex flex-row items-center justify-start mt-auto">
              <span class="material-symbols-outlined text-xs">
                calendar_today
              </span>
              <span class="text-xs">
                {{ movie.release_date }}
              </span>
            </div>

            <div class="genres flex flex-wrap mt-4 mb-7">
                <span class="text-xs"
                      v-for="(genre,index) in movie.genres"
                      :key="genre">
                      <span v-if="!(index === 0)"
                      class="material-symbols-outlined">
                      fiber_manual_record
                      </span>
                      {{ genre }}
                    
                </span>
            </div>

          </div>

      </div>

  </router-link>
  
</template>

<script>
// import VLazyImage from "v-lazy-image";
export default {
  props:['movie'],
  data(){
    return{
        srcImg:null,
        movieP:this.movie
    }
  },
  computed:{
    link(){
      return this.$route.path +'/'+ this.movieP.id
    }
  }
  
}
</script>

<style scoped>
.single-movie{
  padding: 3px 4px;
  border-radius:4px;
  background-color: #f1f1f1;
  border: 1px solid #C4C4C4;
  height:200px;
  cursor: pointer;
  transition: .3s ease-out;

}
.single-movie:hover{
  box-shadow: 0 0 8px rgba(0,0,0,.75);
}

.poster{
  width: 128px !important;
  overflow: hidden; 
}
.poster img{
    border-radius: 6px 0px 0px 6px;
    transition: .3s ease-out;
}
.poster:hover img{
    transform: scale(1.1);
}

.title{
  line-height: 18.75px;
}
.release-date{
  line-height: 14px;
  color:#4E4E4E;
}
.genres{
  line-height: 14px;
  color:#505050;
}
.genres .material-symbols-outlined{
  font-size: 4px;
  color:#505050;
}

</style>