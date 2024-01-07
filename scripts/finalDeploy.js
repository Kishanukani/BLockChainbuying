const { ethers } = require("hardhat");
const hre = require("hardhat");

// async function main() {
//   // const [owner] = await hre.ethers.getSigners();
//   const buying = await hre.ethers.getContractFactory("buying");
//   const contract = await buying.deploy(); //instance of contract

//   // const BuyingContract = await hre.ethers.getContractFactory("buying");
//   // const contract = await BuyingContract.deploy();

//   // console.log("Address of Contrac", contract.address);
//   await contract.waitForDeployment();
//   console.log("Address of Contrac", this.contract.getAddress()); //in video contract address
// }
async function main() {
  // const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const buying = await ethers.getContractFactory("buying");
  const contract = await buying.deploy(); //instance of contract
  await contract.waitForDeployment();
  console.log("Address of Contrac", await contract.getAddress());
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// const hre = require("hardhat");

// async function main() {
//   const chai = await hre.ethers.getContractFactory("chai");
//   const contract = await chai.deploy(); //instance of contract

//   await contract.deployed();
//   console.log("Address of contract:", contract.address);
// }
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
