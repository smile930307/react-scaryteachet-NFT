import React, {useEffect, useState} from "react";
import ReactGA from "react-ga4";
import viewportAction from "viewport-action";
import Web3 from "web3";
import config from "./config.json";
import {useSearchParams} from "react-router-dom";
import './overlay.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

ReactGA.initialize("G-K9SVV8GQNZ");
const options = {
    once: true,
};
let Landed = true;
const category = "mint.znkgames.com";
const btnText = "Connect Wallet";

export default function Minting() {
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    // const [category, setCategory] = useState("mint.znkgames.com");
    const [count, setCount] = useState(1);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [error, setError] = useState(null);
    // const [btnText, setBtnText] = useState("Connect Wallet");
    const [total, setTotal] = useState(null);
    const [supply, setSupply] = useState(9999);
    const [pricePerNFT, setPricePerNFT] = useState(0.05);
    const [maxNftPerWallet, setMaxNftPerWallet] = useState(20);
    const [loading, setLoading] = useState(null);
    const [message, setMessage] = useState(null);
    const [isBlackList, setIsBlackList] = useState(null);
    const [maxMint, setMaxMint] = useState(20);
    const [searchParams, setSearchParams] = useSearchParams("");
    const [ref, setRef] = useState(null);
    const [isWhitelist, setIsWhiteList] = useState(null);
    const [isOGUser, setIsOGUser] = useState(null);
    const [contractState, setContractState] = useState(1);
    const [isWalletConnect, setConnectWallet] = useState(false);
    const [serverLoad, setServerLoad] = useState(true);
    // const [chainState, setChainState] = useState(4);
    const [walletBalance, setWalletBalance] = useState(null);
    const [openModal , setOpenModal] = useState(false);

    useEffect(async () => {
        addEvent();
        const _ref = searchParams.get("ref");
        // console.log(_ref);
        setRef(_ref);
        setTimeout(() => setIsPageLoaded(true), 3000);
        setTotal(count * pricePerNFT);
        await connection();
    }, []);
    useEffect(async () => {
        await connection();
    }, [isWalletConnect]);
    useEffect(() => {
        if (isPageLoaded) {
            // console.log("page loaded");
            attachEvents();
        }
    }, [isPageLoaded]);
    useEffect(() => {
        let num = count * pricePerNFT;
        setTotal(Math.round(num * 100) / 100);
        // console.log(count, total);
    }, [count]);
    useEffect(async () => {
        // // console.log("Account changed");
        if (account) {
            if (contractState == 1) {
                const _oGUser = await contract.methods.OGUser(account).call();
                const _isWhiteList = await contract.methods.whitelist(account).call();
                if (_oGUser) {
                    await teacherPriceWithUser(account);
                    setServerLoad(false);
                    setIsOGUser("true");
                } else if (_isWhiteList) {
                    setIsWhiteList("true");
                    setServerLoad(false);
                    await teacherPriceWithUser(account);
                } else {
                    // console.log("Do nothing");
                    setIsWhiteList("false");
                    setIsOGUser("false");
                    setServerLoad(false);
                    // setTotal(0);
                    // setError("You are not Whitelisted");
                    // setTimeout(``
                }
            } else {
                const _oGUser = await contract.methods.OGUser(account).call();
                const _isWhiteList = await contract.methods.whitelist(account).call();
                if (_oGUser) {
                    await teacherPriceWithUser(account);
                    setServerLoad(false);
                    setIsOGUser("true");
                } else if (_isWhiteList) {
                    setIsWhiteList("true");
                    await teacherPriceWithUser(account);
                    setServerLoad(false);
                } else {
                    await teacherPriceWithUser(account);
                    setServerLoad(false);
                }
            }
        } else {
            await setStates();
            setServerLoad(false);
        }
    }, [account]);

    const addEvent = () => {
        if (window.ethereum) {
            window.ethereum.on("chainChanged", (e) => {
                // console.log("ethereum chain changed");
                window.location.reload();
                setError("Change Network to Ether");
                setTimeout(() => {
                    setError(null);
                }, 5000)
            });
        }
    }
    const smartContract = () => {
        const _web3 = new Web3(window.ethereum);
        return new _web3.eth.Contract(
            config.abi,
            config.address
        );
    }
    const setStates = async () => {
        const _web3 = new Web3(window.ethereum);
        const SmartContractObj = new _web3.eth.Contract(
            config.abi,
            config.address
        );
        // console.log(SmartContractObj);
        if (window.ethereum) {
            const _max = await SmartContractObj.methods.MAX_MINT().call();
            // console.log(_max);
            setMaxMint(_max);
            // const mintingPriceWei = await SmartContractObj.methods.teacherPrice().call();
            // const mintingPriceEther = _web3.utils.fromWei(mintingPriceWei, "ether");
            // setPricePerNFT(mintingPriceEther);
            const max = await SmartContractObj.methods.maxNFTsPerWallet().call();
            setMaxNftPerWallet(max);
            const _supply = await SmartContractObj.methods.getMaxSupply().call();
            setSupply(_supply);
        } else {
            setError("Please Install Metamask ");
            setTimeout(() => {
                setError(null);
            }, 5000)
        }
    }
    const teacherPrice = async () => {
        const _web3 = new Web3(window.ethereum);
        const SmartContractObj = smartContract();
        const _teacherPrice = await SmartContractObj.methods.teacherPrice().call();
        // console.log(_teacherPrice);
        const priceInEther = _web3.utils.fromWei(_teacherPrice, "ether");
        setPricePerNFT(priceInEther);
        setTotal(Math.round(priceInEther * 100) / 100);
    }
    const teacherPriceWithUser = async (address) => {
        const _web3 = new Web3(window.ethereum);
        const SmartContractObj = smartContract();
        const _teacherPrice = await SmartContractObj.methods.teacherPriceByUser(address).call();
        // console.log(_teacherPrice);
        const priceInEther = _web3.utils.fromWei(_teacherPrice, "ether");
        setPricePerNFT(priceInEther);
        setTotal(Math.round(priceInEther * 100) / 100);
    }
    const connection = async () => {
        if (window.ethereum) {
            const _web3 = new Web3(window.ethereum);
            setWeb3(_web3);
            const SmartContractObj = new _web3.eth.Contract(
                config.abi,
                config.address
            );
            setContract(SmartContractObj);
            const networkId = await window.ethereum.request({
                method: "net_version",
            });
            // setChainState(networkId);
            // console.log("Log before TRy")
            try {
                const _contractState = await SmartContractObj.methods.state().call();
                // // console.log(_contractState);
                setContractState(_contractState);
                let accounts;
                // console.log(isWalletConnect);
                if (isWalletConnect) {
                    accounts = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                } else {
                    accounts = await _web3.eth.getAccounts();
                }
                if (accounts.length > 0) {
                    const NetworkData = await config.networks[networkId];
                    // console.log(networkId);

                    if (networkId == 4) {
                        const SmartContractObj = new _web3.eth.Contract(
                            config.abi,
                            config.address
                        );
                        setAccount(accounts[0]);
                        // setBtnText("Wallet Connected");
                        setContract(SmartContractObj);
                        if (accounts.length >= 0) {
                            const _walletBalance = await SmartContractObj.methods.balanceOf(accounts[0]).call();
                            // console.log(_walletBalance);
                            setWalletBalance(_walletBalance);
                            await setStates();
                            const isBlackList = await SmartContractObj.methods.blacklist(accounts[0]).call();
                            if (isBlackList) {
                                setServerLoad(false);
                                setIsBlackList(true);
                                // setError("You are BlackListed");
                                setTimeout(() => {
                                    setError(null);
                                }, 5000)
                                // console.log(isBlackList);
                                return
                            }
                            const _contractState = await SmartContractObj.methods.state().call();
                            // console.log(_contractState);
                            setContractState(_contractState);
                            if (_contractState == 1) {
                                const _oGUser = await SmartContractObj.methods.OGUser(accounts[0]).call();
                                const _isWhiteList = await SmartContractObj.methods.whitelist(accounts[0]).call();
                                if (_oGUser) {
                                    await teacherPriceWithUser(accounts[0]);
                                    setIsOGUser("true");
                                } else if (_isWhiteList) {
                                    setIsWhiteList("true");
                                    await teacherPriceWithUser(accounts[0]);
                                } else {
                                    // console.log("Do nothing");
                                    setIsWhiteList("false");
                                    setIsOGUser("false");
                                    // setTotal(0);
                                    // setError("You are not Whitelisted");
                                    // setTimeout(``
                                }
                                setServerLoad(false);
                            } else {
                                const _oGUser = await SmartContractObj.methods.OGUser(accounts[0]).call();
                                const _isWhiteList = await SmartContractObj.methods.whitelist(accounts[0]).call();
                                if (_oGUser) {
                                    await teacherPriceWithUser(accounts[0]);
                                    setIsOGUser("true");
                                } else if (_isWhiteList) {
                                    setIsWhiteList("true");
                                    await teacherPriceWithUser(accounts[0]);
                                } else {
                                    await teacherPriceWithUser(accounts[0]);
                                }
                                setServerLoad(false);
                            }
                            // setMessage(null);
                            // setError(null);
                        }
                        window.ethereum.on("accountsChanged", (accounts) => {
                            window.location.reload();
                            setAccount(accounts[0]);
                            // setServerLoad(false);
                            // setError("");
                        });
                    } else {
                        console.log("Else Part");
                        setOpenModal(true);
                        await setStates();
                        setServerLoad(false);
                        setError("Change network to ETH");
                        setTimeout(() => {
                            setError(null);
                        }, 3000)
                    }
                } else {
                    await setStates();
                    await teacherPrice();
                    setServerLoad(false);
                }
            } catch (err) {
                setConnectWallet(false);
                setServerLoad(false);
                // console.log(err);
                if (err.code === -32002) {
                    setError("Metamask already open");
                } else if (err.code === 4001) {
                    setError(err.message);
                } else if (networkId !== 4) {
                    console.log("Catch Part");
                    setOpenModal(true);
                    setError("Change Network to Ethereum");
                }
                else
                    setError(err.message);
                setTimeout(() => {
                    setError(null);
                }, 5000)
            }
        } else {
            window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en', '_blank');
            setError("Please Install Metamask ");
            setTimeout(() => {
                setError(null);
            }, 5000)
        }
    }
    const connectWallet = async () => {
        setConnectWallet(true);
        // console.log("Clicked on Connect Wallet");
        await connection();
        ReactGA.event({
            category: category,
            action: " Click On Connect Wallet",
            label: window.location.href,
        });
    };
    const plus = () => {
        // console.log(chainState);
        let _count = count;
        setCount(++_count);
        ReactGA.event({
            category: category,
            action: " Click On Plus Button",
            label: window.location.href,
        });
        // console.log("Click on Plus Button", count);
        // console.log(error);
        // console.log(message);
    };
    const setMax = async () => {
        if (contract) {
            const _max = await contract.methods.MAX_MINT().call();
            setCount(_max);
            setMaxMint(_max);
        } else
            setCount(maxNftPerWallet);
        // setCount(50);
        // setCount(20);
        // if (account) {
        //
        // } else {
        //     setError("Wallet not Connected");
        //     setTimeout(() => {
        //         setError(null);
        //     }, 3000)
        // }
        ReactGA.event({
            category: category,
            action: " Click On Set Max",
            label: window.location.href,
        });
        // console.log("Click on Set Max");
    };
    const minus = () => {
        let _count = count;
        setCount(--_count);
        ReactGA.event({
            category: category,
            action: " Click On Minus Button",
            label: window.location.href,
        });
        // console.log("Click on Minus Button", count);
    };
    const mintNow = async () => {
        if (isWhitelist === "false")
            return;
        if (!isBlackList) {
            try {
                if (count <= 0) {
                    // console.log(count);
                    return;
                }
                setLoading("minting");
                setError(null);
                setMessage("Minting...");
                if (ref) {
                    contract.methods.mintWithReferral(count, ref).send({
                        from: account,
                        value: web3.utils.toWei((total).toString(), "ether")
                    })
                        .once("error", (err) => {
                            // console.log(err);
                            setMessage(null);
                            if (err.code === 4001)
                                setError("User Denied transaction");
                            setTimeout(() => {
                                setError(null);
                            }, 3000)
                            setLoading(null);
                        })
                        .then((receipt) => {
                            // console.log(receipt);
                            setMessage(
                                "Congratulations on your new NFTs. Go visit <a href='https://testnets.opensea.io/collection/scaryteachernfts05' target='_blank'>OpenSea</a> to view it."
                            );
                            setLoading(null);
                        });
                } else {
                    contract.methods
                        .mint(count)
                        .send({
                            // to: "0x9dd89b9e0e43948b2ac765e2c70ac66fdb659e6a",
                            // gasPrice: "58500000",
                            // gas: "98500000",
                            from: account,
                            value: web3.utils.toWei((total).toString(), "ether"),
                        })
                        .once("error", (err) => {
                            // console.log(err);
                            setMessage(null);
                            if (err.code === 4001)
                                setError("User Denied transaction");
                            setTimeout(() => {
                                setError(null);
                            }, 3000)
                            setLoading(null);
                        })
                        .then((receipt) => {
                            // console.log(receipt);
                            setMessage(
                                "Congratulations on your new NFT. Go visit <a href='https://testnets.opensea.io/collection/scaryteachernfts04' target='_blank'>OpenSea</a> to view it."
                            );
                            setLoading(null);
                        });
                }
            } catch (err) {
                // console.log(err);
            }
        } else {
            // setError("You are Blacklisted");
            setTimeout(() => {
                setError(null);
            }, 3000)
        }
        // console.log("Clicked on Mint");
        // console.log(count);
        ReactGA.event({
            category: category,
            action: " Click On Mint",
            label: window.location.href,
        });
    };
    const viewContract = () => {
        // // console.log(contract.methods.call);
        // console.log("Clicked on View Contract");
        ReactGA.event({
            category: category,
            action: " Click On View Contract",
            label: window.location.href,
        });
    };
    const modalOpen = async() =>{
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x4' }], // chainId must be in hexadecimal numbers
        });
    }
    const toggle = ()=>{
        setOpenModal(!openModal);
    }
    // GA event functions
    const attachEvents = () => {
        viewportAction.add(
            "#container",
            function (e) {
                if (Landed) {
                    ReactGA.event({
                        category: category,
                        action: "1:  Landed on Page",
                        label: window.location.ref,
                    });
                    // console.log("Landed on Page");
                    Landed = false;
                }
            },
            options
        );
    };
    const discordIcon = () => {
        // console.log("Clicked on Discord Icon");
        ReactGA.event({
            category: category,
            action: " Click On Discord",
            label: window.location.href,
        });
    };
    const facebookIcon = () => {
        // console.log("Clicked on Facebook Icon");
        ReactGA.event({
            category: category,
            action: " Click On Facebook",
            label: window.location.href,
        });
    };
    const youtubeIcon = () => {
        // console.log("Clicked on Youtube Icon");
        ReactGA.event({
            category: category,
            action: " Click On Youtube",
            label: window.location.href,
        });
    };
    const twitterIcon = () => {
        // console.log("Clicked on Twitter Icon");
        ReactGA.event({
            category: category,
            action: " Click On Twitter",
            label: window.location.href,
        });
    };
    const privacyPolicy = () => {
        // console.log("Clicked on Privacy Policy");
        ReactGA.event({
            category: category,
            action: " Click On Privacy Policy",
            label: window.location.href,
        });
    };
    const terms = () => {
        // console.log("Clicked on Terms and Conditions");
        ReactGA.event({
            category: category,
            action: " Click On Terms and Conditions",
            label: window.location.href,
        });
    };

    const handleChange = () => {
        setTotal(count * pricePerNFT);
    };

    return (
        <>
            {serverLoad ?
                <div className="d-flex justify-content-center">
                    <div className=" spinner-border-xl spinner-border text-success"
                         role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> 
                : 
                <div>
                    {
                        isWhitelist === 'false' && isOGUser === 'false' &&
                        <div id="overlay" className="d-flex justify-content-center d-sm-flex justify-content-sm-center">
                            <div id="text" className="d-flex justify-content-center ml-sm-5">You are not whitelisted</div>
                        </div>
                    }
                    {walletBalance === maxNftPerWallet &&
                    <div id="overlay">
                        <div id="text">Your Wallet Limit Reached</div>
                    </div>}
                    <header>
                        <nav className="navbar fixed-top navbar-expand-xl navbar-default py-xl-4">
                            <div
                                className="container d-flex justify-content-between"
                                id="container"
                            >
                                <ul className="nav">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link px-2"
                                            role="button"
                                            onClick={discordIcon}
                                            href="https://discord.gg/Ptx8heAZZd"
                                            target="_blank"
                                        >
                                            <img src="img/ico-discord.svg" alt="..."/>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link px-2"
                                            role="button"
                                            onClick={twitterIcon}
                                            href="https://twitter.com/TeacherScary"
                                            target="_blank"
                                        >
                                            <img src="img/ico-twitter.svg" alt="..."/>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link px-2"
                                            role="button"
                                            onClick={youtubeIcon}
                                            href="https://www.youtube.com/channel/UC6z4RnDkI5DALyx3M1qEmPQ"
                                            target="_blank"
                                        >
                                            <img src="img/ico-youtube.svg" alt="..."/>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link px-2"
                                            role="button"
                                            onClick={facebookIcon}
                                            href="https://www.facebook.com/Scary-Teacher-104953160859907"
                                            target="_blank"
                                        >
                                            <img src="img/ico-facebook.svg" alt="..."/>
                                        </a>
                                    </li>
                                </ul>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#mainMenu"
                                    aria-controls="mainMenu"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse" id="mainMenu">
                                    <ul className="navbar-nav ml-auto font-outfit navbar__main text-center text-xl-left mb-4 mb-xl-0">
                                        <li className="nav-item">
                                            <a className="nav-link" role="alert">
                                                {error && (
                                                    <div className="alert-danger p-1 rounded" role="alert"
                                                         dangerouslySetInnerHTML={{__html: error}}>
                                                        {/*{error}*/}

                                                    </div>
                                                )}
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            {account ? (
                                                <div>
                                                    <p className="btn btn-success">{account.substring(0, 5) + '....' + account.substring(account.length - 6, account.length)}</p>
                                                </div>
                                            ) : (
                                                <div className="cta">
                                                    <button
                                                        className="nav-link btn btn-success"
                                                        onClick={connectWallet}
                                                        data-target="#exampleModal"
                                                        data-toggle="modal"
                                                    >
                                                        {btnText}
                                                    </button>
                                                </div>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </header>
                    <div>
                        <Modal isOpen={openModal} className="text-dark">
                            <ModalHeader >Please switch to Rinkeby network</ModalHeader>
                            <ModalBody>
                                In order to trade items, please switch to Rinkeby network within your MetaMask wallet.
                            </ModalBody>
                            <ModalFooter>
                                <Button className="rounded-pill" onClick={toggle}>Cancel</Button>{' '}
                                <Button className="nav-link rounded-pill text-white btn btn-success" onClick={modalOpen}>Switch Network</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    <section className="mb-5 overflow-hidden ">
                        <div className="container">
                            <div className="row">
                                <div className="row">
                                    <div className="col-xl-5 order-xl-2">
                                        <h2 className="mt-5 font-mrb title-minting mb-5 text-uppercase text-center animate__animated animate__fadeInUp">
                                            The Scary Teacher <br/>
                                            NFT <span
                                            className="text-success">{contractState == 0 && "Currently PAUSE"}{contractState == 1 && "PRE-SALE"}{contractState == 2 && "PUBLIC-SALE"}{contractState == 3 && "FINISHED"}</span>
                                        </h2>
                                        <div
                                            className="row no-gutters top__options text-center animate__animated animate__fadeInUp">
                                            <div className="col-md-3">
                                                <p className="mb-3 font-outfit">
                                                    Supply:{" "}
                                                    <span className="font-theswarm text-success">{supply}</span>
                                                </p>
                                            </div>
                                            <div className="col-md-4">
                                                <p className="mb-3 font-outfit">
                                                    Price:{" "}
                                                    <span className="font-theswarm text-success">
                                                    {pricePerNFT} ETH
                                                  </span>
                                                </p>
                                            </div>
                                            <div className="col-md-5">
                                                <p className="mb-3 font-outfit">
                                                    Max:{" "}
                                                    <span className="font-theswarm text-success">
                                                {maxNftPerWallet} <small>per Wallet</small>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="item__block p-5 font-outfit mb-3">
                                            <h4 className="mb-5 font-mrb text-uppercase text-center item__block-title animate__animated animate__bounceIn">
                                                LIMITED SALE
                                            </h4>
                                            <div className="media mb-3 mx-2">
                                                <img
                                                    src="img/item-minting-02.gif"
                                                    className="mr-3 animate__animated animate__flipInX rounded-lg"
                                                    alt="..."
                                                    width="102px"
                                                />
                                                <div
                                                    className="media-body text-right align-self-center animate__animated animate__fadeInUp">
                                                    <p className="h5 mb-2">Price per NFT</p>
                                                    <p className="h3 font-theswarm mb-0 text-uppercase">
                                                        <span className="text-success">{pricePerNFT}</span> ETH
                                                        Each
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="item__block-quality mb-3">
                                                <div className="row align-items-center">
                                                    <div className="col-6">
                                                        <div className="input-group">
                                                              <span className="input-group-btn">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-minus btn-number"
                                                                    disabled={count == 1}
                                                                    data-type="minus"
                                                                    data-field="quant[1]"
                                                                    onClick={minus}
                                                                >
                                                                  &minus;
                                                                </button>
                                                              </span>
                                                            <input
                                                                type="text"
                                                                name="quant[1]"
                                                                className="form-control input-number"
                                                                value={count}
                                                                onChange={handleChange}
                                                                min="1"
                                                                max={maxMint}
                                                                disabled={true}
                                                            />
                                                            <span className="input-group-btn">
                                                            <button
                                                                type="button"
                                                                className="btn btn-plus btn-number"
                                                                data-type="plus"
                                                                data-field="quant[1]"
                                                                onClick={plus}
                                                                disabled={account === null && count == maxMint || count == maxNftPerWallet}
                                                            >
                                                              +
                                                            </button>
                                                          </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-6 text-right">
                                                        <button
                                                            className="btn btn-outline-success"
                                                            onClick={setMax}
                                                            disabled={account === null}
                                                        >
                                                            Set Max
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="mb-0 font-weight-bolder">Total:</p>
                                                </div>
                                                <div className="col-6">
                                                    <p className="mb-0 font-weight-bolder text-right">
                                                        {total} ETH
                                                    </p>
                                                </div>
                                            </div>
                                            <hr className="mb-4"/>
                                            <div className="row align-items-center item__block-foot">
                                                <div className="col-6">
                                                    <p className="mb-0">
                                                        <a
                                                            role="button"
                                                            onClick={viewContract}
                                                            className="text-success"
                                                            href={`https://rinkeby.etherscan.io/address/${config.address}`}
                                                            target="_blank"
                                                        >
                                                            View Contract
                                                        </a>
                                                    </p>
                                                </div>
                                                <div className="col-6 mb-0 text-right">
                                                    {/* <p className="mb-0"> */}
                                                    {account ?
                                                        <button
                                                            disabled={loading === "minting" && isWhitelist === "false" && isBlackList}
                                                            className="btn btn-success "
                                                            onClick={mintNow}
                                                        >
                                                            {loading === "minting" ? <div
                                                                className=" spinner-border-lg spinner-border text-lg text-light"
                                                                role="status">
                                                                <span className="sr-only">Loading...</span>
                                                            </div> : "Mint"}
                                                        </button>
                                                        : <div className="cta">
                                                            <button
                                                                className="nav-link text-nowrap w-100 btn btn-success"
                                                                onClick={connectWallet}
                                                            >
                                                            <span style={{marginLeft: "-43px"}}>
                                                                {btnText}
                                                            </span>
                                                            </button>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className="col-auto">
                                                    {message && (
                                                        <div
                                                            className="alert alert-warning mt-4"
                                                            role="alert"
                                                            dangerouslySetInnerHTML={{__html: message}}
                                                        >
                                                        </div>
                                                    )}
                                                    {error && (
                                                        <div className="alert alert-danger mt-4" role="alert"
                                                             dangerouslySetInnerHTML={{__html: error}}>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="font-mrb mb-0 mr-4 text-right">Used by ERC-721</p>
                                    </div>
                                    <div className="col-xl-7 order-xl-1">
                                        <figure
                                            className="mb-0 my-5 minting__pic animate__animated animate__bounceInLeft">
                                            <img
                                                src="img/minting-block.png"
                                                alt="..."
                                                className="img-fluid"
                                            />
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <footer>
                        <div className="container py-4">
                            <hr/>
                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <p className="mb-4 mb-md-0 font-outfit text-mob-center">
                                        &copy; 2022, ZNK. All Rights Reserved
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <nav
                                        className="nav justify-content-center justify-content-md-end font-outfit nav__footer">
                                        <a
                                            className="nav-link text-white py-0"
                                            role="button"
                                            onClick={privacyPolicy}
                                            href="https://znkgames.com/privacy.html"
                                            target="_blank"
                                        >
                                            Privacy Policy
                                        </a>
                                        <a
                                            className="nav-link text-white py-0"
                                            role="button"
                                            onClick={terms}
                                            href="https://znkgames.com/tos.html"
                                            target="_blank"
                                        >
                                            Terms & Conditions
                                        </a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>}

        </>
    );
}
