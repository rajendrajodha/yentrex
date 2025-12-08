import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './services/Routing';
import { ToastContainer } from 'react-toastify';
import Loading from './Components/CustomComponent/Loading';
import LoaderHelper from './Components/CustomComponent/LoaderHelper';
import { ProfileProvider } from './Components/CustomComponent/ContextProviders/ProfileContext';
import { init, useConnectWallet,Web3OnboardProvider } from '@web3-onboard/react'
import injectedModule, { ProviderLabel }  from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import bitgetWalletModule from '@web3-onboard/bitget'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from './config/wagmi'


const injected = injectedModule({
  displayUnavailable: [ProviderLabel.MetaMask, ProviderLabel.Trust],
  filter: {
    [ProviderLabel.Detected]: ['Android', 'desktop','macOS','iOS','Android Browser']
  }
})

const bitgetWallet = bitgetWalletModule()

const wcV2InitOptions = {
  projectId: '0ea2e11787b98a3bc157da8ea5bbe09c',
  requiredChains: [
    56
  ],
}

const walletConnect = walletConnectModule(wcV2InitOptions)

const web3Onboard = init({
  wallets: [
    injected,
    walletConnect,
    bitgetWallet
  ],
  theme: 'dark',
  connect: {
    autoConnectLastWallet: true
  },
  chains: [
    {
      id: '0x38',
      token: 'BNB',
      label: 'Binance Smart Chain',
      rpcUrl: 'https://rpc.ankr.com/bsc/0dd03e2d1e8eefaf8c881b63d7ed3244be38abd1406517a45cafd0f0979f8b25'
    },
  ],

})


const queryClient = new QueryClient()

const App = () => {
  return (

    <ProfileProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Web3OnboardProvider web3Onboard={web3Onboard}>
              <Routing />
            </Web3OnboardProvider>
          </Router>
          <Loading ref={ref => LoaderHelper.setLoader(ref)} />
          <ToastContainer />
        </QueryClientProvider>
      </WagmiProvider>
    </ProfileProvider>
  )
}

export default App