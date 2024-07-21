// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Insurance {
    struct Policy {
        uint256 id;
        string policyHolder;
        string policyDetails;
    }

    Policy[] public policies;
    uint256 public nextPolicyId;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    event PolicyCreated(uint256 id, string policyHolder, string policyDetails);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function addPolicy(string memory _policyHolder, string memory _policyDetails) public onlyOwner {
        policies.push(Policy(nextPolicyId, _policyHolder, _policyDetails));
        emit PolicyCreated(nextPolicyId, _policyHolder, _policyDetails);
        nextPolicyId++;
    }

    function getPolicy(uint256 _policyId) public view returns (Policy memory) {
        require(_policyId < nextPolicyId, "Policy does not exist");
        return policies[_policyId];
    }

    function getPolicies() public view returns (Policy[] memory) {
        return policies;
    }
}
