import { createConfig, http } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

// WalletConnect project ID - using the same one from web3-onboard
const projectId = '0ea2e11787b98a3bc157da8ea5bbe09c'

export const config = createConfig({
  chains: [bsc],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId }),
  ],
  transports: {
    [bsc.id]: http('https://rpc.ankr.com/bsc/0dd03e2d1e8eefaf8c881b63d7ed3244be38abd1406517a45cafd0f0979f8b25'),
  },
})

