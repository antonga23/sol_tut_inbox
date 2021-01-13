const HDWalletProvdier = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvdier(
    'wink ice news dial truth outdoor either lock seek initial analyst odor',
    'https://rinkeby.infura.io/v3/8034a32beb4842c5bb8c5b5e37fed050'
);

const web3 = new Web3(provider);

const deploy = async () => { //function created to use async await
    const accounts = await web3.eth.getAccounts();
    console.log("Account:", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments:['Hi there!']})
    .send({gas: '1000000', from: accounts[0]});

    console.log("Contract deployed to", result.options.address);
};
deploy(); // call deploy function