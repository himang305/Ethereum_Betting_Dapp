const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

const NFT = {
  // address: "0x8aad10591735dc758dd8059ac1aeb4758994d55b",
  address: "0xEC3503676BEb1d7cf7152E2c0b33818A6713756a",
  abi: [{"constant":true,"inputs":[{"name":"player","type":"address"}],"name":"checkPlayerExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"AmountOne","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"playerInfo","outputs":[{"name":"amountBet","type":"uint256"},{"name":"teamSelected","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalBetsTwo","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"AmountTwo","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"teamWinner","type":"uint16"}],"name":"distributePrizes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_teamSelected","type":"uint8"}],"name":"Bet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"totalBetsOne","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]
};

async function connectWallet(){
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  let userAddress = await signer.getAddress();
  document.getElementById("userAddress").innerText =
  userAddress.slice(0, 8) + "...";

  const nftContract = new ethers.Contract(NFT.address, NFT.abi, signer);
  
  let totalA = await nftContract.totalBetsOne();
  totalA = ethers.utils.formatUnits(totalA, "ether");
  let totalB = await nftContract.totalBetsTwo();
  totalB = ethers.utils.formatUnits(totalB, "ether");

  document.getElementById("totalA").innerHTML = "Total Amount : "+totalA +" BNB";
  document.getElementById("totalB").innerHTML = "Total Amount : "+totalB +" BNB";

}


async function betA() {
  /*=======
    CONNECT TO METAMASK
    =======*/
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  let userAddress = await signer.getAddress();
  document.getElementById("userAddress").innerText =
  userAddress.slice(0, 8) + "...";

  /*======
    INITIALIZING CONTRACT
    ======*/
  const nftContract = new ethers.Contract(NFT.address, NFT.abi, signer);

  var bet = document.getElementById("teamAbet").value;
  bet = ethers.utils.parseEther(bet);

 const tx = await nftContract.Bet(1,{value:bet});
 console.log(`Transaction hash: ${tx.hash}`);

  const receipt = await tx.wait();
  console.log("Status = ",receipt.status);

}

async function betB() {
  /*=======
    CONNECT TO METAMASK
    =======*/
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  let userAddress = await signer.getAddress();
  document.getElementById("userAddress").innerText =
  userAddress.slice(0, 8) + "...";

  /*======
    INITIALIZING CONTRACT
    ======*/
  const nftContract = new ethers.Contract(NFT.address, NFT.abi, signer);

  var bet = document.getElementById("teamBbet").value;
  bet = ethers.utils.parseEther(bet);

 const tx = await nftContract.Bet(2,{value:bet});
 console.log(`Transaction hash: ${tx.hash}`);

  const receipt = await tx.wait();
  console.log("Status = ",receipt.status);

}


async function winA() {
  /*=======
    CONNECT TO METAMASK
    =======*/
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  let userAddress = await signer.getAddress();
  document.getElementById("userAddress").innerText =
  userAddress.slice(0, 8) + "...";

  /*======
    INITIALIZING CONTRACT
    ======*/
  const nftContract = new ethers.Contract(NFT.address, NFT.abi, signer);
  const tx = await nftContract.distributePrizes(1);
  console.log(`Transaction hash: ${tx.hash}`);

  const receipt = await tx.wait();
  console.log("Status = ",receipt.status);

}


async function winB() {
  /*=======
    CONNECT TO METAMASK
    =======*/
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  let userAddress = await signer.getAddress();
  document.getElementById("userAddress").innerText =
  userAddress.slice(0, 8) + "...";

  /*======
    INITIALIZING CONTRACT
    ======*/
  const nftContract = new ethers.Contract(NFT.address, NFT.abi, signer);
  const tx = await nftContract.distributePrizes(2);
  console.log(`Transaction hash: ${tx.hash}`);

  const receipt = await tx.wait();
  console.log("Status = ",receipt.status);

}
