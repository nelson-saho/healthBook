/* To test NonVariableExamination contract
First of all add doctor and patient and add tne non variable examination*/

var Patient = artifacts.require("Patient");

chai = require("chai");
chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
expect = chai.expect;

contract("Test the Patient contract", function(accounts) {
    let [nelson, josias, malory] = accounts;
    // Deploy the contract
    describe("Deploy the Patient smart contract", function() {
        it("Catch an instance of the Patient contract", function() {
            return Patient.new().then(function(instance) {
                patientContract = instance;
            });
        });
    });
    //Add Doctors
    describe("Add doctors Nelson and Josias", function() {
        it("Call the function addDoctor to add Nelson", function() {
            return patientContract.addDoctor("Nelson", "Saho", "CNHU", nelson).then(function(res) {
                expect(res).to.not.be.an("error");
            });
        });   
        it("Call the function addDoctor to add Josias", function() {
            return patientContract.addDoctor("Josias", "Gbetoho", "CNHU", josias).then(function(res) {
                expect(res).to.not.be.an("error");
            });
        });
    });
    // Add patients
    describe("Check Patient function adding", function() {
        it("Call the function addPatient for Fabrice", function() {
            return patientContract.addPatient("Fabrice", "Adjaffon", "F", "Togbin", {"from": nelson}).then(function(res) {
                expect(res).to.not.be.an("error");
            });
        });
        it("Call the function addPatient for Odette", function() {
            return patientContract.addPatient("Odette", "Adjaffon", "F", "Togbin", {"from": nelson}).then(function(res) {
                expect(res).to.not.be.an("error");
            });
        });
        it("Call the function addPatient for Bertho", function() {
            return patientContract.addPatient("Bertho", "Ganta", "M", "Agla", {"from": josias}).then(function(res) {
                expect(res).to.not.be.an("error");
            });
        });
    });
    // Add NonVariableExamination
    describe("Try to set non Variable examination for the patients", function() {
        it("Add NonVariableExamination for Fabrice", function() {
            return patientContract.setNonVariableExamination("O", "+", "AA", 0, {"from": josias}).then(function(res) {
                expect(res).to.not.be.an("error");
            })
        });
        it("Add NonVariableExamination for Odette", function() {
            return patientContract.setNonVariableExamination("O", "-", "AA", 1, {"from": nelson}).then(function(res) {
                expect(res).to.not.be.an("error");
            })
        });
        it("Add NonVariableExamination for Bertho", function() {
            return expect(patientContract.setNonVariableExamination("B", "+", "AA", 2, {"from": malory}))
            .to.be.eventually.rejected;
        });
        it("Add NonVariableExamination for Fabrice", function() {
            return patientContract.setNonVariableExamination("B", "+", "AA", 2, {"from": nelson}).then(function(res) {
                expect(res).to.not.be.an("error");
            })
        });
        it("Reject add NonVariableExamination for Fabrice", function() {
            return expect(patientContract.setNonVariableExamination("O", "+", "AS", 0, {"from": nelson}))
            .to.be.eventually.rejected; 
        });
        it("Get NonVariableExamination for Fabrice", function() {
            return patientContract.getNonVariableExamination(0).then(function(res) {
                expect(res.bloodGroup.toString()).to.be.equal("O");
            });
        });
    });
})