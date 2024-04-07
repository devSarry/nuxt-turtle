<template>
  <div class="flex-grow flex items-center justify-center min-h-24">
    <div class="login-element">
      <!-- Use a div to wrap the text and control its size and alignment -->
      <div :class="inputActive ? 'text-2xl' : 'text-6xl md:text-9xl'" class="transition-all duration-250 ease-out">
        <span>Hello </span>
        <span class="font-mono font-bold">USER</span>
      </div>

      <h2 :class="!inputActive ? 'text-sm' : 'text-5xl md:text-6xl'"
        class="transition-all duration-250 ease-in pt-4 pb-2">What's your name?</h2>
      <form  @focusin="inputActive = true" @focusout="inputActive = false" @submit.prevent="handleUser" class="relative">
        <input type="text" v-model="user"
          class="py-2 input input-bordered w-full input-accent">
        <button type="submit"
          class="absolute inset-y-0 top-2 right-2  flex items-center btn btn-sm btn-accent  btn-circle">
          <ArrowRightIcon  class="p-1 text-blue-400"  />
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { ArrowRightIcon } from '@heroicons/vue/24/solid'
import { UserCollection, pbClient } from '../pocketbase/client';

const user = ref('');
const inputActive = ref(false);
const handleUser = async (e: Event) => {
  console.log(user.value)
  const data = await $fetch('/api/CreateUser',
  {
    method: 'POST',
    body: JSON.stringify({ user: user.value }),
  });

  if (data) {
    const authData  = await UserCollection.authWithPassword(data, '12345678');

    console.log(authData)

    console.log(pbClient.authStore.isValid);
    console.log(pbClient.authStore.token);
    }
  }
  


</script>

<style scoped>
div {
  font-family: "Oswald", sans-serif;
}
</style>
