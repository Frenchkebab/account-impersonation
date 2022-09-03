const { expect } = require('chai');
const { ethers } = require('hardhat');

const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

describe('Test unlock account', () => {
  let accounts;
  let dai;
  let whale; // account that holds dai we're going to unlock

  before(async () => {
    accounts = await ethers.getSigners();

    dai = await ethers.getContractAt('IERC20', DAI);
  });
});
