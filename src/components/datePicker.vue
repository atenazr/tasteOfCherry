<script>
  import DatePicker from 'vue-datepicker-next';
  import 'vue-datepicker-next/index.css';

  export default {
    components: { DatePicker },
    emits:['rangeDate','clearRange'],
    data() {
      return {
        time3: '09/10/2019',
      };
    },
    methods:{
        confirmDate(date){
            // console.log('ddd',this.time3);
            // console.log('date',date);
            this.$emit('rangeDate',date);
        }
    }
  };
</script>

<template>
  <div>
    <date-picker 
      v-model:value="time3" 
      valueType="format" 
      range 
      confirm 
      @confirm="confirmDate"
      @clear="$emit('clearRange')"></date-picker>
  </div>
</template>