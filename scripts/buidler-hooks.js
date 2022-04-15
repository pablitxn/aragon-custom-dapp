/*
 * These hooks are called by the Aragon Buidler plugin during the start task's lifecycle. Use them to perform custom tasks at certain entry points of the development build process, like deploying a token before a proxy is initialized, etc.
 *
 * Link them to the main buidler config file (buidler.config.js) in the `aragon.hooks` property.
 *
 * All hooks receive two parameters:
 * 1) A params object that may contain other objects that pertain to the particular hook.
 * 2) A "bre" or BuidlerRuntimeEnvironment object that contains enviroment objects like web3, Truffle artifacts, etc.
 *
 * Please see AragonConfigHooks, in the plugin's types for further details on these interfaces.
 * https://github.com/aragon/buidler-aragon/blob/develop/src/types.ts#L31
 */

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

module.exports = {
  // Called before a dao is deployed.
  preDao: async ({ log }, { web3, artifacts }) => {},

  // Called after a dao is deployed.
  postDao: async (
    { dao, _experimentalAppInstaller, log },
    { web3, artifacts }
  ) => {},

  // Called after the app's proxy is created, but before it's initialized.
  preInit: async (
    { proxy, _experimentalAppInstaller, log },
    { web3, artifacts }
  ) => {},

  // Called after the app's proxy is initialized.
  postInit: async (
    { proxy, _experimentalAppInstaller, log },
    { web3, artifacts }
  ) => {},

  // Called when the start task needs to know the app proxy's init parameters.
  // Must return an array with the proxy's init parameters.
  getInitParams: async function ({}, bre) {
    const bigExp = (x, y) =>
      bre.web3.utils
        .toBN(x)
        .mul(bre.web3.utils.toBN(10).pow(bre.web3.utils.toBN(y)))
    pct16 = (x) => bigExp(x, 16)

    const minime = await _deployMinimeToken(bre)

    return [
      minime.address,
      pct16(50), // support 50%
      pct16(25), // quorum 15%
      604800, // 7 days,
    ]
  },

  // Called after the app's proxy is updated with a new implementation.
  postUpdate: async ({ proxy, log }, { web3, artifacts }) => {},
}

async function _deployMinimeToken(bre) {
  const MiniMeTokenFactory = await bre.artifacts.require("MiniMeTokenFactory")
  const MiniMeToken = await bre.artifacts.require("MiniMeToken")
  const factory = await MiniMeTokenFactory.new()
  const token = await MiniMeToken.new(
    factory.address,
    ZERO_ADDRESS,
    0,
    "MiniMe Test Token",
    18,
    "MMT",
    true
  )
  return token
}
