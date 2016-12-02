var bencode = require('bencode')
var Buffer = require('safe-buffer').Buffer
var debug = require('debug')('ETH_reward')
var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')

module.exports = function (myETHAddr) {
  inherits(ETHReward, EventEmitter)

  function ETHReward (wire) {
    EventEmitter.call(this)

    this._wire = wire

    if (Buffer.isBuffer(myETHAddr)) {
	console.log("set local ETH addr = " + myETHAddr)
      this._wire.extendedHandshake.ETHAddr = myETHAddr
    }
  }

  // Name of the bittorrent-protocol extension
  ETHReward.prototype.name = 'eth_reward'

  ETHReward.prototype.onHandshake = function (infoHash, peerId, extensions) {
    this._infoHash = infoHash
	console.log("on Handshake = " + infoHash + " " + peerId + " " + extensions)
  }

  ETHReward.prototype.onExtendedHandshake = function (handshake) {
	console.log("onExtendedHandshake")
    if (!handshake.m || !handshake.m.eth_reward) {
	console.log("Peer does not support ETH_reward")
      this.emit('warning', new Error('Peer does not support ETH_reward'))
    }

    if (!handshake.ETHAddr) {
	console.log("Peer does not have an ETH address set")
      this.emit('warning', new Error('Peer does not have an ETH address set'))
    }
	else
{


	console.log("get ETH address ! :" + handshake.ETHAddr)
    this.emit('ethAddr', handshake.ETHAddr)
}

  }

  ETHReward.prototype.onMessage = function (buf) {
	console.log("on message : " + buf)
	//no message with ETH_reward
  }

  /**
   * Ask the peer to send metadata.
   * @public
   */
  ETHReward.prototype.fetch = function () {
console.log("fetch")
  }

  /**
   * Stop asking the peer to send metadata.
   * @public
   */
  ETHReward.prototype.cancel = function () {
console.log("cancel")
  return  
  }

  ETHReward.prototype.setETHaddr = function (ETHAddr) {
    return true
  }


/*
  ETHReward.prototype._send = function (dict, trailer) {
  }

  ETHReward.prototype._request = function (piece) {
  }

  ETHReward.prototype._data = function (piece, buf, totalSize) {
  }

  ETHReward.prototype._reject = function (piece) {
  }

  ETHReward.prototype._onRequest = function (piece) {
  }

  ETHReward.prototype._onData = function (piece, buf, totalSize) {
  }

  ETHReward.prototype._onReject = function (piece) {
  }

  ETHReward.prototype._requestPieces = function () {
  }

  ETHReward.prototype._checkDone = function () {
  }
*/
  return ETHReward
}
