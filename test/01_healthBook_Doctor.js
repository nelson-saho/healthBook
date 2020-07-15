var Doctor = artifacts.require("Doctor");
//expect = require("chai").expect;
chai = require("chai");
chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

expect = chai.expect;

contract("Test the Doctor contract", function(accounts) {
    let [alice, bob] = accounts;

    describe("Deploy the Doctor smart contract", function() {
        it("Catch an instance of the Doctor contract", function() {
            return Doctor.new().then(function(instance) {
                doctorContract = instance;
            });
        });
    });

    describe("Check the contract function", function() {
        it("Call the function addDoctor to add Nelson", function() {
            return doctorContract.addDoctor("Nelson", "Saho", "CNHU", alice).then(function(res) {
                expect(res).to.not.be.an("error");
            });
        });
        it("Check that the doctor firstname is Nelson", function() {
            return doctorContract.doctors(0).then(function(res) {
                expect(res.firstName.toString()).to.be.equal("Nelson");
                //console.log(res);
            });
        });
        it("Call the function addDoctor to add Josias -- should fail because of the sender", function() {
            return expect(doctorContract.addDoctor("Josias", "Gbetoho", "CNHU", bob, {"from": accounts[9]}))
            .to.be.eventually.rejected;
        });
        it("Call the function addDoctor to add Josias", function() {
            return doctorContract.addDoctor("Josias", "Gbetoho", "CNHU", bob).then(function(res) {
                expect(res).to.not.be.an("error");
            });
        });
        it("Check that the doctor firstname is Josias", function() {
            return doctorContract.doctors(1).then(function(res) {
                expect(res.firstName.toString()).to.be.equal("Josias");
                //console.log(res);
            });
        }); 
    });
})
