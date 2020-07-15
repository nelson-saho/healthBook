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
    describe("Try to add a Specialty Medicine taked by the patients", function() {
        it("Add a medicine taked by Fabrice Azithro", function() {
            return patientContract.prescribeSpecialtyMedicine(32, "A1", "Azithromicine", "2019-12-05", "2019-12-10", "mg", 500, "2019-12-04", "", 0, {"from": nelson}).then(function(res) {
                expect(res).to.not.be.an("error");
            });
        });
        it("Add a medicine taked by Fabrice Para", function() {
            return patientContract.prescribeSpecialtyMedicine(32, "P1", "Para", "2019-12-05", "2019-12-10", "mg", 500, "2019-12-04", "", 0, {"from": nelson}).then(function(res) {
                expect(res).to.not.be.an("error");
            });
        });
        it("Add a medicine taked by Odette", function() {
            return patientContract.prescribeSpecialtyMedicine(33, "A1", "Azithromicine", "2019-12-05", "2019-12-10", "mg", 500, "2019-12-04", "", 1, {"from": nelson}).then(function(res) {
                expect(res).to.not.be.an("error");
            });
        });
        it("Add a medicine taked by Bertho", function() {
            return patientContract.prescribeSpecialtyMedicine(34, "A1", "Azithromicine", "2019-12-05", "2019-12-10", "mg", 500, "2019-12-04", "", 2, {"from": nelson}).then(function(res) {
                expect(res).to.not.be.an("error");
            });
        });
        it("Add a medicine taked by Fabrice Para with a non doctor", function() {
            return expect(patientContract.prescribeSpecialtyMedicine(32, "P1", "Para", "2019-12-05", "2019-12-10", "mg", 500, "2019-12-04", "", 2, {"from": malory}))
            .to.be.eventually.rejected;
        });
        it("Try to set observation for Fabrice", function() {
            return patientContract.setObservationAfterPrescription(0, 32, "A1", "Developp an allergy").then(function(res) {
                expect(res).to.not.be.an("error");
            });
        });
        it("Try to set another observation for Fabrice", function() {
            return patientContract.setObservationAfterPrescription(0, 32, "A1", "Recover health").then(function(res) {
                expect(res).to.not.be.an("error");
            });
        });
        it("Try to get all medicine took by Fabrice (Fabrice has be prescribed two speciality medicine", function() {
            return patientContract.getAllPrescribeMedicine(0).then(function(res) {
                expect(res).to.have.lengthOf(2);
                //console.log(res);
            });
        });
    });
})