var Put = require('bufferput');
var buffertools = require('buffertools');
var hex = function(hex) {
  return new Buffer(hex, 'hex');
};

exports.livenet = {
  name: 'livenet',
  magic: hex('fdc0a5f1'),
  addressVersion: 0x23,
  privKeyVersion: 128,
  P2SHVersion: 8,
  hkeyPublicVersion: 0x0488b21e,
  hkeyPrivateVersion: 0x0488ade4,
  genesisBlock: {
    hash: hex('ea1c3eff7c4b2767ba561cddfcecd741905cea385dc378e20807f99d1c78c709'),
    merkle_root: hex('00232baba7291c9d844bb24867aafe453ea7e290685612552d595adc8d0c0f73'),
    height: 0,
    nonce: 1000112548,
    version: 1,
    prev_hash: buffertools.fill(new Buffer(32), 0),
    timestamp: 1371488396,
    bits: 486604799,
  },
  dnsSeeds: [
    'florincoin.zapto.org'
  ],
  defaultClientPort: 7312
};

exports.mainnet = exports.livenet;

exports.testnet = {
  name: 'testnet',
  magic: hex('0b110907'),
  addressVersion: 0x6f,
  privKeyVersion: 239,
  P2SHVersion: 196,
  hkeyPublicVersion: 0x043587cf,
  hkeyPrivateVersion: 0x04358394,
  genesisBlock: {
    hash: hex('43497FD7F826957108F4A30FD9CEC3AEBA79972084E90EAD01EA330900000000'),
    merkle_root: hex('3BA3EDFD7A7B12B27AC72C3E67768F617FC81BC3888A51323A9FB8AA4B1E5E4A'),
    height: 0,
    nonce: 414098458,
    version: 1,
    prev_hash: buffertools.fill(new Buffer(32), 0),
    timestamp: 1296688602,
    bits: 486604799,
  },
  dnsSeeds: [
    'testnet-seed.bitcoin.petertodd.org',
    'testnet-seed.bluematt.me'
  ],
  defaultClientPort: 18333
};
