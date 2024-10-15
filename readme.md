# Prerequisite

```javascript
npm instal -g truffle
```
# Useful commands

## Initialize truffle
```javascript
truffle init
```

## Initialize a new contract
```javascript
truffle create contract TestContract
```

## Initialize a new test
```javascript
truffle create test TestContract
```

## Compile
```javascript
truffle compile
```

## Running unit test
```javascript
truffle test
```

## Deploy the contract
```javascript
truffle migrate
```

```javascript
truffle migrate --reset --compile-all
```

```javascript
truffle migrate --dry-run
```

## Truffle console
```javascript
truffle console
```

```javascript
web3.eth.getAccounts().then(console.log)
```