require('@nomicfoundation/hardhat-ethers');

const privateKey = '0844827bce07cc0d794d5ed7daf3cc9b42d2c27aa83eb9e761fe3c2aa467297d';

module.exports = {
  solidity: "0.8.24",
  networks: {
    moonbase: {
      url: 'https://rpc.api.moonbase.moonbeam.network',
      chainId: 1287,
      accounts: [privateKey],
    },
  }
};
