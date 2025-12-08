import { createConfig, http } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [bsc],
  connectors: [
    injected(),
  ],
  transports: {
    [bsc.id]: http('https://rpc.ankr.com/bsc/0dd03e2d1e8eefaf8c881b63d7ed3244be38abd1406517a45cafd0f0979f8b25'),
  },
})

