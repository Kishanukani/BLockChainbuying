async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const buying = await hre.ethers.getContractFactory("buying");
  const contract = await buying.deploy(); //instance of contract

  // const BuyingContract = await hre.ethers.getContractFactory("buying");
  // const contract = await BuyingContract.deploy();

  await contract.waitForDeployment();
  // console.log("Address of Contrac", contract.address);
  console.log("Address of Contrac", contract.getAddress);