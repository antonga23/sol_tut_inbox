const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface, bytecode} = require('../compile');

const web3 = new Web3(ganache.provider());

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

});

describe('Inbox', () =>{
    it('deploys a contact', () => {
        assert.ok(inbox.options.address);
    });
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
