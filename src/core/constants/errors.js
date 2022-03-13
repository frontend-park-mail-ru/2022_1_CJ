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
