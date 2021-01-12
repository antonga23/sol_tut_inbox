const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface, bytecode} = require('../compile');

const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let inbox;

beforeEach(async () => {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts()
        // .then(fetchedAccounts => { resolving the prmosing traditionally
        //     console.log(fetchedAccounts);
        // });

    //Use one of the accounts to deploy the contact
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hi there!']})
        .send({from: accounts[0], gas: 1000000});

    inbox.setProvider(provider);
});

describe('Inbox', () =>{
    it('deploys a contact', () => {
        assert.ok(inbox.options.address); // assert that contacrt has been deployed and has an address
    });

    it('has a default message', async () =>{
        const message = await inbox.methods.message().call(); // since message() is not a transaction on the chain call() is empty
        assert.equal(message, 'Hi there!');
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({from: accounts[0]}); //send a transaction to update the message
        const message = await inbox.methods.message().call(); // get updated value for message
        assert.equal(message, 'bye'); //check message is updated
    })
});


// class Car {
//     park(){
//         return 'stopped';
//     }

//     drive(){
//         return 'vroom'
//     }
// }

// let car;

// beforeEach(() => {
//     car = new Car();

// })

// describe('Car', ()=>{
//     it('can park', () =>{
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom');
//     });
// });

