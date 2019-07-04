var account, web3;

//contract abi is the array that you can get from the ethereum wallet or etherscan
var contractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "data_to_send",
				"type": "string"
			}
		],
		"name": "setProposal",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_numProposals",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "data_to_send",
				"type": "string"
			}
		],
		"name": "voteFile",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getProposals",
		"outputs": [
			{
				"components": [
					{
						"name": "file_name",
						"type": "string"
					},
					{
						"name": "sender",
						"type": "address"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "data_to_send",
				"type": "string"
			}
		],
		"name": "hasVoted",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "winningProposal",
		"outputs": [
			{
				"name": "_winningProposal",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

window.addEventListener('load', function() {
  // Load WEB3
  // Check wether it's already injected by something else (like Metamask or Parity Chrome plugin)
  if(typeof web3 !== 'undefined') {
		// Load WEB3
	  // Check wether it's already injected by something else (like Metamask or Parity Chrome plugin)
	  if(typeof web3 !== 'undefined') {
	    // Connected my metamask account to app
	    ethereum.enable()

	    web3 = new Web3(web3.currentProvider);
	    account = web3.eth.accounts[0];
	  }
  }
});

function setWinningProposal() {
	// Set Address from Deployed Contract
  var contractAddress ="0x0cf706388c2fdc058789a83666c0ceee1f5d7a35";

	//creating contract object
  // var contract = web3.eth.contract(contractABI,contractAddress);
	var contract = 	web3.eth.contract(contractABI).at(contractAddress)

	// Set Transaction Set Up
  var transactionObject = {
    from: account,
    gas: 3000000,
    gasPrice: 60000
  };

  // contract.sendTransaction("").call(transactionObject).then((result) => console.log(web3.utils.hexToAscii(result)));
	contract.winningProposal.sendTransaction(transactionObject, (error, result) => {
		if(error) {
			console.log(error);
		}else{
			console.log(result);
		}
	});
}