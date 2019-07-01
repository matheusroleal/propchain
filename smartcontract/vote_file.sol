pragma experimental ABIEncoderV2;

contract voteTransfer {

    // Data related with the file sender
    mapping (string => bool) private transaction;
    mapping (string => string) private data;

    // Data related with the file voters
    mapping (address => bool) private voteTransaction;
    mapping (string => uint256) private vote;

    // Give more vote value for winners
    mapping (address => uint256) private winValue;

    // Data related with defining winner
    struct Proposal {
        string file_name;
        address sender;
    }

    Proposal [] proposals;
    uint256 toProposal;
    constructor(uint8 _numProposals) public {
        proposals.length = _numProposals;
        toProposal = 0;
    }

    // Defining a file transaction to the server
    function setProposal(string memory data_to_send) public payable {
        if ( toProposal >= proposals.length) return;
        string memory transaction_sender = toString(msg.sender);
        transaction[data_to_send] = true;
        // Add ownership and initialize the vote counter
        data[data_to_send] = transaction_sender;
        vote[data_to_send] = 0;
        // Add proposal to the proposals array
        proposals[toProposal].file_name = data_to_send;
        proposals[toProposal].sender = msg.sender;
        toProposal += 1;
    }

    // Voting for a file
    function voteFile(string memory data_to_send) public payable {
        if ( voteTransaction[msg.sender] == true ) return;
        string memory transaction_sender = toString(msg.sender);
        // Set the transaction id and mark as voted
        string memory transaction_id = string(abi.encodePacked(transaction_sender,data_to_send));
        voteTransaction[msg.sender] = true;
        vote[data_to_send] = vote[data_to_send] + 1 + winValue[msg.sender];
    }

    // Show the proposals defined
    function getProposals() public view returns(Proposal [] memory){
        return proposals;
    }

    // Checking if that address has already voted for that file
    function hasVoted(address sender)public view returns(bool){
      if(voteTransaction[sender] == true){
        return true;
      }
      return false;
    }

    // Defining most voted file
    function winningProposal() public payable returns (string memory _winningProposal) {
        uint256 winningVoteCount = 0;
        address winningAdd;
        for (uint8 prop = 0; prop < proposals.length; prop++){
            string memory fn = proposals[prop].file_name;
            if (vote[fn] > winningVoteCount) {
                winningVoteCount = vote[fn];
                winningAdd = proposals[prop].sender;
                _winningProposal = fn;
            }
        }
        winValue[winningAdd] += 2;
        return _winningProposal;
    }

    // Utils functions
    function toString(address x)private view returns (string memory) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++){
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        }
        return string(b);
    }
}
