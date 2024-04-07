<script lang="ts" setup>
import { ref } from 'vue';


const isActive = ref(false)
const transitionName = 'font-resize'


</script>

<template>
    <Transition
        enter-active-class="transition duration-150">
    <div>
        <span class="text-9xl">Hello </span> <span class="text-9xl font-mono font-bold"> USER</span>

    </div>

    </Transition>
</template>

<style scoped>
div {
  font-family: "Oswald", sans-serif;
}

/* Custom transition class for font size */
.font-resize-enter-active, .font-resize-leave-active {
  transition: font-size 150ms;
}

.font-resize-enter-from, .font-resize-leave-to {
  font-size: 4.5rem; /* Tailwind text-9xl equivalent */
}

.font-resize-enter-to, .font-resize-leave-from {
  font-size: 0.875rem; /* Tailwind text-2xl equivalent */
}
</style>
