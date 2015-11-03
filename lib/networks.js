'use strict';
var _ = require('lodash');

var BufferUtil = require('./util/buffer');
var JSUtil = require('./util/js');
var networks = [];
var networkMaps = {};

/**
 * A network is merely a map containing values that correspond to version
 * numbers for each bitcoin network. Currently only supporting "livenet"
 * (a.k.a. "mainnet") and "testnet".
 * @constructor
 */
function Network() {}

Network.prototype.toString = function toString() {
  return this.name;
};

/**
 * @function
 * @member Networks#get
 * Retrieves the network associated with a magic number or string.
 * @param {string|number|Network} arg
 * @param {string|Array} keys - if set, only check if the magic number associated with this name matches
 * @return Network
 */
function get(arg, keys) {
  if (~networks.indexOf(arg)) {
    return arg;
  }
  if (keys) {
    if (!_.isArray(keys)) {
      keys = [keys];
    }
    var containsArg = function(key) {
      return networks[index][key] === arg;
    };
    for (var index in networks) {
      if (_.any(keys, containsArg)) {
        return networks[index];
      }
    }
    return undefined;
  }
  return networkMaps[arg];
}

/**
 * @function
 * @member Networks#add
 * Will add a custom Network
 * @param {Object} data
 * @param {string} data.name - The name of the network
 * @param {string} data.alias - The aliased name of the network
 * @param {Number} data.pubkeyhash - The publickey hash prefix
 * @param {Number} data.privatekey - The privatekey prefix
 * @param {Number} data.scripthash - The scripthash prefix
 * @param {Number} data.xpubkey - The extended public key magic
 * @param {Number} data.xprivkey - The extended private key magic
 * @param {Number} data.networkMagic - The network magic number
 * @param {Number} data.port - The network port
 * @param {Array}  data.dnsSeeds - An array of dns seeds
 * @return Network
 */
function addNetwork(data) {

  var network = new Network();

  JSUtil.defineImmutable(network, {
    name: data.name,
    alias: data.alias,
    pubkeyhash: data.pubkeyhash,
    privatekey: data.privatekey,
    scripthash: data.scripthash,
    xpubkey: data.xpubkey,
    xprivkey: data.xprivkey,
    networkMagic: BufferUtil.integerAsBuffer(data.networkMagic),
    port: data.port,
    dnsSeeds: data.dnsSeeds
  });

  _.each(network, function(value) {
    if (!_.isUndefined(value) && !_.isObject(value)) {
      networkMaps[value] = network;
    }
  });

  networks.push(network);

  return network;

}

/**
 * @function
 * @member Networks#remove
 * Will remove a custom network
 * @param {Network} network
 */
function removeNetwork(network) {
  for (var i = 0; i < networks.length; i++) {
    if (networks[i] === network) {
      networks.splice(i, 1);
    }
  }
  for (var key in networkMaps) {
    if (networkMaps[key] === network) {
      delete networkMaps[key];
    }
  }
}

addNetwork({
  name: 'livenet',
  alias: 'mainnet',
  pubkeyhash: 0x00,
  privatekey: 0x80,
  scripthash: 0x05,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4,
  networkMagic: 0xf9beb4d9,
  port: 8333,
  dnsSeeds: [
    'seed.bitcoin.sipa.be',
    'dnsseed.bluematt.me',
    'dnsseed.bitcoin.dashjr.org',
    'seed.bitcoinstats.com',
    'seed.bitnodes.io',
    'bitseed.xf2.org'
  ]
});

addNetwork({
  name: 'testnet',
  alias: 'testnet',
  pubkeyhash: 0x6f,
  privatekey: 0xef,
  scripthash: 0xc4,
  xpubkey: 0x043587cf,
  xprivkey: 0x04358394,
  networkMagic: 0x0b110907,
  port: 18333,
  dnsSeeds: [
    'testnet-seed.bitcoin.petertodd.org',
    'testnet-seed.bluematt.me',
    'testnet-seed.alexykot.me',
    'testnet-seed.bitcoin.schildbach.de'
  ],
});

addNetwork({
  name: 'dogecoin',
  alias: 'dogecoin',
  pubkeyhash: 0x1e,
  privatekey: 0x9e,
  scripthash: 0x22,
  xpubkey: 0x0488c42e,
  xprivkey: 0x0488e1f4,
  networkMagic: 0xc0c0c0c0,
  port: 22556,
  dnsSeeds: [
    'seed.dogecoin.com',
    'seed.multidoge.org',
    'seed2.multidoge.org',
    'seed.doger.dogecoin.com'
  ],
});

