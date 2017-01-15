/**
 * @fileoverview Common utils for the AST.
 */

goog.module('googlejs.astMatcher');

const googObject = goog.require('goog.object');

const isMatchWith = /** @type {!Lodash.Module} */ (require('lodash.ismatchwith'));

/**
 * Creates a function that matches an AST against the given pattern.
 *
 * See: isASTMatch()
 *
 * @param {!Object} pattern Pattern to test against
 * @return {function(!Object):(!Object|boolean)} Function that returns
 *     an object with extracted fields or false when no match found.
 */
function matchesAST(pattern) {
  return (ast) => isASTMatch(ast, pattern);
}

/**
 * Matches AST against the given pattern.
 *
 * Similar to LoDash.isMatch(), but with the addition that a Function
 * can be provided to assert various conditions e.g. checking that
 * number is within a certain range.
 *
 * Additionally there are utility functions:
 *
 * - extractAST() can be used to give names to the parts of AST -
 *   these are then returned as a map of key-value pairs.
 *
 * - matchesASTAndLength() ensures the exact array length is respected.
 *
 * @param {!Object} ast The AST node to test.
 * @param {!Object} pattern Pattern to test against.
 * @return {(!Object|boolean)} An object with extracted fields
 *     or false when no match found.
 */
function isASTMatch(ast, pattern) {
  const extractedFields = {};

  /**
   * Adds matched fields to extractedFields.
   * @param {!Object} value
   * @param {(function(*):(!Object|boolean))} matcher
   * @return {*}
   */
  function matchHelper(value, matcher) {
    if (typeof matcher === 'function') {
      const result = matcher(value);
      if (typeof result === 'object') {
        googObject.extend(extractedFields, result);
      }
      return result;
    } else {
      // Otherwise fall back to built-in comparison logic.
      return undefined;
    }
  }

  const matches = isMatchWith(ast, pattern, matchHelper);

  if (matches) {
    return extractedFields;
  } else {
    return false;
  }
}

/**
 * Extracts values during matching with matchesAST().
 * @param {string} fieldName The name to give for the value
 * @param {(function(*)|!Object)=} matcher Optional matching function or pattern
 *     for matchesAST().
 * @return {!function(*):(!Object|boolean)}
 */
function extractAST(fieldName, matcher) {
  return (ast) => {
    const extractedFields = {[fieldName]: ast};

    if (typeof matcher === 'object') {
      // Convert plain pattern into matcher function.
      matcher = matchesAST(matcher);
    }

    if (typeof matcher === 'function') {
      const result = matcher(ast);
      if (typeof result === 'object') {
        googObject.extend(extractedFields, result);
        return extractedFields;
      }
      if (!result) {
        return false;
      }
    }
    return extractedFields;
  };
}

/**
 * Matches an array of ASTs and asserts that the pattern of ASTs is the same
 * length as the array of ASTs to examine.
 * @param {!Array<!Object>} pattern
 * @return {function(!Object):(!Object|boolean)}
 */
function matchesASTLength(pattern) {
  const matcher = matchesAST(pattern);

  return (ast) => {
    if (ast.length !== pattern.length) {
      return false;
    }
    return matcher(ast);
  };
}

exports = {
  extractAST,
  isASTMatch,
  matchesAST,
  matchesASTLength,
};
