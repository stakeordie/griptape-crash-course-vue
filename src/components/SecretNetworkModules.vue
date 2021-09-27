<template>
  <div>
    <h2>Secret Network modules</h2>

    <div class="container">
      <select v-model="module">
        <option value="DISTRIBUTION">Distribution (getCommunnityPoolParameters)</option>
        <option value="BANK">Bank (getBalance)</option>
        <option value="MINTING">Minting (getInflation)</option>
        <option value="SLASHING">Slashing (getSigningInfo)</option>
        <option value="AUTH">Auth (getAccountinfo)</option>
      </select>
      <button @click="performQuery">Perform Query</button>
    </div>
    <p><b>Result</b>:</p>
    <p><code>{{ res }}</code></p>
  </div>
</template>

<script lang="ts">
import { getAddress, useAuth, useBank, useDistribution, useMinting, useSlashing } from '@stakeordie/griptape.js'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const distribution = useDistribution();
    const bank = useBank();
    const minting = useMinting();
    const slashing = useSlashing();
    const auth = useAuth();

    const res = ref<any>();
    const module = ref<string>('');

    async function performQuery() {
      res.value = await getQuery(module.value);
    }

    function getQuery(module: string): Promise<any> | undefined {
      const address = getAddress();
      switch (module) {
        case 'BANK':
          if (!address) throw Error('No address available');
          return bank.getBalance(address);
        case 'DISTRIBUTION':
          return distribution.getCommunnityPoolParameters();
        case 'MINTING':
          return minting.getInflation();
        case 'SLASHING':
          return slashing.getSigningInfo();
        case 'AUTH':
          if (!address) throw Error('No address available');
          return auth.getAccountinfo(address);
        default:
          return;
      }
    }
    
    return {
      res,
      module,
      performQuery
    }
  },
})
</script>
