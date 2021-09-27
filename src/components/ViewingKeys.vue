<template>
  <div>
    <h2>Viewing Keys</h2>
    <p>{{ key }}</p>
    <p>{{ balance }}</p>
    <div class="container">
      <button @click="createViewingKey">Create Viewing Key</button>
      <button @click="getViewingKey">Get Viewing Key</button>
      <button @click="clear">Clear</button>
      <button @click="getBalance">Get Balance</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  keplrViewingKeyManager,
  refContract,
  Snip20Contract,
} from '@stakeordie/griptape.js';

export default defineComponent({
  setup() {
    const sefi = refContract<Snip20Contract>('sefi');
    const key = ref<string>();
    const balance = ref<string>();

    async function createViewingKey() {
      key.value = await keplrViewingKeyManager.add(sefi);
    }
    
    function getViewingKey() {
      key.value = keplrViewingKeyManager.get(sefi.at);
    }

    function clear() {
      key.value = '';
    }

    async function getBalance() {
      const res = await sefi.getBalance();
      balance.value = res.balance.amount;
    }

    return {
      key,
      createViewingKey,
      getViewingKey,
      clear,
      getBalance,
      balance
    }
  },
})
</script>
