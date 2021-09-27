<template>
  <div>
    <h2>SNIP-721</h2>
    <p><b>Collection name:</b> {{ info.name }}</p>
    <p><b>Symbol:</b> {{ info.symbol }}</p>
    <div class="container">
      <select v-model="selectedToken">
        <option value="">Select NFT</option>
        <option v-for="(token, i) in tokens" :value="token" :key="i">{{ token }}</option>
      </select>
      <button @click="showInfo">Show Info</button>
    </div>

    <h3>NFT Details</h3>
    <p v-if="loading">Loading...</p>
    <dl v-if="nftInfo && !loading">
      <dt>Name</dt>
      <dd>{{ nftInfo.name }}</dd>

      <dt>Description</dt>
      <dd>{{ nftInfo.description }}</dd>

      <dt>IPFS Image</dt>
      <dd>
        <a :href="nftInfo.image" target="_blank">{{ nftInfo.image }}</a>
      </dd>

      <dt>Properties</dt>
      <dd>
        <code>
          <pre>
            {{ nftInfo.props }}
          </pre>
        </code>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { refContract, Snip721Contract, extendContract } from '@stakeordie/griptape.js'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    const nfts = refContract<Snip721Contract>('ntfs');

    const info = ref<any>({});
    const tokens = ref<string[]>();
    const selectedToken = ref<string>();
    const nftInfo = ref<any>();
    const loading = ref<boolean>(false);

    async function getContractInfo() {
      const res = await nfts.getContractInfo();
      info.value = res.contract_info;
    }

    async function getTokens() {
      const res = await nfts.getTokens('secret1tv0wkl89th5eshh4cprrwwrncvprp0a7jdtr5n');
    }

    async function showInfo() {
      if (!selectedToken.value) return;
      loading.value = true;
      const res = await nfts.getNftInfo(selectedToken.value);
      loading.value = false;
    }

    onMounted(() => {
      getContractInfo()
      getTokens();
    })

    return {
      info,
      tokens,
      selectedToken,
      getContractInfo,
      getTokens,
      showInfo,
      nftInfo,
      loading
    }
  },
})
</script>
