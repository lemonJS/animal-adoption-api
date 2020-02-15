# Animal Adoption API

### Requirements
- aws-sdk
- serverless
- node.js (12.x)
- yarn

### Installing
```
$ git clone git@github.com:lemonJS/animal-adoption-api.git
$ cd animal-adoption-api
$ yarn install
# Create an AWS SSM paramter
$ aws ssm put-parameter --name api_url --type String --value <your_url_api>
```

### Running locally
```
$ serverless invoke local --function animals
```

### Testing
```
# Run the tests:
$ yarn test
# Run the tests and generate a coverage report:
$ yarn test --coverage
```

### Deploying
```
$ serverless deploy
```