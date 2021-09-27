<template>
  <h1>Griptape.js Release Demo</h1>

  <contract-instantiator/>

  <viewing-keys/>

  <secret-network-modules/>

  <snip-721/>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContractInstantiator from '@/components/ContractInstantiator.vue';
import ViewingKeys from '@/components/ViewingKeys.vue';
import SecretNetworkModules from '@/components/SecretNetworkModules.vue';
import Snip721 from '@/components/Snip721.vue';

export default defineComponent({
  name: 'App',
  components: {
    ContractInstantiator,
    ViewingKeys,
    SecretNetworkModules,
    Snip721
  }
});
</script>
