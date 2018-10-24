export const TYPE_VALIDATION = {
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  BOOLEAN: 'BOOLEAN',
  OBJECT: 'OBJECT',
  ARRAY: (T?: string) => {
    if (!(T) || !(['STRING', 'NUMBER', 'BOOLEAN', 'OBJECT', 'ARRAY'].includes(T))) {
      return 'ARRAY'
    }

    return `ARRAY_OF_${T}`
  }
}

export interface ValidationFieldRule {
  type: [string, string],
  required: [boolean, string],
  min?: [number, string],
  max?: [number, string],
  match?: [RegExp, string],
  in?: [any[], string],
  evaluate?: (rule: any, inputData: any) => Promise<boolean | string>
}

export interface ValidationRule {
  [inputName: string]: ValidationFieldRule
}

export interface ValidationResult {
  isValid: boolean,
  error: { [inputName: string]: string }
}

function isEmpty(obj: object) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false
    }
  }
  return JSON.stringify(obj) === JSON.stringify({})
}

async function _validate(rule: ValidationFieldRule, input: any, inputName: string): Promise<any> {
  const inputData = input[inputName]

  if (rule.hasOwnProperty('required')) {
    if (rule.required[0] && inputData === undefined) {
      return rule.required[1]
    }
  } else {
    return `Validation rule for ${inputName} must include "required" validation`
  }

  if (inputData !== undefined) {
    if (rule.hasOwnProperty('type')) {
      if (inputData !== null) {
        const typeValidation = rule.type[0]

        if (
          (typeValidation === TYPE_VALIDATION.STRING && typeof inputData !== 'string') || // type string
          (typeValidation === TYPE_VALIDATION.NUMBER && typeof inputData !== 'number') || // type number
          (typeValidation === TYPE_VALIDATION.BOOLEAN && typeof inputData !== 'boolean') || // type boolean
          (typeValidation === TYPE_VALIDATION.OBJECT && typeof inputData !== 'object') || // type general object
          (typeValidation === TYPE_VALIDATION.ARRAY() && inputData.constructor !== Array) || // type array
          (typeValidation === TYPE_VALIDATION.ARRAY(TYPE_VALIDATION.STRING) && (inputData.constructor !== Array || inputData.filter(i => typeof i !== 'string').length > 0)) || // type array of string
          (typeValidation === TYPE_VALIDATION.ARRAY(TYPE_VALIDATION.NUMBER) && (inputData.constructor !== Array || inputData.filter(i => typeof i !== 'number').length > 0)) || // type array of number
          (typeValidation === TYPE_VALIDATION.ARRAY(TYPE_VALIDATION.BOOLEAN) && (inputData.constructor !== Array || inputData.filter(i => typeof i !== 'boolean').length > 0)) || // type array of boolean
          (typeValidation === TYPE_VALIDATION.ARRAY(TYPE_VALIDATION.OBJECT) && (inputData.constructor !== Array || inputData.filter(i => typeof i !== 'object').length > 0)) || // type array of general object
          (typeValidation === TYPE_VALIDATION.ARRAY(TYPE_VALIDATION.ARRAY()) && (inputData.constructor !== Array || inputData.filter(i => i.constructor !== Array).length > 0)) // type array of array
        ) {
          return rule.type[1]
        }
      }
    } else {
      return `Validation rule for "${inputName}" must include "type" validation`
    }

    if (rule.min) {
      if (typeof inputData === 'string') {
        if (inputData.length < rule.min[0]) {
          return rule.min[1]
        }
      } else if (typeof inputData === 'number') {
        if (inputData < rule.min[0]) {
          return rule.min[1]
        }
      }
    }

    if (rule.max) {
      if (typeof inputData === 'string') {
        if (inputData.length > rule.max[0]) {
          return rule.max[1]
        }
      } else if (typeof inputData === 'number') {
        if (inputData > rule.max[0]) {
          return rule.max[1]
        }
      }
    }

    if (rule.match) {
      if (typeof inputData === 'string') {
        if (!rule.match[0].test(inputData)) {
          return rule.match[1]
        }
      }
    }

    if (rule.in) {
      if (!(rule.in[0].indexOf(inputData) > -1)) {
        return rule.in[1]
      }
    }

    if (rule.evaluate) {
      const evaluateResult = await rule.evaluate(rule, input)

      if (typeof evaluateResult !== 'boolean' || (typeof evaluateResult === 'boolean' && !evaluateResult)) {
        return evaluateResult
      }
    }

    return true
  }
}

export default class Validator {
  constructor() {}

  public async validateWithRule(rule: ValidationRule, input: { [inputName: string]: any }): Promise<ValidationResult> {
    const error = {}

    await Object.keys(rule).reduce(async (p: Promise<any>, inputName) => {
      await p

      const result = await _validate(rule[inputName], input, inputName)

      if (typeof result === 'string') {
        error[inputName] = result
      }
    }, Promise.resolve())

    return {
      isValid: isEmpty(error),
      error
    }
  }
}