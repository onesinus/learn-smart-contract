# Prerequisite

```javascript
npm instal -g truffle
```

# Frontend
```javascript
npm start
```

# Backend
## Running Server
```javascript
node backend.js
```

## Testing IPFS
```curl
curl -X POST http://localhost:3000/upload-ipfs \
     -H "Content-Type: application/json" \
     -d '{"key": "value"}'
```

```curl
curl -X POST http://localhost:3000/upload-ipfs \
     -H "Content-Type: application/json" \
     -d '{"name": "Alice", "message": "Hello IPFS!"}'
```

# Smart Contract

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