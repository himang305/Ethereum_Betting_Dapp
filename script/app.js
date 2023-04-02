

"use strict";


const NFT = {
 address: "0x8aad10591735dc758dd8059ac1aeb4758994d55b",
//  address: "0xEC3503676BEb1d7cf7152E2c0b33818A6713756a",
 // address: "0xaa0E1E69fc467221b5128F4942284b1bDdbeF7ED",
 abi: [{"constant":true,"inputs":[{"name":"player","type":"address"}],"name":"checkPlayerExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"AmountOne","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"playerInfo","outputs":[{"name":"amountBet","type":"uint256"},{"name":"teamSelected","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalBetsTwo","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"AmountTwo","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"teamWinner","type":"uint16"}],"name":"distributePrizes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_teamSelected","type":"uint8"}],"name":"Bet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"totalBetsOne","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]
};

// Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
// const EvmChains = window.EvmChains;
// const Fortmatic = window.Fortmatic;

// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let provider;

// Address of the selected account
let selectedAccount;

function connectWallet() {

 console.log("Initializing example");

 const providerOptions = {
   walletconnect: {
     package: WalletConnectProvider,
     options: {
       rpc: {
        56: 'https://bsc-dataseed.binance.org', 
       },
        network: "binance",
     },
     // options: {
     // //   rpc: {
        //  97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
     // //    56: 'https://bsc-dataseed.binance.org'
     // // },
     // // // network: 'binance',
     // // netwrok: 'binance-testnet',
     //   // infuraId: "d551f8fdb8244186a3e185b526d16a3a"
     // }

   }

 };

 web3Modal = new Web3Modal({
   cacheProvider: false, // optional
   providerOptions, // required
 });


 onConnect();

}

/**
* Kick in the UI action after Web3modal dialog has chosen a provider
*/
async function fetchAccountData() {

 // Get a Web3 instance for the wallet
 const web3 = new Web3(provider);

 console.log("Web3 instance is", web3);

 // Get connected chain id from Ethereum node
 const chainId = await web3.eth.getChainId();
 console.log("chain = ",chainId);
 // Load chain information over an HTTP API
 // const chainData = await EvmChains.getChain(chainId);
 // document.querySelector("#network-name").textContent = chainData.name;

 // Get list of accounts of the connected wallet
 const accounts = await web3.eth.getAccounts();

 // MetaMask does not give you all accounts, only the selected account
 console.log("Got accounts", accounts);
 selectedAccount = accounts[0];

 document.getElementById("userAddress").innerText =
 selectedAccount.slice(0, 8) + "...";

 var nftContract = new web3.eth.Contract(NFT.abi, NFT.address);
  
 let totalA = await nftContract.methods.totalBetsOne().call();
 totalA = web3.utils.fromWei(totalA,'ether')
 let totalB = await nftContract.methods.totalBetsTwo().call();
 totalB = web3.utils.fromWei(totalB,'ether')


 document.getElementById("totalA").innerHTML = "Total Amount : "+totalA +" BNB";
 document.getElementById("totalB").innerHTML = "Total Amount : "+totalB +" BNB";

 document.getElementById("walletbutton").innerHTML = "Disconnect";
 document.getElementById("walletbutton").setAttribute( "onClick", "javascript: onDisconnect();" );

}

async function onConnect() {

 console.log("Opening a dialog", web3Modal);
 try {
   provider = await web3Modal.connect();
   await fetchAccountData(provider);
 } catch(e) {
   console.log("Could not get a wallet connection", e);
   return;
 }

}

/**
* Disconnect wallet button pressed.
*/
async function onDisconnect() {

 console.log("Killing the wallet connection", provider);

 // TODO: Which providers have close method?
 if(provider.close) {
   await provider.close();

   await web3Modal.clearCachedProvider();
   provider = null;
 }

 selectedAccount = null;
 document.getElementById("userAddress").innerText = "...";

 document.getElementById("walletbutton").innerHTML = "Connect Wallet";
 document.getElementById("walletbutton").setAttribute( "onClick", "javascript: connectWallet();" );

}

async function betA(){

 const web3 = new Web3(provider);
 const accounts = await web3.eth.getAccounts();

 var nftContract = new web3.eth.Contract(NFT.abi, NFT.address);
 console.log("account = ", accounts[0]);

 var bet = document.getElementById("teamAbet").value;
 bet =  web3.utils.toWei(bet);
 console.log(bet);

 let coolNumber = await nftContract.methods.Bet(1).send({ from: accounts[0], value: String(bet)  })
       .on('transactionHash', function (hash) {
         console.log(hash);
         alert("Transaction successful, wait for few seconds for automatic reload");
       })
       .on('receipt', function (receipt) {
         alert('Success');
       })
       .on('error', function (error, receipt) {
         console.log(error);
       });
}
   
async function betB(){

  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
 
  var nftContract = new web3.eth.Contract(NFT.abi, NFT.address);
  console.log("account = ", accounts[0]);
 
  var bet = document.getElementById("teamBbet").value;
  bet =  web3.utils.toWei(bet);
  console.log(bet);
 
  let coolNumber = await nftContract.methods.Bet(2).send({ from: accounts[0], value: String(bet)  })
        .on('transactionHash', function (hash) {
          console.log(hash);
          alert("Transaction successful, wait for few seconds for automatic reload");
        })
        .on('receipt', function (receipt) {
          alert('Success');
        })
        .on('error', function (error, receipt) {
          console.log(error);
        });
 }


// async function winA() {
//   /*=======
//     CONNECT TO METAMASK
//     =======*/
//   await provider.send("eth_requestAccounts", []);
//   const signer = provider.getSigner();
//   let userAddress = await signer.getAddress();
//   document.getElementById("userAddress").innerText =
//   userAddress.slice(0, 8) + "...";

//   /*======
//     INITIALIZING CONTRACT
//     ======*/
//   const nftContract = new ethers.Contract(NFT.address, NFT.abi, signer);
//   const tx = await nftContract.distributePrizes(1);
//   console.log(`Transaction hash: ${tx.hash}`);

//   const receipt = await tx.wait();
//   console.log("Status = ",receipt.status);

// }


// async function winB() {
//   /*=======
//     CONNECT TO METAMASK
//     =======*/
//   await provider.send("eth_requestAccounts", []);
//   const signer = provider.getSigner();
//   let userAddress = await signer.getAddress();
//   document.getElementById("userAddress").innerText =
//   userAddress.slice(0, 8) + "...";

//   /*======
//     INITIALIZING CONTRACT
//     ======*/
//   const nftContract = new ethers.Contract(NFT.address, NFT.abi, signer);
//   const tx = await nftContract.distributePrizes(2);
//   console.log(`Transaction hash: ${tx.hash}`);

//   const receipt = await tx.wait();
//   console.log("Status = ",receipt.status);

// }
