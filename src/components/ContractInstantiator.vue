<template>
  <h2>Instantiating Contracts</h2>
  <p>Count: {{ count }}</p>
  <div class="container">
    <button @click="createContractInstance">Create contract instance</button>
    <button @click="getCount">Count</button>
  </div>

  <h2>Handling Contract Responses</h2>
  <p>Viewing key: {{ key }}</p>
  <button @click="createViewingKey" :disabled="loading">Create Viewing Key</button>
</template>

<script lang="ts">
import { counterDef, CounterContract } from '@/contracts';
import {
  refContract,
  Snip20Contract,
  viewingKeyManager,
  instantiateContract
} from '@stakeordie/griptape.js'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const sefi = refContract<Snip20Contract>('sefi');
    const key = ref<string>();
    const loading = ref(false);
    const count = ref<number>()

    async function createViewingKey(): Promise<void> {
      loading.value = true;
      try {
        const { isEmpty, parse } = await sefi.createViewingKey();
        if (isEmpty()) return;
        const result: any = parse();
        const value = result.create_viewing_key.key;
        viewingKeyManager.add(sefi, value);
      } catch (e: any) {
        // ignore
      } finally {
        loading.value = false;
      }
    }

    async function createContractInstance() {
      await instantiateContract<CounterContract>({
        id: 'counter',
        codeId: 50,
        definition: counterDef,
        label: 'griptape.js-counter-03',
        initMsg: { count: 1000, addr: 'secret1hcakhdfaqfd9ja0h8vy5vxe3le0sfgaj7m9zpw' }
      });
    }

    async function getCount() {
      const counter = refContract<CounterContract>('counter')
      const res = await counter.getCount();
      count.value = res.count;
    }

    return {
      key,
      loading,
      count,
      createViewingKey,
      createContractInstance,
      getCount
    }
  },
})
</script>
