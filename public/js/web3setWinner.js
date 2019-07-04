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
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            accounts = await web3.eth.getAccounts();
						account = accounts[0]
        } catch (error) {
            // User denied account access...
						console.log(error);
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
		    web3 = new Web3(web3.currentProvider);
		    account = web3.eth.accounts[0];
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

function setWinningProposal() {
	// Set Address from Deployed Contract
  var contractAddress ="0x5895d8436b971855eb8472fc5484754c78892b83";

	//creating contract object
	var contract = new web3.eth.Contract(contractABI,contractAddress);

	// Set Transaction Set Up
  var transactionObject = {
    from: account,
    gas: 3000000,
    gasPrice: 60000
  };

	contract.methods.winningProposal().send(transactionObject, (error, result) => {
		if(error) {
			console.log(error);
		}else{
			console.log(result);
		}
	});
}
