<template>
  
        <div class="item flex flex-row items-center justify-between">

                <span class="font-bold text-base leading-5">
                    <slot name="name"></slot>
                </span>
                <span class="text-base leading-5">
                   <slot name="value"></slot>
                </span>

        </div>

</template>

<script>
export default {

}
</script>

<style>

</style>