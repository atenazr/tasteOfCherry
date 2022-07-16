<template>
    
    <div class="button text-center" @click="$emit('clickButton')">
        <slot></slot>
    </div>


</template>

<script>
export default {
    emits:['clickButton'],
    props:[
        'text'
    ]

}
</script>

<style>
.button{
    background: #549DF2;
    border-radius: 100px;
    cursor: pointer;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size:1rem;
    line-height: 18.75px;
    color: #FFFFFF;
    padding: .5rem 1rem;
    transition: .3s ease-out;
}
.button:hover{
    box-shadow: 0 0 5px rgba(0,0,0,.45);
}

</style>