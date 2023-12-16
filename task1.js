
const Web3 = require('web3');
const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545'; 


const contractAddress = '0x04d5cE0A4AdDf259878A08a0454c310A525C46d4'; 
const contractABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_address",
        "type": "address"
      },
      {
        "name": "_payload",
        "type": "bytes"
      }
    ],
    "name": "transferFunds",
    "outputs": [
      {
        "name": "status",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


const yourBSCAddress = '0xYourBSCAddress';
const privateKey = 'YourPrivateKey';

const web3 = new Web3(new Web3.providers.HttpProvider(provider));


const contract = new web3.eth.Contract(contractABI, contractAddress);


const transferPayload = web3.eth.abi.encodeFunctionCall({
  name: 'transfer', 
  type: 'function',
  inputs: [
    {
      type: 'address',
      name: '_to'
    },
    {
      type: 'uint256',
      name: '_value'
    }
  ]
}, [yourBSCAddress, web3.utils.toWei('1', 'ether')]);


contract.methods.transferFunds(contractAddress, transferPayload)
  .send({ from: yourBSCAddress, gas: 2000000, gasPrice: 10000000000, value: 0, privateKey })
  .then((result) => {
    console.log('Transaction successful:', result);
  })
  .catch((error) => {
    console.error('Transaction failed:', error);
  });
