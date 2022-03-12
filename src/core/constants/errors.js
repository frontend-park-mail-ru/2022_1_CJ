export class CodedError extends Error {
  /**
   * @param {String} message 
   * @param {Number} code 
   */
  constructor(message, code) {
    super(message)
    this.code = code
  }
}

/**
 * Generate new CodedError from JSON
 * @param {JSON} json 
 * @returns 
 */
export function NewCodedError(json) {
  return new CodedError(json["message"], json["code"]);
}
