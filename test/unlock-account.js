const { expect } = require('chai');
const { ethers, network } = require('hardhat');

const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const DAI_WHALE = '0x2FAF487A4414Fe77e2327F0bf4AE2a264a776AD2';

describe('Test unlock account', () => {
  let accounts;
  let dai;
  let whale; // account that holds dai we're going to unlock

  before(async () => {
    accounts = await ethers.getSigners();

    await network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [DAI_WHALE],
    });

    dai = await ethers.getContractAt('IERC20', DAI);
    whale = await ethers.getSigners(DAI_WHALE);
  });

  it('unlocks account', async () => {
    const amount = 100n * 10n ** 18n;

    console.log('DAI balance of whale', await dai.balanceOf(whale.address));
    expect(await dai.balanceOf(whale.address)).to.gte(amount);

    await dai.connect(whale).transfer(accounts[0].address, amount);

    console.log(
      'DAI balance of account',
      await dai.balanceOf(accounts[0].address)
    );
  });
});
