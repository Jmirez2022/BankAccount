'use strict'

const { describe, it } = require('node:test');

class BankAccount {
    constructor(accountNumber, owner) {
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.transactions = []
    }

    balance(){
        let sum = 0;
        for(let i=0; i<this.transactions.length; i++){
          sum += this.transactions[i].amount;  
        }
        return sum;
    }

    charge(payee, amt){
        let chargeTransaction = new Transaction(-amt, payee);
        this.transactions.push(chargeTransaction);
    }

    deposit(amt){
        let depositTransaction = new Transaction(amt, this.owner);
        this.transactions.push(depositTransaction);
    }

}
class Transaction {
    constructor(amount, payee){
        this.amount = amount;
        this.payee = payee;
        this.date = new Date();
    }
}

//test

if (typeof describe === 'function') {
const assert = require('assert');

describe("#testing account creation", function(){
it('should create a new account correctly', function(){
        let acct1 = new BankAccount('xx2020', "Joe Mama");
        assert.equal(acct1.owner, 'Joe Mama');
        assert.equal(acct1.accountNumber, 'xx2020');
        assert.equal(acct1.transactions.length, 0);
        assert.equal(acct1.balance(), 0);
    });
    });

 describe("#testing account balance", function(){
it('should create a new account correctly', function(){
        let acct1 = new BankAccount('xx2020', "Joe Mama");
       assert.equal(acct1.balance(), 0);
       acct1.deposit(150)
       assert.equal(acct1.balance(), 150);
       acct1.charge("Walmart",-50);
       assert.equal(acct1.balance(), 100);
    });

    it('should not allow negative deposit', function(){
        let acct1 = new BankAccount('xx2020', "Joe Mama");
       assert.equal(acct1.balance(), 0);
       acct1.deposit(150)
       assert.equal(acct1.balance(), 150);
       acct1.deposit(-50);
       assert.equal(acct1.balance(), 150);
    });

});

    describe("#Testing transaction creation", function(){
        it('Should create a transaction correctly for deposit', function(){
            let t1 = new Transaction(100, "Deposit");
            assert.equal(t1.amount, 100);
            assert.equal(t1.payee, "Deposit");
            assert.notEqual(t1.date, undefined);
            assert.notEqual(t1.date, null);  
        });
        it('Should create a transaction correctly for a charge', function(){
            let t1 = new Transaction(-50.50, "Walmart");
            assert.equal(t1.amount, -50.50);
            assert.equal(t1.payee, "Deposit");
            assert.notEqual(t1.date, undefined);
            assert.notEqual(t1.date, null);
    });


})
}