addNetwork({
  name: 'litecoin',
  alias: 'litecoin',
  pubkeyhash: 0x30,
  privatekey: 0xb0,
  scripthash: 0x05,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4,
  networkMagic: 0xfbc0b6db,
  port: 9333,
  dnsSeeds: [
    'dnsseed.litecointools.com',
    'dnsseed.litecoinpool.org',
    'dnsseed.ltc.xurious.com',
    'dnsseed.koin-project.com',
    'dnsseed.weminemnc.com'
  ],
});

addNetwork({
  name: 'dash',
  alias: 'dash',
  pubkeyhash: 0x4c,
  privatekey: 0xcc,
  scripthash: 0x16,
  xpubkey: 0x02fe52f8,
  xprivkey: 0x02fe52cc,
  networkMagic: 0xbf0c6bbd,
  port: 9999,
  dnsSeeds: [
    'dnsseed.darkcoin.io',
    'dnsseed.darkcoin.qa',
    'dnsseed.ltc.xurious.com',
    'dnsseed.masternode.io',
    'dnsseed.dashpay.io'
  ],
});

addNetwork({
  name: 'peercoin',
  alias: 'peercoin',
  pubkeyhash: 0x37,
  privatekey: 0xb7,
  scripthash: 0x05,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4,
  networkMagic: 0xbf0c6bbd,
  port: 9901,
  dnsSeeds: [
    'seed.ppcoin.net',
    'seedppc.ppcoin.net',
    'ppcseed.ns.7server.net',
    'dnsseed.ppc.altcointech.net',
    'seed.diandianbi.org',
    'tnseed.ppcoin.net',
    'tnseedppc.ppcoin.net'
  ],
});

addNetwork({
  name: 'namecoin',
  alias: 'namecoin',
  pubkeyhash: 0x34,
  privatekey: 0xB4,
  scripthash: 0x13,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4,
  networkMagic: 0xf9beb4fe,
  port: 8334,
  dnsSeeds: [
    'namecoindnsseed.digi-masters.com',
    'namecoindnsseed.digi-masters.uk',
    'seed.namecoin.domob.eu',
    'nmc.seed.quisquis.de',
    'dnsseed.namecoin.webbtc.com'
  ],
});

addNetwork({
  name: 'digibyte',
  alias: 'digibyte',
  pubkeyhash: 0x1e,
  privatekey: 0x80,
  scripthash: 0x05,
  xpubkey:  0x0488b21e,
  xprivkey: 0x0488ade4,
  networkMagic: 0xfac3b6da,
  port: 12024,
  dnsSeeds: [
    '74.208.230.160',
    '216.250.125.121',
    '195.130.216.149',
    '96.18.212.86',
    '188.226.239.21',
    '54.201.183.106',
    '213.81.142.62'
  ]
});

addNetwork({
  name: 'blackcoin',
  alias: 'blackcoin',
  pubkeyhash: 0x19,
  privatekey: 0x99,
  scripthash: 0x85,
  xpubkey:  0x0488b21e,
  xprivkey: 0x0488ade4,
  networkMagic: 0x70352205,
  port: 15714,
  dnsSeeds: [
    'seed.blackcoin.co',
    'bcseed.syllabear.us.to'
  ]
});

addNetwork({
  name: 'bitcoindark',
  alias: 'bitcoindark',
  pubkeyhash: 0x3c,
  privatekey: 0xbc,
  scripthash: 0x85,
  xpubkey:  0x0488b21e,
  xprivkey: 0x0488ade4,
  networkMagic: 0xe4c2d8e6,
  port: 14631,
  dnsSeeds: [
    // Not sure that these are live as they are commented out at https://github.com/laowais/bitcoindark/blob/master/src/net.cpp#L1234 ?
    //'seed.BitcoinDark.co',
    //'seed2.BitcoinDark.co'
  ]
});


/**
 * @instance
 * @member Networks#livenet
 */
var livenet = get('livenet');

/**
 * @instance
 * @member Networks#testnet
 */
var testnet = get('testnet');

/**
 * AltCoins
 *
 */

var dogecoin = get('dogecoin');
var litecoin = get('litecoin');
var dash = get('dash');
var peercoin = get('peercoin');
var namecoin = get('namecoin');
var digibyte = get('digibyte');
var blackcoin = get('blackcoin');
var bitcoindark = get('bitcoindark');

/**
 * @namespace Networks
 */
module.exports = {
  add: addNetwork,
  remove: removeNetwork,
  defaultNetwork: livenet,
  livenet: livenet,
  mainnet: livenet,
  testnet: testnet,
  dogecoin: dogecoin,
  litecoin: litecoin,
  dash: dash,
  peercoin: peercoin,
  namecoin: namecoin,
  digibyte: digibyte,
  blackcoin:  blackcoin,
  bitcoindark: bitcoindark,
  get: get
};
