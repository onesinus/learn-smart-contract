const QuotationWithRoleContract = artifacts.require("QuotationWithRoleContract");

module.exports = function (deployer) {
  deployer.deploy(QuotationWithRoleContract);
};
