// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require("hardhat");
const { ethers } = require("hardhat");
const hre = require("hardhat");
const { async } = require("jshint/src/prod-params");

async function getBalances(address) {
  const balancBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balancBigInt); //returns address
}

async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}
async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp; // Access the timestamp property correctly
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, name ${name}, address ${from}, message ${message}`
    );
  }
}
async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const buying = await hre.ethers.getContractFactory("buying");
  const contract = await buying.deploy(); //instance of contract

  // const BuyingContract = await hre.ethers.getContractFactory("buying");
  // const contract = await BuyingContract.deploy();

  await contract.waitForDeployment();
  // console.log("Address of Contrac", contract.address);
  console.log("Address of Contrac", await contract.getAddress()); //in video contract address
  // console.log(`Address of Contract ${owner.address}`);
  const addresses = [owner.address, from1.address, from2.address];

  console.log("Before Buying Product");
  await consoleBalances(addresses);

  const amount = { value: hre.ethers.parseEther("1") };
  await contract
    .connect(from1)
    .buyProduct("Kishan", "very bad product", amount); //calling our contract from address 1,2,3 and giving name and address
  await contract
    .connect(from2)
    .buyProduct("Vismay", "very good product2", amount);
  await contract
    .connect(from3)
    .buyProduct("Utsav", "very nice nice product3", amount);

  console.log("After Buying Product");
  await consoleBalances(addresses);

  const memos = await contract.getMemos();
  consoleMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
