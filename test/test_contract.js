const TestContract = artifacts.require("TestContract");

contract("TestContract", accounts => {
  it("should initialize with storedData set to 100", async () => {
    const instance = await TestContract.deployed();
    const storedData = await instance.get();
    assert.equal(storedData.toNumber(), 100, "Initial value should be 100");
  });

  it("should set the storedData value", async () => {
    const instance = await TestContract.deployed();
    await instance.set(200, { from: accounts[0] });
    const newValue = await instance.get();
    assert.equal(newValue.toNumber(), 200, "Stored value should be 200");
  });
});
