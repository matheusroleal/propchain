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
	  var contractAddress ="0x5895d8436b971855eb8472fc5484754c78892b83";

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

				// Cria a linha para cada host
				$.each(proposals, function(index, proposal) {
					if (proposal[0]){
						$table.append("<tr>");
						$table.append("<td scope='row'>"+ proposal[0] + "</td>");
						$table.append("<td>"+ proposal[2] + "</td>")
						$table.append("<form id='FileForm' enctype='multipart/form-data' method='post' action='/transactions/get'>");
						$table.append("<td><input type='hidden' id='fileId' name='fileId' value="+ proposal[1] +"/></td>");
						$table.append("<td><button class='btn btn-primary btn-round' onclick='openFile()' type='button'>Open</button></td>");
						$table.append("<td><button class='btn btn-primary btn-round' onclick='sendProposalVote()' type='button'>Vote</button></td>");;
						$table.append("</form>");
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

function openFile() {
	document.getElementById("FileForm").submit();
}

function sendProposalVote() {
	var fileId = $("#fileId").val();
	console.log(fileId);

	// Check if is Connected to web3
	if(account){
		// Set Address from Deployed Contract
	  var contractAddress ="0x0cf706388c2fdc058789a83666c0ceee1f5d7a35";

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
