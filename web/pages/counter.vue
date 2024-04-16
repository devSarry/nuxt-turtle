<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { UserCollection, CounterCollection } from '../pocketbase/client';
import type { CountsResponse, UsersResponse } from '../server/types/pocketbase-types';

const count = ref(0);

const counters = ref<CountsResponse<UsersResponse>[]>([]);

const availableUser = useUserStore();



onMounted(async () => {

  console.log('mounted')

  const players = await CounterCollection.getFullList({ "expand": "user_id" });

  const users = await UserCollection.getFullList();

  counters.value = players.map(p => {
    const user = users.find(u => u.id === p.user_id);
    return { ...p, expand: user }
  })

  const playerCounts = CounterCollection.subscribe('*', async (e) => {
    if (e.action === 'update') {
      counters.value = counters.value.map((c, index) => {

        if (c.user_id === e.record.user_id) {
          return { ...c, value: e.record.value }
        }
        return c;
      });
    }

    if (e.action === 'create') {
      const user = await UserCollection.getOne(e.record.user_id);
      counters.value.push({ ...e.record, expand: user });
    }
  })

});


const onClick = async () => {
  const player = counters.value.find(p => p.user_id === availableUser.value.id);
  await CounterCollection.update(availableUser.value.countRecord?.id!, { value: player!.value + 1 });
}

</script>

<template>
  <div class="self-center min-w-96">
    <div class="player-list flex card flex-row min-h-96 max-h-96  overflow-auto bg-white shadow-xl">
      <table class="table">
        <tbody class="text-slate-500">
          <tr v-for="user in counters" :key="user.id">
            <td>{{ user.expand?.name }}</td>
            <td>{{ user.value }}</td>
          </tr>
        </tbody>
      </table>


    </div>
    <div class="action-area mt-4">
      <button @click="onClick" class="btn btn-primary">Click!</button>
    </div>
  </div>
</template>

<style scoped></style>
