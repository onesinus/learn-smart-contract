# Demo
![Screenshot from 2024-11-07 23-45-59](https://github.com/user-attachments/assets/efbed15f-19bb-4ad0-953a-54fe23b9a412)
![Screenshot from 2024-11-07 23-46-11](https://github.com/user-attachments/assets/fe26ec03-3883-4800-bf8b-780002d284a3)
![Screenshot from 2024-11-07 23-46-24](https://github.com/user-attachments/assets/8b1ec596-7b71-4e6b-9348-c7686a03ed48)

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

Get ipfs: localhost:3000/retrieve-ipfs/{ipfs-id}

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
