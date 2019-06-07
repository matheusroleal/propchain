pragma solidity >=0.4.22 <0.6.0;

contract TransferFile {

    mapping (string => bool) private transaction;
    mapping (string => string) private data;

    function setTransaction(string memory data_to_send, string memory receiver) public payable returns (string memory){
        string memory transaction_sender = toString(msg.sender);
        string memory transaction_id = string(abi.encodePacked(transaction_sender,receiver,Time_call()));
        transaction[transaction_id] = true;
        data[transaction_id] = data_to_send;
        return transaction_id;
    }

    function getFile(string memory tran_id) public returns (string memory){
        require(transaction[tran_id] == true, "No File Found For This Transaction");
        return data[tran_id];
    }

    function hasTransaction(string memory tran_id)public returns(bool){
        return transaction[tran_id];
    }

    function getAdrress() public returns(string memory){
        return toString(msg.sender);
    }

    function toString(address x)private returns (string memory) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++){
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        }
        return string(b);
    }

    function Time_call()private returns (uint256){
        return now;
    }

}
