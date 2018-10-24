const valider = require('../dist')

const validator = new valider.default()

const data = {
  catName: 'Kimi',
  breed: 4,
  age: 'asd'
}

const validation = validator.validateWithRule({
  catName: {
    type: [valider.TYPE_VALIDATION.STRING, 'catName must string'],
    required: [true, 'You must provide your cat name']
  },
  breed: {
    type: [valider.TYPE_VALIDATION.STRING, 'Breed must be a string'],
    required: [true, 'Breed name is required']
  },
  age: {
    required: [false, 'asdadsa'],
    type: [valider.TYPE_VALIDATION.NUMBER, 'your cat age must be a number']
  }
}, data)

validation.then((data) => {
  console.log(data)
})