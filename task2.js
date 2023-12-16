
const web3 = new Web3(window.ethereum);

const aaveContractAddress = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9'; 
const erc20TokenAddress = '0xYourERC20TokenAddress';

const aaveContractABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_reserve",
        "type": "address"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }

];

const aaveContract = new web3.eth.Contract(aaveContractABI, aaveContractAddress);


window.ethereum.enable().then(async (accounts) => {
  const userAddress = accounts[0]; 

  const amountToDeposit = web3.utils.toWei('1', 'ether');

  const tokenContract = new web3.eth.Contract(erc20TokenABI, erc20TokenAddress);
  await tokenContract.methods.approve(aaveContractAddress, amountToDeposit).send({ from: userAddress });

  aaveContract.methods.deposit(erc20TokenAddress, amountToDeposit)
    .send({ from: userAddress, value: 0 })
    .on('transactionHash', (hash) => {
      console.log(`Transaction Hash: ${hash}`);
    })
    .on('confirmation', (confirmationNumber, receipt) => {
      console.log(`Confirmation Number: ${confirmationNumber}`);
      console.log(`Receipt: ${JSON.stringify(receipt)}`);
    })
    .on('error', (error) => {
      console.error(`Error: ${error.message}`);
    });
});