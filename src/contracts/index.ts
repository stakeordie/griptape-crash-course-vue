import {
  createContract,
  snip20Def,
  Snip20Contract,
  ContractDefinition,
  ContractMessageRequest,
  ContractMessageResponse,
  Snip721Contract,
  snip721Def,
  BaseContract
} from '@stakeordie/griptape.js';

createContract<Snip20Contract>({
  id: 'sefi',
  at: 'secret12q2c5s5we5zn9pq43l0rlsygtql6646my0sqfm',
  definition: snip20Def
});

createContract<Snip721Contract>({
  id: 'ntfs',
  at: 'secret16h4wr6u90sk5m3eahe3njh4n6wn8c4zhq22s34',
  definition: snip721Def
});

export const counterDef: ContractDefinition = {
  queries: {
    getCount() {
      return { get_count: { } }
    }
  },
  messages: {
    increment(): ContractMessageRequest {
      const handleMsg = { increment: {} };
      return { handleMsg };
    }
  }
}

export interface CounterContract extends BaseContract {
  getCount(): Promise<{ count: number }>;
  increment(): Promise<ContractMessageResponse<void>>;
}
