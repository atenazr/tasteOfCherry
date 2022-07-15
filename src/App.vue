<template>
  <div id="app" class="">

      <div class="top-bar"></div> 

      <div>
          <router-view v-slot="slotProps">
            <transition  name="route" mode="out-in">
              <component :is="slotProps.Component"></component>
            </transition>
        </router-view>
      </div>

  </div>

</template>

<script>

export default {
  name: 'App'
  // ,
  // async created(){
  //   await this.$store.dispatch('loadMovies')
  // }
}
</script>

<style scoped>
*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}
#app{
  width: 1440px;
}
.top-bar{
  width: 100%;
  height: 3rem;
  background-color: #11B980;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
