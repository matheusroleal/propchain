pragma solidity >=0.4.22 <0.6.0;

contract voteTransfer {

    // Data related with the file sender
    mapping (string => bool) private transaction;
    mapping (string => string) private data;

    // Data related with the file voters
    mapping (string => bool) private voteTransaction;
    mapping (string => uint256) private vote;

    // Data related with defining winner
    struct Proposal {
        string file_name;
    }

    Proposal [] proposals;
    uint256 toProposal;
    constructor(uint8 _numProposals) public {
        proposals.length = _numProposals;
        toProposal = 0;
    }

    // Defining a file transaction to the server
    function setTransaction(string memory data_to_send) public payable {
        if ( toProposal >= proposals.length) return;
        string memory transaction_sender = toString(msg.sender);
        transaction[data_to_send] = true;
        data[data_to_send] = transaction_sender;
        vote[data_to_send] = 0;
        proposals[toProposal].file_name = data_to_send;
        toProposal += 1;
    }

    // Voting for a file
    function setVoteTransaction(string memory data_to_send) public payable {
        string memory transaction_sender = toString(msg.sender);
        string memory transaction_id = string(abi.encodePacked(transaction_sender,data_to_send));
        voteTransaction[transaction_id] = true;
        vote[data_to_send] = vote[data_to_send] + 1;
    }

    // Checking if that address has already voted for that file
    function hasVoted(string memory data_to_send, string memory sender)public returns(bool){
        string memory transaction_id = string(abi.encodePacked(sender,data_to_send));
        return voteTransaction[transaction_id];
    }

    // Defining most voted file
    function winningProposal() public view returns (string memory _winningProposal) {
        uint256 winningVoteCount = 0;
        for (uint8 prop = 0; prop < proposals.length; prop++){
            string memory fn = proposals[prop].file_name;
            if (vote[fn] > winningVoteCount) {
                winningVoteCount = vote[fn];
                _winningProposal = fn;
            }
        }
    }

    // Utils functions
    function toString(address x)private returns (string memory) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++){
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        }
        return string(b);
    }
}
