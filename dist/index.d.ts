export declare const TYPE_VALIDATION: {
    STRING: string;
    NUMBER: string;
    BOOLEAN: string;
    OBJECT: string;
    ARRAY: (T?: string | undefined) => string;
};
export interface ValidationFieldRule {
    type: [string, string];
    required: [boolean, string];
    min?: [number, string];
    max?: [number, string];
    match?: [RegExp, string];
    in?: [any[], string];
    evaluate?: (rule: any, inputData: any) => Promise<boolean | string>;
}
export interface ValidationRule {
    [inputName: string]: ValidationFieldRule;
}
export interface ValidationResult {
    isValid: boolean;
    error: {
        [inputName: string]: string;
    };
}
export default class Validator {
    constructor();
    validateWithRule(rule: ValidationRule, input: {
        [inputName: string]: any;
    }): Promise<ValidationResult>;
}
