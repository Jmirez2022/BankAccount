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
        let currentBalance = this.balance();
        if(amt <= currentBalance) {
        let chargeTransaction = new Transaction(-amt, payee);
        this.transactions.push(chargeTransaction);
        }
    }

    deposit(amt){
        if(amt > 0){
            let depositTransaction = new Transaction(amt, this.owner);
            this.transactions.push(depositTransaction);
        }    
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

    it('should not allow charging to overdraft', function(){
        let acct1 = new BankAccount('xx2020', "Joe Mama");
       assert.equal(acct1.balance(), 0);
       acct1.charge("Walmart", 50);
       assert.equal(acct1.balance(), 0);
    });

    it('should allow a refund', function(){
        let acct1 = new BankAccount('xx2020', "Joe Mama");
       assert.equal(acct1.balance(), 0);
       acct1.charge("Walmart", -50);
       assert.equal(acct1.balance(), 50);
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

    describe(" Transactrions and tests", function(){
        let bigAccount = new BankAccount("12345678", "Will Smith");
        it("test account created correctly", function(){
            assert.equal("12345678", bigAccount.accountNumber);
            assert.equal("Will Smith", bigAccount.owner);
            assert.equal(bigAccount.balance(), 0);
        });

        it("test deposits", function(){
            bigAccount.deposit(100); //100
            assert.equal('Deposit', bigAccount.transactions[0].payee)
            assert.equal(100, bigAccount.transactions[0].amount)          
            bigAccount.deposit(50);  //150
            bigAccount.deposit(-3); //150
            bigAccount.deposit(80.50); //230.50
            bigAccount.deposit(10000.50); //10,231
            assert.equal(10231, bigAccount.balance());
            bigAccount.charge("Clearout", 10231);
            assert.equal(0, bigAccount.balance());
        });

        it("test charges", function(){
            bigAccount.deposit(10000);
            bigAccount.charge("Walmart", 50);  //9,950
            bigAccount.charge("Wingstop", 75.25);  //9,874.75
            bigAccount.charge("Best Buy", 550.70);  //9,324.05
            bigAccount.charge("Gamestop", -63.20); //9,387.25
            assert.equal(9387.25, bigAccount.balance());
            assert.equal(10, bigAccount.transactions.length);
        });

        it("test overdraft", function(){
            
            bigAccount.charge("Walmart", 500000);
            assert.equal(10, bigAccount.transactions.length);
            assert.equal(9387.25, bigAccount.balance());
        });

        it("test a zero depsoit", function(){
            bigAccount.deposit(0)
            assert.equal(11, bigAccount.transactions.length);
            assert.equal(9387.25, bigAccount.balance());
        })
       
    });
}