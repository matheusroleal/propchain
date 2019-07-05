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
						getProposals();
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
				getProposals();
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

function getProposals() {
	// Check if is Connected to web3
	if(account){
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

		contract.methods.getProposals().call(transactionObject,(error,result) => {
			if(error) {
				console.log(error);
			}else{
				console.log(result);

				var $table = $("#host_table");

				$table.empty();

				var proposals = result

				// Cria a linha para cada proposal
				$.each(proposals, function(index, proposal) {
					if (proposal[0]){
						$table.append("<tr>");
						$table.append("<td scope='row'>"+ proposal[0] + "</td>");
						$table.append("<td>"+ proposal[2] + "</td>");
						$table.append("<td><button class='btn btn-primary btn-round' onclick='openFile(this)' type='button'>Open</button></td>");
						$table.append("<td><input type='hidden' value="+proposal[1]+"></td>");
						$table.append("<td><button class='btn btn-primary btn-round' onclick='sendProposalVote(this)' type='button'>Vote</button></td>");
						$table.append("<td><input type='hidden' value="+proposal[1]+"></td>");
						$table.append("</tr>");
					}
				});

			}
		});
	}else {
		// Alert to refresh metamask
		alert("You are not Connected to Web3 ! You need a bridge that allows you to visit the distributed web of tomorrow in your browser today. Please install Metamask or other bridge provider")
	}

}

function openFile(t) {
	$("#fileId").val($(t).closest('td').next('td').find('input').val());
	document.getElementById("getFile").submit();
}

function sendProposalVote(t) {
	var fileId = $(t).closest('td').next('td').find('input').val();
	console.log(fileId);

	// Check if is Connected to web3
	if(account){
		// Set Address from Deployed Contract
	  var contractAddress ="0xe4f0e9e6de011fedb43286ad1e05661dea5a7183";

		//creating contract object
		var contract = new web3.eth.Contract(contractABI,contractAddress);

		// Set Transaction Set Up
	  var transactionObject = {
	    from: account,
	    gas: 3000000,
	    gasPrice: 50000
	  };

		contract.methods.voteFile(fileId).send(transactionObject, (error, result) => {
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
