<template>
    <div class="base-page">

        <div class="box flex flex-row justify-center items-center">
            <slot name="box"></slot>
        </div>

        <div>
            <slot name="content"></slot>
        </div>

    </div>



</template>

<script>
export default {

}
</script>

<style>
.base-page{
    margin:0 13rem;
}

.box{
    margin: 117px 0;
    padding: 27px 62px 25px 62px;
    background-color: #E2E2E2;
    border-radius: 6px;
}

</style>