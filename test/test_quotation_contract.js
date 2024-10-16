const QuotationContract = artifacts.require("QuotationContract");

contract("QuotationContract", accounts => {
  let instance;

  before(async () => {
    instance = await QuotationContract.deployed();
  });

  it("should initialize the quotation counter to zero", async () => {
    const counter = await instance.quotationCounter();
    assert.equal(counter.toNumber(), 0, "Quotation counter should be initialized to zero");
  });

  it("should create a quotation", async () => {
    const product = "Apples";
    const quantity = 100;
    const price = 200;
    
    await instance.createQuotation(product, quantity, price, { from: accounts[0] });

    const quotation = await instance.quotations(1);
    assert.equal(quotation.product, product, "Product should match");
    assert.equal(quotation.quantity.toNumber(), quantity, "Quantity should match");
    assert.equal(quotation.price.toNumber(), price, "Price should match");
    assert.equal(quotation.farmer, accounts[0], "Farmer should be the one who created the quotation");
  });

  it("should approve a quotation", async () => {
    await instance.approveQuotation(1, { from: accounts[1] });
    
    const quotation = await instance.quotations(1);
    assert.equal(quotation.approved, true, "Quotation should be approved");
    assert.equal(quotation.buyer, accounts[1], "Buyer should be the one who approved the quotation");
  });

  it("should not allow approving an already approved quotation", async () => {
    try {
      await instance.approveQuotation(1, { from: accounts[2] });
      assert.fail("Expected revert not received");
    } catch (error) {
      assert(error.message.includes("revert"), "Expected revert due to already approved quotation");
    }
  });

  it("should retrieve the correct quotation", async () => {
    const quotation = await instance.getQuotation(1);
    
    assert.equal(quotation[0].toNumber(), 1, "Quotation ID should be 1");
    assert.equal(quotation[1], "Apples", "Product should be 'Apples'");
    assert.equal(quotation[2].toNumber(), 100, "Quantity should be 100");
    assert.equal(quotation[3].toNumber(), 200, "Price should be 200");
    assert.equal(quotation[4], accounts[0], "Farmer address should match");
    assert.equal(quotation[5], accounts[1], "Buyer address should match");
    assert.equal(quotation[6], true, "Quotation should be approved");
  });
});
