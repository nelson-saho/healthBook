var Patient = artifacts.require("Patient");

chai = require("chai");
chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
expect = chai.expect;

contract("Test the Patient contract", function(accounts) {
    let [nelson, josias, malory] = accounts;

    describe("Deploy the Patient smart contract", function() {
        it("Catch an instance of the Patient contract", function() {
            return Patient.new().then(function(instance) {
                patientContract = instance;
            });
        });
    });

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

    describe("It checks if someone is a doctor", function() {
        it("It checks nelson doctorCount", function() {
            return patientContract.doctorCount(nelson).then(function(res) {
                expect(res.toString()).to.be.equal("1");
                //console.log(res);
            })
        });

        it("It checks josias doctorCount", function() {
            return patientContract.doctorCount(josias).then(function(res) {
                expect(res.toString()).to.be.equal("1");
                //console.log(res);
            })
        });
    });

    describe("Check Patient function adding", function() {
        it("Call the function addPatient for Fabrice by non-doctor", function() {
            return expect(patientContract.addPatient("Fabrice", "Adjaffon", "F", "Togbin", {"from": malory}))
            .to.be.eventually.rejected;
        });
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
        it("print the first patient", function() {
            return patientContract.patients(0).then(function(res) {
                //expect(res).to.not.be.an("error");
                console.log(res);
            });
        });
        it("Call the function getAllPatient and check if the first name of the third patient is Bertho", function() {
            return patientContract.getAllPatient().then(function(res) {
                expect(res[2].firstName.toString()).to.be.equal("Bertho");
                //console.log(res); Affiche un tableau de patient
            });
        });
    });
})