// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2; // Enable ABIEncoderV2 for struct and array returns

contract QuotationWithRoleContract {

    struct Quotation {
        uint id;
        string product;
        uint quantity;
        uint price;
        address farmer;
        address buyer;
        bool approved;
    }

    struct RoleChange {
        address user;
        string oldRole;
        string newRole;
        uint timestamp;
    }

    uint public quotationCounter;
    mapping(uint => Quotation) public quotations;
    mapping(address => string) public roles;
    RoleChange[] public roleChanges;

    event QuotationCreated(uint id, string product, uint quantity, uint price, address farmer);
    event QuotationApproved(uint id, address buyer);
    event RoleAssigned(address indexed user, string role);
    event RoleChanged(address indexed user, string oldRole, string newRole, uint timestamp);

    constructor() {
        quotationCounter = 0;
    }

    modifier onlyFarmer() {
        require(keccak256(abi.encodePacked(roles[msg.sender])) == keccak256(abi.encodePacked("Farmer")), "Access restricted to Farmers");
        _;
    }

    modifier onlyBuyer() {
        require(keccak256(abi.encodePacked(roles[msg.sender])) == keccak256(abi.encodePacked("Buyer")), "Access restricted to Buyers");
        _;
    }

    function assignRole(string memory _role) public {
        string memory oldRole = roles[msg.sender];
        roles[msg.sender] = _role;

        roleChanges.push(RoleChange({
            user: msg.sender,
            oldRole: oldRole,
            newRole: _role,
            timestamp: block.timestamp
        }));

        emit RoleChanged(msg.sender, oldRole, _role, block.timestamp);
    }

    function createQuotation(string memory _product, uint _quantity, uint _price) public onlyFarmer {
        quotationCounter++;
        quotations[quotationCounter] = Quotation(quotationCounter, _product, _quantity, _price, msg.sender, address(0), false);
        emit QuotationCreated(quotationCounter, _product, _quantity, _price, msg.sender);
    }

    function approveQuotation(uint _id) public onlyBuyer {
        Quotation storage quote = quotations[_id];
        require(!quote.approved, "Quotation already approved");
        quote.approved = true;
        quote.buyer = msg.sender;
        emit QuotationApproved(_id, msg.sender);
    }

    function getQuotation(uint _id) public view returns (uint, string memory, uint, uint, address, address, bool) {
        Quotation memory quote = quotations[_id];
        return (quote.id, quote.product, quote.quantity, quote.price, quote.farmer, quote.buyer, quote.approved);
    }

    function getRoleChanges() public view returns (RoleChange[] memory) {
        return roleChanges;
    }
}
