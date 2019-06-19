var account, web3;

//contract abi is the array that you can get from the ethereum wallet or etherscan
var contractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "dataId",
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
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "dataId",
				"type": "string"
			},
			{
				"name": "dataName",
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
		"constant": false,
		"inputs": [
			{
				"name": "dataId",
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
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getProposals",
		"outputs": [
			{
				"components": [
					{
						"name": "file_id",
						"type": "string"
					},
					{
						"name": "file_name",
						"type": "string"
					},
					{
						"name": "sender",
						"type": "string"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
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
	}
];

window.addEventListener('load', function() {
  // Load WEB3
  // Check wether it's already injected by something else (like Metamask or Parity Chrome plugin)
  if(typeof web3 !== 'undefined') {
    // Connected my metamask account to app
    ethereum.enable()

    web3 = new Web3(web3.currentProvider);
    account = web3.eth.accounts[0];

  }
});

function sendProposalVote(fileId) {
	// Check if is Connected to web3
	if(account){
		// Set Address from Deployed Contract
	  var contractAddress ="0x31f66bb8f37045f5edc56ce40689c7a041e93905";

		//creating contract object
	  // var contract = web3.eth.contract(contractABI,contractAddress);
		var contract = 	web3.eth.contract(contractABI).at(contractAddress)

		// Set Transaction Set Up
	  var transactionObject = {
	    from: account,
	    gas: 3000000,
	    gasPrice: 50000
	  };

	  // contract.voteFile("12345").call(transactionObject).then((result) => console.log(web3.utils.hexToAscii(result)));
		contract.voteFile.sendTransaction(fileId, transactionObject, (error, result) => {
			if(error) {
				console.log(error);
			}else{
				console.log(result);
			}
		});
	}else {
		// Alert to refresh metamask
		alert("You are not Connected to Web3 ! You need a bridge that allows you to visit the distributed web of tomorrow in your browser today. Please install Metamask or other bridge provider")
	}

}
