var Buffer = require('safe-buffer').Buffer
var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')

// This code is based on ut_metadata extention code
// You can fin it here: https://github.com/feross/ut_metadata

// As we only send the ethereum address (small value) we only use the handshake to do the transfert

module.exports = function (myETHAddr) {
  inherits(ETHReward, EventEmitter)

  function ETHReward (wire) {
    EventEmitter.call(this)

    this._wire = wire

    if (Buffer.isBuffer(myETHAddr)) {
      this._wire.extendedHandshake.ETHAddr = myETHAddr
    }
  }

  // Name of the bittorrent-protocol extension
  ETHReward.prototype.name = 'eth_reward'

  ETHReward.prototype.onHandshake = function (infoHash, peerId, extensions) {
    this._infoHash = infoHash
  }

  ETHReward.prototype.onExtendedHandshake = function (handshake) {
    if (!handshake.m || !handshake.m.eth_reward) {
      this.emit('warning', new Error('Peer does not support ETH_reward'))
    }

    if (!handshake.ETHAddr) {
      this.emit('warning', new Error('Peer does not have an ETH address set'))
    } else {
      this.emit('ethAddr', handshake.ETHAddr)
    }
  }

  return ETHReward
}
