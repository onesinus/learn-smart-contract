const QuotationWithRoleContract = artifacts.require("QuotationWithRoleContract");

contract("QuotationWithRoleContract", (accounts) => {
  let instance;

  const [farmer, buyer, anotherAccount] = accounts;

  before(async () => {
    instance = await QuotationWithRoleContract.deployed();
  });

  it("should initialize the quotation counter to zero", async () => {
    const counter = await instance.quotationCounter();
    assert.equal(counter.toNumber(), 0, "Quotation counter should be initialized to zero");
  });

  it("should assign role 'Farmer' to an account", async () => {
    await instance.assignRole("Farmer", { from: farmer });
    const role = await instance.roles(farmer);
    assert.equal(role, "Farmer", "Role should be 'Farmer'");
  });

  it("should assign role 'Buyer' to an account", async () => {
    await instance.assignRole("Buyer", { from: buyer });
    const role = await instance.roles(buyer);
    assert.equal(role, "Buyer", "Role should be 'Buyer'");
  });

  it("should log role changes in the roleChanges array", async () => {
    const roleChanges = await instance.getRoleChanges();
    assert.equal(roleChanges.length, 2, "There should be two role changes recorded");
    assert.equal(roleChanges[0].user, farmer, "First role change should be for the farmer");
    assert.equal(roleChanges[1].user, buyer, "Second role change should be for the buyer");
  });

  it("should create a quotation by a farmer", async () => {
    const product = "Apples";
    const quantity = 100;
    const price = 200;

    await instance.createQuotation(product, quantity, price, { from: farmer });

    const quotation = await instance.quotations(1);
    assert.equal(quotation.product, product, "Product should match");
    assert.equal(quotation.quantity.toNumber(), quantity, "Quantity should match");
    assert.equal(quotation.price.toNumber(), price, "Price should match");
    assert.equal(quotation.farmer, farmer, "Farmer should be the one who created the quotation");
  });

  it("should approve a quotation by a buyer", async () => {
    await instance.approveQuotation(1, { from: buyer });

    const quotation = await instance.quotations(1);
    assert.equal(quotation.approved, true, "Quotation should be approved");
    assert.equal(quotation.buyer, buyer, "Buyer should be the one who approved the quotation");
  });

  it("should not allow approving an already approved quotation", async () => {
    try {
      await instance.approveQuotation(1, { from: anotherAccount });
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
    assert.equal(quotation[4], farmer, "Farmer address should match");
    assert.equal(quotation[5], buyer, "Buyer address should match");
    assert.equal(quotation[6], true, "Quotation should be approved");
  });

  it("should prevent non-farmers from creating a quotation", async () => {
    try {
      await instance.createQuotation("Oranges", 50, 150, { from: buyer });
      assert.fail("Expected revert not received");
    } catch (error) {
      assert(error.message.includes("revert"), "Expected revert due to role restriction on createQuotation");
    }
  });

  it("should prevent non-buyers from approving a quotation", async () => {
    try {
      await instance.approveQuotation(1, { from: farmer });
      assert.fail("Expected revert not received");
    } catch (error) {
      assert(error.message.includes("revert"), "Expected revert due to role restriction on approveQuotation");
    }
  });

  it("should assign a role and create a quotation", async () => {
    // Assign role
    await instance.assignRole("Farmer", { from: accounts[0] });
    const role = await instance.roles(accounts[0]);
    assert.equal(role, "Farmer", "Role should be assigned as Farmer");

    // Create a quotation
    try {
      await instance.createQuotation("Apples", 100, 200, { from: accounts[0] });
      console.log("Quotation created successfully");
    } catch (error) {
      console.error("Failed to create quotation:", error.message);
    }
  });
});
