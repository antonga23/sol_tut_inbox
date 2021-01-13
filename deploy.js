const HDWalletProvdier = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvdier(
    'wink ice news dial truth outdoor either lock seek initial analyst odor',
    'https://rinkeby.infura.io/v3/8034a32beb4842c5bb8c5b5e37fed050'
);

const web3 = new Web3(provider);

const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguements:['Hi there!']})
    .send({gas: '1000000', from: accounts[0]});
