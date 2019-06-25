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
    $("#isWConn").val('True');
    // Connected my metamask account to app
    ethereum.enable()

    web3 = new Web3(web3.currentProvider);
    account = web3.eth.accounts[0];
    $('#sender').val(account);
    var accountInterval = setInterval(function() {
      if (web3.eth.accounts[0] !== account) {
        account = web3.eth.accounts[0];
        $('#sender').val(account);
        document.getElementById("sender").innerHTML = account;
      }
    }, 100);
  }else {
    $("#isWConn").val('False');
  }
});

function sendFileProposal() {
  // Extract Proposal data from the HTML form
  var fileId = $("#fileId").val();
  var fileName = $("#file-upload").val();

	// Set Address from Deployed Contract
  var contractAddress ="0x31f66bb8f37045f5edc56ce40689c7a041e93905";

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
	contract.setProposal.sendTransaction(fileId, fileName, transactionObject, (error, result) => {
		if(error) {
			console.log(error);
		}else{
			console.log(result);
		}
	});
}
