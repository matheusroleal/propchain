var account, web3;

//contract abi is the array that you can get from the ethereum wallet or etherscan
var contractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "data_id",
				"type": "string"
			},
			{
				"name": "data_name",
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
				"name": "data_id",
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
		"constant": false,
		"inputs": [],
		"name": "winningProposal",
		"outputs": [
			{
				"name": "_winningProposal",
				"type": "string"
			},
			{
				"name": "_winningAddress",
				"type": "address"
			}
		],
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
						"name": "file_id",
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
				"name": "sender",
				"type": "address"
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
	}
];

window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
				$("#isWConn").val('True');
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            accounts = await web3.eth.getAccounts();
						account = accounts[0]
						$('#sender').val(account);
        } catch (error) {
            // User denied account access...
						console.log(error);
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
				$("#isWConn").val('True');
        window.web3 = new Web3(web3.currentProvider);

				// Acccounts always exposed
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
    }
    // Non-dapp browsers...
    else {
				$("#isWConn").val('False');
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

function sendFileProposal() {
  // Extract Proposal data from the HTML form
  var fileId = $("#fileId").val();
  var fileName = $("#file-upload").val();

	// Set Address from Deployed Contract
  var contractAddress ="0xe4f0e9e6de011fedb43286ad1e05661dea5a7183";

	//creating contract object
	var contract = new web3.eth.Contract(contractABI,contractAddress);

	// Set Transaction Set Up
  var transactionObject = {
    from: account,
    gas: 3000000,
    gasPrice: 60000
  };

	contract.methods.setProposal(fileId, fileName).send(transactionObject, (error, result) => {
		if(error) {
			console.log(error);
		}else{
			console.log(result);
    	document.getElementById("newProposal").submit();
		}
	});
}
