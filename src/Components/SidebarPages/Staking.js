import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ethers } from "ethers";
import { useConnectWallet } from '@web3-onboard/react'
import { useAccount, useConnect, useDisconnect, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import contractData from './contract.json'
import bnbPrice from './bnbPrice.json'
import tokenData from './token.json'

const Staking = () => {
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
    // Wagmi hooks for wallet connection
    const { address: wagmiAddress, isConnected: isWagmiConnected } = useAccount()
    const { connectors, connect: wagmiConnect, isPending: isWagmiConnecting } = useConnect()
    const { disconnect: wagmiDisconnect } = useDisconnect()
    const [stakingOneStatus, setStakingOneStatus] = useState("Inactive")
    const [stakingTwoStatus, setStakingTwoStatus] = useState("Inactive")
    const [stakingThreeStatus, setStakingThreeStatus] = useState("Inactive")
    const [totalStakingOne, setTotalStakingOne] = useState(0)
    const [totalStakingTwo, setTotalStakingTwo] = useState(0)
    const [totalStakingThree, setTotalStakingThree] = useState(0)

    const [earnOneValue, setEarnOneValue] = useState(0)
    const [earnTwoValue, setEarnTwoValue] = useState(0)
    const [earnThreeValue, setEarnThreeValue] = useState(0)
    const [totalLiquidity, setTotalLiquilidty] = useState(0)
    const [totalValueLocaked, settotalValueLocaked] = useState(0)
    const [totalStaked, setTotalStaked] = useState(0)
    const [stakedCount, setStakedCount] = useState(0)
    const [NBCPrice, setNBCPrice] = useState(0)
    const [BnbPrice, setBnbPrice] = useState(0)
    const [totalRefferal, setTotalRefferal] = useState(0)
    const [totalEarning, setTotalEarning] = useState(0)
    const [availableToClain, setAvailableToClaim] = useState(0)
    const [aprOne, setAprOne] = useState(0)
    const [aprTwo, setAprTwo] = useState(0)
    const [aprThree, setAprThree] = useState(0)
    const [loading, setLoading] = useState(true);
    const [connectedAccount, setConnectedAccount] = useState()
    const [isApproving, setIsApproving] = useState(false);
    const [isStaking, setIsStaking] = useState(false);

    const [depositeFeeOne, setDepositeFeeOne] = useState(0)
    const [depositeFeeTwo, setDepositeFeeTwo] = useState(0)
    const [depositeFeeThree, setDepositeFeeThree] = useState(0)

    const [withdrwalFeeOne, setwithdrwalFeeOne] = useState(0)
    const [withdrwalFeeTwo, setwithdrwalFeeTwo] = useState(0)
    const [withdrwalFeeThree, setwithdrwalFeeThree] = useState(0)

    const [showBuyModal, setShowBuyModal] = useState(false);
    const [ycnValue, setYcnValue] = useState("");
    const YCN_RATE = 5;
    
    // USDT address on BSC mainnet
    const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
    // Buy contract address - update this with your actual buy contract address
    const BUY_CONTRACT_ADDRESS = "0x68208A272BacACAbD3f1D6675dC53784A55A12e9"; // Using staking contract address, update if different
    
    // Wagmi hooks for contract interactions
    const { writeContract: writeContractApprove, data: approveHash, isPending: isApprovingUSDT } = useWriteContract();
    const { writeContract: writeContractBuy, data: buyHash, isPending: isBuying } = useWriteContract();
    const { isLoading: isWaitingApprove, isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({
        hash: approveHash,
    });
    const { isLoading: isWaitingBuy, isSuccess: isBuySuccess } = useWaitForTransactionReceipt({
        hash: buyHash,
    });
    
    // USDT ABI for approve function
    const USDT_ABI = [
        {
            "constant": false,
            "inputs": [
                { "name": "_spender", "type": "address" },
                { "name": "_value", "type": "uint256" }
            ],
            "name": "approve",
            "outputs": [{ "name": "", "type": "bool" }],
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                { "name": "_owner", "type": "address" },
                { "name": "_spender", "type": "address" }
            ],
            "name": "allowance",
            "outputs": [{ "name": "", "type": "uint256" }],
            "type": "function"
        }
    ];
    
    // Buy contract ABI
    const BUY_CONTRACT_ABI = [
        {
            "inputs": [
                { "internalType": "address", "name": "stablecoin", "type": "address" },
                { "internalType": "uint256", "name": "stablecoinAmount", "type": "uint256" }
            ],
            "name": "buyTokens",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    
    // Check current allowance
    const { data: allowance } = useReadContract({
        address: USDT_ADDRESS,
        abi: USDT_ABI,
        functionName: 'allowance',
        args: wagmiAddress ? [wagmiAddress, BUY_CONTRACT_ADDRESS] : undefined,
        query: {
            enabled: !!wagmiAddress && isWagmiConnected,
        },
    });




    const contractAddress = contractData.address;
    const contractAbi = contractData.abi;
    
    // Handle buy YCN function
    const handleBuyYCN = async () => {
        if (!isWagmiConnected || !wagmiAddress) {
            alert("Please connect your wallet first");
            return;
        }
        
        if (!ycnValue || parseFloat(ycnValue) <= 0) {
            alert("Please enter a valid YCN amount");
            return;
        }
        
        try {
            // Calculate USDT amount (YCN amount * rate)
            const usdtAmount = parseFloat(ycnValue) * YCN_RATE;
            // USDT has 18 decimals on BSC
            const usdtAmountWei = parseUnits(usdtAmount.toString(), 18);
            
            // Check if we need to approve
            const currentAllowance = allowance || 0n;
            const needsApproval = currentAllowance < usdtAmountWei;
            
            if (needsApproval) {
                // First, approve USDT spending
                writeContractApprove({
                    address: USDT_ADDRESS,
                    abi: USDT_ABI,
                    functionName: 'approve',
                    args: [BUY_CONTRACT_ADDRESS, usdtAmountWei],
                });
            } else {
                // Already approved, proceed to buy
                writeContractBuy({
                    address: BUY_CONTRACT_ADDRESS,
                    abi: BUY_CONTRACT_ABI,
                    functionName: 'buyTokens',
                    args: [USDT_ADDRESS, usdtAmountWei],
                });
            }
        } catch (error) {
            console.error("Error in handleBuyYCN:", error);
            alert("Transaction failed: " + (error.message || "Unknown error"));
        }
    };
    
    // Handle approve success - automatically proceed to buy
    useEffect(() => {
        if (isApproveSuccess && ycnValue && writeContractBuy) {
            const usdtAmount = parseFloat(ycnValue) * YCN_RATE;
            const usdtAmountWei = parseUnits(usdtAmount.toString(), 18);
            try {
                writeContractBuy({
                    address: BUY_CONTRACT_ADDRESS,
                    abi: BUY_CONTRACT_ABI,
                    functionName: 'buyTokens',
                    args: [USDT_ADDRESS, usdtAmountWei],
                });
            } catch (error) {
                console.error("Error buying tokens:", error);
                alert("Failed to buy tokens: " + (error.message || "Unknown error"));
            }
        }
    }, [isApproveSuccess, ycnValue, writeContractBuy]);
    
    // Handle buy success
    useEffect(() => {
        if (isBuySuccess && ycnValue) {
            alert(`Successfully purchased ${ycnValue} YCN tokens!`);
            setShowBuyModal(false);
            setYcnValue("");
        }
    }, [isBuySuccess, ycnValue]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);

                const contract = new ethers.Contract(contractAddress, contractAbi, provider);

                const plan0 = await contract.plans(0);
                // console.log("plan(0)", plan0.toString())
                setDepositeFeeOne(plan0[4].toString())
                setwithdrwalFeeOne(plan0[5].toString())
                setAprOne(plan0[2].toString())
                let plan0totalStaking = plan0[0].toString()
                let plan0stakeCount = plan0[1].toString()
                // console.log("plan0totalStaking",plan0totalStaking)
                setTotalStakingOne(plan0totalStaking)
                const plan1 = await contract.plans(1);
                let plan1stakeCount = plan1[1].toString()
                // console.log("plan(1)",plan1.toString(1))
                let plan1totalStaking = plan1[0].toString()
                // console.log("plan1totalStaking",plan1totalStaking)
                setTotalStakingTwo(plan1totalStaking)
                setDepositeFeeTwo(plan1[4].toString())
                setwithdrwalFeeTwo(plan1[5].toString())

                setAprTwo(plan1[2].toString())
                const plan2 = await contract.plans(2);
                let plan2totalStaking = plan2[0].toString()
                let plan2stakeCount = plan2[1].toString()
                // console.log("plan2totalStaking",plan2totalStaking)
                setTotalStakingThree(plan2totalStaking)
                setDepositeFeeThree(plan2[4].toString())
                setwithdrwalFeeThree(plan2[5].toString())



                let totalStaToken = Number(plan0totalStaking) + Number(plan1totalStaking) + Number(plan2totalStaking)
                // console.log("totalSta",totalStaToken)
                setTotalStaked(totalStaToken / Math.pow(10, 18).toFixed(2))
                let totalstake = Number(plan0stakeCount) + Number(plan1stakeCount) + Number(plan2stakeCount)
                setStakedCount(totalstake)
                // console.log("plan(2)",plan2.toString(2))
                setAprThree(plan2[2].toString())

                const account = await provider.getSigner().getAddress();
                // console.log("Connected Wallet", account)
                setConnectedAccount(account)
                const userPlans = await contract.getStakedPlans(account);
                // console.log("userPlans=>",userPlans)
                setStakingOneStatus(userPlans[0].toString())
                setStakingTwoStatus(userPlans[1].toString())
                setStakingThreeStatus(userPlans[2].toString())
                const earnedTokensOne = await contract.earnedToken(0, account);
                // console.log("earnedTokens",earnedTokensOne[1].toString())
                const earnedTokensTwo = await contract.earnedToken(0, account);
                // console.log("earnedTokens",earnedTokensTwo[1].toString())
                const earnedTokensThree = await contract.earnedToken(0, account);
                // console.log("earnedTokens",earnedTokensThree[1].toString())

                setEarnOneValue(earnedTokensOne[1].toString())
                setEarnTwoValue(earnedTokensTwo[1].toString())
                setEarnThreeValue(earnedTokensThree[1].toString())

                // BNB Price 
                const contractPriceBNB = new ethers.Contract(bnbPrice.address, bnbPrice.abi, provider);
                const BNBPrice = async () => {
                    try {
                        let bnbP = await contractPriceBNB.latestAnswer();
                        let bnbPrice = bnbP.toString();
                        let adjustedBNBPrice = (parseInt(bnbPrice) / Math.pow(10, 8)).toFixed(2);
                        // console.log("BNB Price", adjustedBNBPrice);
                        setBnbPrice(adjustedBNBPrice);
                    } catch (error) {
                        console.error("Error fetching BNB price:", error);
                    }
                };

                // ref data
                const ref = async () => {
                    const refData = await contract.userRef(account);
                    // console.log("refData=>", refData)
                    // console.log("refData totalEarning=>",refData.totalEarning)
                    // console.log("refData totalEarning=>",refData.totalRef)
                    setAvailableToClaim((refData.claimableEarning).toString())
                    setTotalRefferal((refData.totalRef).toString())
                    setTotalEarning((refData.totalEarning).toString())
                }

                ref()
                BNBPrice()
            } catch (error) {
                console.error("Error fetching plans:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const ApproveTokenToBank = async () => {
        if (!wallet) {
            connect();
        }
        if (wallet) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);

                const tokenInstance = new ethers.Contract(tokenData.address, tokenData.abi, provider.getSigner());

                const maxApprovalAmount = ethers.constants.MaxUint256;  // 2^256 - 1

                const tx = await tokenInstance.approve(contractData.address, maxApprovalAmount);

                await tx.wait();
                // console.log("Token approved to bank:", tx);
            } catch (error) {
                console.log("Error connecting to chain", error);
            }
        }
    }

    const StakePlaOne = async () => {
        if (!wallet) {
            connect();
        }
        if (wallet) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);

                const signer = provider.getSigner();

                const contract = new ethers.Contract(contractAddress, contractAbi, signer);

                const stakingId = 0;
                const stakingAmount = ethers.utils.parseUnits("100", 18); // Example: 100 tokens

                const tx = await contract.stake(stakingId, stakingAmount, {
                    gasLimit: 500000
                });
                // console.log("Transaction sent: ", tx.hash);

                await tx.wait();
                // console.log("Transaction mined: ", tx.hash);

            } catch (error) {
                console.log("Error connecting to the chain or processing the transaction:", error);
            }
        }
    };

    const StakePlaTwo = async () => {
        if (!wallet) {
            connect();
        }
        if (wallet) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);

                const signer = provider.getSigner();

                const contract = new ethers.Contract(contractAddress, contractAbi, signer);

                const stakingId = 1;
                const stakingAmount = ethers.utils.parseUnits("100", 18); // Example: 100 tokens

                const tx = await contract.stake(stakingId, stakingAmount, {
                    gasLimit: 500000
                });
                // console.log("Transaction sent: ", tx.hash);

                await tx.wait();
                // console.log("Transaction mined: ", tx.hash);

            } catch (error) {
                console.log("Error connecting to the chain or processing the transaction:", error);
            }
        }
    };

    const StakePlaThree = async () => {
        if (!wallet) {
            connect();
        }
        if (wallet) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);

                const signer = provider.getSigner();

                const contract = new ethers.Contract(contractAddress, contractAbi, signer);

                const stakingId = 2;
                const stakingAmount = ethers.utils.parseUnits("100", 18); // Example: 100 tokens

                const tx = await contract.stake(stakingId, stakingAmount, {
                    gasLimit: 500000
                });
                // console.log("Transaction sent: ", tx.hash);

                await tx.wait();
                // console.log("Transaction mined: ", tx.hash);

            } catch (error) {
                console.log("Error connecting to the chain or processing the transaction:", error);
            }
        }
    };



    return (
        <>
            <div id="wrapper" className="overflow-hidden">
                <nav className="navbar navbar-expand-lg navbar-dark position-fixed header-container ">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between w-100">
                            <div className="logo">
                                <Link to="/"><img src="assets/img/logo.svg" alt="" width="216" height="39" /></Link>
                            </div>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                            <div className="main-menu">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item"> <Link className="nav-link " to="/">Home</Link> </li>
                                    <li className="nav-item"><a className="nav-link" href="#"> Telegram Group </a></li>
                                    {/* <li className="nav-item"><a className="nav-link" href=""> Buy YCN </a></li> */}
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowBuyModal(true);
                                            }}
                                        >
                                            Buy YCN
                                        </a>
                                    </li>

                                    <li className="nav-item"><a className="nav-link" href="#"> Dex Tools </a></li>
                                    <li className="nav-item"><a className="nav-link"
                                        href='https://testnet.bscscan.com/address/0x981E00719db2F6936938d78BBce7e34DE5880C20'
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    > BSC Scan </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="page-banner">
                    <div className="container">
                        <div className="row banner-content-area justify-content-center pb-0">
                            <div className="col-12 col-md-8 text-center ">
                                <h1 className="text-white pb-3"> Yentrex APY FIXED DEPOSIT </h1>
                                <p>Our Efforts, Your Rewards!</p>
                                {/* Original Connect Wallet Button (commented out) */}
                                {/* <button className="crp-btn text-white mx-auto no-border mt-4" disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}>
                                    {connecting ? 'Connecting' : wallet ? `${connectedAccount}` : 'Connect Wallet'}
                                </button> */}
                                {/* Wagmi Connect Wallet Button */}
                                <div className="mt-4">
                                    {isWagmiConnected ? (
                                        <button
                                            className="crp-btn text-white mx-auto no-border"
                                            onClick={() => wagmiDisconnect()}
                                        >
                                            Disconnect: {wagmiAddress?.slice(0, 6)}...{wagmiAddress?.slice(-4)}
                                        </button>
                                    ) : (
                                        <button
                                            className="crp-btn text-white mx-auto no-border"
                                            disabled={isWagmiConnecting}
                                            onClick={() => {

                                                // 🔍 Check if MetaMask or any injected wallet exists
                                                if (typeof window.ethereum === "undefined") {
                                                    alert("No wallet detected! Please install MetaMask extension.");
                                                    // OR custom alert function → alertWarningMessage("Please install MetaMask.")
                                                    return;
                                                }

                                                // Use injected connector (works with MetaMask, Brave, etc.)
                                                const injectedConnector = connectors.find(c => c.id === 'injected');
                                                const connector = injectedConnector || connectors[0];

                                                if (connector) {
                                                    wagmiConnect({ connector });
                                                }
                                            }}
                                        >
                                            {isWagmiConnecting ? 'Connecting...' : 'Connect Wallet'}
                                        </button>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div id="section0" className="invented-container overflow-hidden">
                    <div className="container">
                        <div className="row service-area pt-70 pb-70 g-4">
                            <div className="col-12 col-md-12 col-lg-4 ">
                                <div className="nbc_card">
                                    <div className="nbc_head">
                                        {/* <img src="assets/img/logo_icon.png" className="imgfluid" alt="" /> */}
                                        <div className="nbc_end">
                                            <h5 className="text-gradient">YCN 450 DAYS</h5>
                                            <div className="bn_row">
                                                <button className="btn btn-sm btn-outline-sm">
                                                    <i className="fas fa-lock me-1"></i> Locked
                                                </button>
                                                <a
                                                    className="btn btn-sm bg-gradient"
                                                    href='https://testnet.bscscan.com/address/0x981E00719db2F6936938d78BBce7e34DE5880C20'
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Stake History
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nbc_body">
                                        <div className="">
                                            <p>APR : <span className="text-success"><i className="fas fa-calculator me-1"></i>{aprOne}%</span></p>
                                            <p>Earn : <span>{(earnOneValue / Math.pow(10, 18)).toFixed(2)}YCN</span></p>
                                            <p>Status : <span className="text-success">{stakingOneStatus}</span></p>
                                        </div>
                                    </div>
                                    <div className="nbc_footer">
                                        <small>YCN Earned</small>
                                        <button
                                            className="btn btn-warning bg-gradient no-border"
                                            disabled={connecting || isApproving || isStaking}
                                            onClick={async () => {
                                                if (!wallet) {
                                                    await connect();
                                                } else {
                                                    await ApproveTokenToBank();
                                                    await StakePlaOne();
                                                }
                                            }}
                                        >
                                            {isApproving
                                                ? 'Approving'
                                                : isStaking
                                                    ? 'Staking'
                                                    : connecting
                                                        ? 'Connecting'
                                                        : wallet
                                                            ? 'Approve Contract'
                                                            : 'UNLOCK WALLET'}
                                            <i className="ms-1 fas fa-angle-double-right"></i>
                                        </button>
                                        {/* <button className="btn btn-warning bg-gradient no-border" disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}>
                                            {connecting ? 'Connecting' : wallet ? `Approve Contract ` : 'UNLOCK WALLET'}
                                            <i className="ms-1 fas fa-angle-double-right"></i>
                                        </button> */}
                                        <div class="accordion" id="accordionExample">
                                            <div class="accordion-item staking-acr">
                                                <h2 class="accordion-header">
                                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                        Details
                                                    </button>
                                                </h2>
                                                <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body">
                                                        <div className="details-text">
                                                            <div className="space-between">
                                                                <div className="attr_text">Total Staked : </div>
                                                                <div className="attr_text dtotalStaked0">{(totalStakingOne / Math.pow(10, 18)).toFixed(2)}</div>
                                                            </div>
                                                            <div className="space-between">
                                                                <div className="attr_text">Deposit Fee : </div>
                                                                <div className="attr_text dtotalStaked0">{depositeFeeOne} %</div>
                                                            </div>
                                                            <div className="space-between">
                                                                <div className="attr_text">Withdraw Fee : </div>
                                                                <div className="attr_text dtotalStaked0">{withdrwalFeeOne} %</div>
                                                            </div>
                                                            <div className="space-between">
                                                                <a className='btn1 fw-bold' href='#'>Get GBK</a>
                                                                <a className='btn1 fw-bold'
                                                                    href='https://testnet.bscscan.com/address/0x981E00719db2F6936938d78BBce7e34DE5880C20'
                                                                    target="_blank"
                                                                    rel="noopener noreferrer">View Contract</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-12 col-lg-4 ">
                                <div className="nbc_card">
                                    <div className="nbc_head">
                                        {/* <img src="assets/img/logo_icon.png" className="imgfluid" alt="" /> */}
                                        <div className="nbc_end">
                                            <h5 className="text-gradient">YCN 365 DAYS</h5>
                                            <div className="bn_row">
                                                <button className="btn btn-sm btn-outline-sm">
                                                    <i className="fas fa-lock me-1"></i> Locked
                                                </button>
                                                <a
                                                    className="btn btn-sm bg-gradient"
                                                    href='https://testnet.bscscan.com/address/0x981E00719db2F6936938d78BBce7e34DE5880C20'
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Stake History
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nbc_body">
                                        <div className="">
                                            <p>APR : <span className="text-success"><i className="fas fa-calculator me-1"></i>{aprTwo}%</span></p>
                                            <p>Earn : <span>{(earnTwoValue / Math.pow(10, 18)).toFixed(2)}YCN</span></p>
                                            <p>Status : <span className="text-success">{stakingTwoStatus}</span></p>
                                        </div>
                                    </div>
                                    <div className="nbc_footer">
                                        <small>YCN Earned</small>
                                        <button
                                            className="btn btn-warning bg-gradient no-border"
                                            disabled={connecting || isApproving || isStaking}
                                            onClick={async () => {
                                                if (!wallet) {
                                                    await connect();
                                                } else {
                                                    await ApproveTokenToBank();
                                                    await StakePlaTwo();
                                                }
                                            }}
                                        >
                                            {isApproving
                                                ? 'Approving'
                                                : isStaking
                                                    ? 'Staking'
                                                    : connecting
                                                        ? 'Connecting'
                                                        : wallet
                                                            ? 'Approve Contract'
                                                            : 'UNLOCK WALLET'}
                                            <i className="ms-1 fas fa-angle-double-right"></i>
                                        </button>
                                        {/* <button className="btn btn-warning bg-gradient no-border" disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}>
                                            {connecting ? 'Connecting' : wallet ? `Approve Contract ` : 'UNLOCK WALLET'}
                                            <i className="ms-1 fas fa-angle-double-right"></i>
                                        </button> */}
                                        <div class="accordion" id="accordionExample">
                                            <div class="accordion-item staking-acr">
                                                <h2 class="accordion-header">
                                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsetwo" aria-expanded="false" aria-controls="collapsetwo">
                                                        Details
                                                    </button>
                                                </h2>
                                                <div id="collapsetwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body">
                                                        <div className="details-text">
                                                            <div className="space-between">
                                                                <div className="attr_text">Total Staked : </div>
                                                                <div className="attr_text dtotalStaked0">{(totalStakingTwo / Math.pow(10, 18)).toFixed(2)}</div>
                                                            </div>
                                                            <div className="space-between">
                                                                <div className="attr_text">Deposit Fee : </div>
                                                                <div className="attr_text dtotalStaked0">{depositeFeeTwo} %</div>
                                                            </div>
                                                            <div className="space-between">
                                                                <div className="attr_text">Withdraw Fee : </div>
                                                                <div className="attr_text dtotalStaked0">{withdrwalFeeTwo} %</div>
                                                            </div>
                                                            <div className="space-between">
                                                                <a className='btn1 fw-bold' href='#'>Get GBK</a>
                                                                <a className='btn1 fw-bold'
                                                                    href='https://testnet.bscscan.com/address/0x981E00719db2F6936938d78BBce7e34DE5880C20'
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >View Contract</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-12 col-lg-4 ">
                                <div className="nbc_card">
                                    <div className="nbc_head">
                                        {/* <img src="assets/img/logo_icon.png" className="imgfluid" alt="" /> */}
                                        <div className="nbc_end">
                                            <h5 className="text-gradient">YCN 1095 DAYS</h5>
                                            <div className="bn_row">
                                                <button className="btn btn-sm btn-outline-sm">
                                                    <i className="fas fa-lock me-1"></i> Locked
                                                </button>
                                                <a
                                                    className="btn btn-sm bg-gradient"
                                                    href='https://testnet.bscscan.com/address/0x981E00719db2F6936938d78BBce7e34DE5880C20'
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Stake History
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nbc_body">
                                        <div className="">
                                            <p>APR : <span className="text-success"><i className="fas fa-calculator me-1"></i>{aprThree}%</span></p>
                                            <p>Earn : <span>{(earnThreeValue / Math.pow(10, 18)).toFixed(2)}YCN</span></p>
                                            <p>Status : <span className="text-success">{stakingThreeStatus}</span></p>
                                        </div>
                                    </div>
                                    <div className="nbc_footer">
                                        <small>YCN Earned</small>
                                        <button
                                            className="btn btn-warning bg-gradient no-border"
                                            disabled={connecting || isApproving || isStaking}
                                            onClick={async () => {
                                                if (!wallet) {
                                                    await connect();
                                                } else {
                                                    await ApproveTokenToBank();
                                                    await StakePlaThree();
                                                }
                                            }}
                                        >
                                            {isApproving
                                                ? 'Approving'
                                                : isStaking
                                                    ? 'Staking'
                                                    : connecting
                                                        ? 'Connecting'
                                                        : wallet
                                                            ? 'Approve Contract'
                                                            : 'UNLOCK WALLET'}
                                            <i className="ms-1 fas fa-angle-double-right"></i>
                                        </button>
                                        {/* <button className="btn btn-warning bg-gradient no-border" disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}>
                                            {connecting ? 'Connecting' : wallet ? `Approve Contract ` : 'UNLOCK WALLET'}
                                            <i className="ms-1 fas fa-angle-double-right"></i>
                                        </button> */}
                                        <div class="accordion" id="accordionExample">
                                            <div class="accordion-item staking-acr">
                                                <h2 class="accordion-header">
                                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                                                        Details
                                                    </button>
                                                </h2>
                                                <div id="collapse3" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body">
                                                        <div className="details-text">
                                                            <div className="space-between">
                                                                <div className="attr_text">Total Staked : </div>
                                                                <div className="attr_text dtotalStaked0">{(totalStakingThree / Math.pow(10, 18)).toFixed(2)}</div>
                                                            </div>
                                                            <div className="space-between">
                                                                <div className="attr_text">Deposit Fee : </div>
                                                                <div className="attr_text dtotalStaked0">{depositeFeeThree} %</div>
                                                            </div>
                                                            <div className="space-between">
                                                                <div className="attr_text">Withdraw Fee : </div>
                                                                <div className="attr_text dtotalStaked0">{withdrwalFeeThree} %</div>
                                                            </div>
                                                            <div className="space-between">
                                                                <a className='btn1 fw-bold' href='#'>Get GBK</a>
                                                                <a className='btn1 fw-bold'
                                                                    href='https://testnet.bscscan.com/address/0x981E00719db2F6936938d78BBce7e34DE5880C20'
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >View Contract</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showBuyModal && (
                    <div className="modal-overlay">
                        <div className="custom-modal">

                            <h4 className="my-3 text-dark text-center">Buy YCN</h4>

                            <label className="text-dark mt-2 mb-2">YCN Token:</label>
                            <input
                                type="text"
                                className="form-control mb-4"
                                placeholder="Quantity"
                                value={ycnValue}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    // Allow only numbers (optional)
                                    if (!/^\d*\.?\d*$/.test(value)) return;

                                    setYcnValue(value);
                                }}
                            />

                            {ycnValue === "" ? (
                                <p className="text-success fw-bold">1 YCN = 5 USDT</p>
                            ) : (
                                <p className="text-success fw-bold">
                                    {ycnValue} YCN = {(ycnValue * YCN_RATE).toFixed(2)} USDT
                                </p>
                            )}


                            <div className="d-flex gap-3 justify-content-end mb-3 mt-5">
                                <button
                                    className="btn btn-dark"
                                    onClick={() => {
                                        setShowBuyModal(false);
                                        setYcnValue("");
                                    }}
                                    disabled={isApprovingUSDT || isWaitingApprove || isBuying || isWaitingBuy}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn btn-dark"
                                    onClick={handleBuyYCN}
                                    disabled={
                                        !isWagmiConnected || 
                                        !ycnValue || 
                                        parseFloat(ycnValue) <= 0 ||
                                        isApprovingUSDT || 
                                        isWaitingApprove || 
                                        isBuying || 
                                        isWaitingBuy
                                    }
                                >
                                    {isApprovingUSDT || isWaitingApprove 
                                        ? 'Approving...' 
                                        : isBuying || isWaitingBuy 
                                            ? 'Buying...' 
                                            : 'Proceed'}
                                </button>
                            </div>

                        </div>
                    </div>
                )}


                <footer className="footer-container pt-50">
                    <div className="container">
                        <div className="row pb-40 mb-pb-20 footer-top-content overflow-hidden">
                            <div className="col-12 col-md-6 col-lg-6 footer-col wow fadeInUp" data-wow-duration="1s"
                                data-wow-delay=".2s">
                                <div className="footer-cryptu">
                                    <div className="footer-logo">
                                        <img src="assets/img/logo.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 footer-col ">
                                <ul className="d-flex flex-wrap social-link ms-auto justify-content-end">
                                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                    <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                    <li><a href="#"><i className="fab fa-whatsapp"></i></a></li>
                                </ul>
                            </div>
                        </div>


                        <div class="col-lg-12">
                            <div class="nbc_card carl_lg">
                                <div class="row g-4">
                                    <div class="col-lg-6">
                                        <div class="row g-3">
                                            <div class="col-lg-6">
                                                <div class="le_card">
                                                    <p>Total Liquidity</p>
                                                    <h5>{totalLiquidity}</h5>
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="le_card">
                                                    <p>Total Value Locked</p>
                                                    <h5>{totalValueLocaked}</h5>
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="le_card">
                                                    <p>Total Staked</p>
                                                    <h5>{totalStaked}</h5>
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="le_card">
                                                    <p> Stake Count</p>
                                                    <h5>{stakedCount}</h5>
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="le_card">
                                                    <p> $YCN Price</p>
                                                    <h5>{NBCPrice}</h5>
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="le_card">
                                                    <p> $BNB Price </p>
                                                    <h5>{BnbPrice}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="nbc_r">
                                            <div class="r_top">
                                                <h4 class="text-gradient">
                                                    EARN UP TO 30% FROM EACH REFERRAL
                                                </h4>
                                                <div class="nbc_body">
                                                    <div class="">
                                                        <p>Total Referral : <span class="">{totalRefferal} YCN</span></p>
                                                        <p>Total Earning : <span>{totalEarning} YCN</span></p>
                                                        <p>Available to claim : <span class="">{availableToClain} YCN</span></p>
                                                    </div>
                                                    {/* <button class="crp-btn text-white no-border btn-sm mt-3" onClick={ClaimRefferalEarning}>
                                                    Claim Referral Earning </button> */}
                                                </div>
                                            </div>
                                            <div class="r_bottom">
                                                <div class="form-group newsletter-field">
                                                    <form action="#" method="post">
                                                        <input class="form-control" type="email" name="EMAIL"
                                                            value="https://www.stake.Yentrexcoin.invite" />
                                                        <button class="btn-icon"> Copy </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex flex-wrap justify-content-ceter footer-bottom-content">
                                    <p className="order-2 order-lg-1 mx-auto">&copy; Copyright 2025 <a href="#"> Yentrex </a> All Rights Reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Staking;