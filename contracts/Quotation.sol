// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract QuotationContract {

    struct Quotation {
        uint id;
        string product;
        uint quantity;
        uint price;
        address farmer;
        address buyer;
        bool approved;
    }

    uint public quotationCounter;
    mapping(uint => Quotation) public quotations;

    event QuotationCreated(uint id, string product, uint quantity, uint price, address farmer);
    event QuotationApproved(uint id, address buyer);

    constructor() {
        quotationCounter = 0;
    }

    function createQuotation(string memory _product, uint _quantity, uint _price) public {
        quotationCounter++;
        quotations[quotationCounter] = Quotation(quotationCounter, _product, _quantity, _price, msg.sender, address(0), false);
        emit QuotationCreated(quotationCounter, _product, _quantity, _price, msg.sender);
    }

    function approveQuotation(uint _id) public {
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
}
