# Valider - Javascript object validator

A library for helping validate any object

## Changes

- v0.0.1
  - initial release
- v0.0.2
  - Bug fixing

## Installation

SOON

`npm install --save valider`

## Usage

First, import the library to your code:

`import Valider, {TYPE_VALIDATION} from valider`

Then,

```Javascript
const data = {
  catName: 'Kimi',
  breed: 'Street Anggora',
  age: 4,
  owner: 'Laras'
}

const Validator = new valider()

validator.validateWithRule({
  catName: {
    type: [TYPE_VALIDATION.STRING, 'catName must string'],
    required: [true, 'You must provide your cat name']
  },
  breed: {
    type: [TYPE_VALIDATION.STRING, 'Breed must be a string'],
    required: [true, 'Breed name is required']
  },
  age: {
    required: [false, ''],
    type: [TYPE_VALIDATION.NUMBER, 'your cat age must be a number']
  },
  owner: {
    required: [false, ''],
    type: [TYPE_VALIDATION.STRING, 'owner must be a string']
  }
}, data).then((data) => {
  if(data.isValid) {
    // object valid
    // do something
  } else {
    // object is not valid
    console.log(data.error)
    // e.g. { breed: 'Breed must be a string', age: 'your cat age must be a number' }
  }
})

```

## License

MIT