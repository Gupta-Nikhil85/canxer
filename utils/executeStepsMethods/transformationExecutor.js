/**
 *
 * @param {*} obj - The object to flatten
 * @description Flatten the given object
 * @example
 * const obj = { field1: 'value1', field2: { nestedField1: 'value2' } };
 * const result = flattenObject(obj);
 * console.log(result); // Output: { field1: 'value1', 'field2.nestedField1': 'value2' }
 * @returns - {Object} The flattened object
 * @throws {Error} When an error occurs
 *
 */
const flattenObject = (obj) => {
  try {
    const result = {};
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        const flatObj = flattenObject(obj[key]);
        for (const nestedKey in flatObj) {
          result[`${key}.${nestedKey}`] = flatObj[nestedKey];
        }
      } else {
        result[key] = obj[key];
      }
    }
    return result;
  } catch (error) {
    throw new Error(`Error flattening object: ${error.message}`);
  }
};

/**
 *
 * @param {*} str - The string to format
 * @param {*} options - The formatting options
 * @param {String} options.method - The formatting method
 * @param {Number} [options.startIndex] - The start index for substring
 * @param {Number} [options.endIndex] - The end index for substring
 * @param {String} [options.searchValue] - The search value for replace
 * @param {String} [options.replaceValue] - The replace value for replace
 * @returns - {String} The formatted string
 * @description Format the given string based on the provided options
 * @example
 * const str = 'Hello, World!';
 * const options = {
 * method: 'uppercase'
 * };
 * const result = formatString(str, options);
 * console.log(result); // Output: 'HELLO, WORLD!'
 * @throws {Error} When an error occurs
 */
const formatString = (str, options) => {
  try {
    switch (options.method) {
      case "uppercase":
        return str.toUpperCase();
      case "lowercase":
        return str.toLowerCase();
      case "capitalize":
        return str
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
      case "trim":
        return str.trim();
      case "substring":
        return str.substring(options.startIndex, options.endIndex);
      case "replace":
        return str.replace(options.searchValue, options.replaceValue);
      default:
        return str;
    }
  } catch (error) {
    throw new Error(`Error formatting string: ${error.message}`);
  }
};

/**
 *
 * @param {*} num - The number to format
 * @param {*} options - The formatting options
 * @param {String} options.method - The formatting method
 * @param {Number} [options.decimalPlaces] - The decimal places for fixedDecimal method
 * @param {String} [options.locale] - The locale for currency method
 * @param {String} [options.currency] - The currency for currency method
 * @param {Number} [options.decimalPlaces] - The decimal places for percentage method
 * @param {String} [options.separator] - The separator for thousandsSeparator method
 * @param {String} [options.format] - The format for custom method
 * @returns - {String} The formatted number
 * @description Format the given number based on the provided options
 * @example
 * const num = 12345.6789;
 * const options = {
 * method: 'fixedDecimal',
 * decimalPlaces: 2
 * };
 * const result = formatNumber(num, options);
 * console.log(result); // Output: '12345.68'
 * @throws {Error} When an error occurs
 */
const formatNumber = (num, options) => {
  try {
    switch (options.method) {
      case "fixedDecimal":
        return num.toFixed(options.decimalPlaces || 2);
      case "currency":
        return new Intl.NumberFormat(options.locale || "en-US", {
          style: "currency",
          currency: options.currency || "USD",
        }).format(num);
      case "percentage":
        return `${(num * 100).toFixed(options.decimalPlaces || 2)}%`;
      case "thousandsSeparator":
        return num.toLocaleString();
      case "scientific":
        return num.toExponential();
      default:
        return num;
    }
  } catch (error) {
    throw new Error(`Error formatting number: ${error.message}`);
  }
};

/**
 *
 * @param {*} date - The date to format
 * @param {*} options - The formatting options
 * @param {String} options.method - The formatting method
 * @param {String} [options.locale] - The locale for localeDateString method
 * @param {String} [options.format] - The format for custom method
 * @returns - {String} The formatted date
 * @description Format the given date based on the provided options
 * @example
 * const date = '2021-01-01T00:00:00.000Z';
 * const options = {
 * method: 'iso'
 * };
 * const result = formatDate(date, options);
 * console.log(result); // Output: '2021-01-01T00:00:00.000Z'
 * @throws {Error} When an error occurs
 * @todo You can use moment.js or another library for custom formatting
 */
const formatDate = (date, options) => {
  try {
    const dateObj = new Date(date);
    switch (options.method) {
      case "iso":
        return dateObj.toISOString();
      case "localeDateString":
        return dateObj.toLocaleDateString(options.locale || "en-US");
      case "custom":
        return formatCustomDate(dateObj, options.format); // You can use moment.js or another library for custom formatting
      case "unixTimestamp":
        return dateObj.getTime();
      default:
        return date;
    }
  } catch (error) {
    throw new Error(`Error formatting date: ${error.message}`);
  }
};

/**
 *
 * @param {*} bool - The boolean to format
 * @param {*} options - The formatting options
 * @param {String} options.method - The formatting method
 * @returns - {String} The formatted boolean
 * @description Format the given boolean based on the provided options
 * @example
 * const bool = true;
 * const options = {
 * method: 'yesNo'
 * };
 * const result = formatBoolean(bool, options);
 * console.log(result); // Output: 'Yes'
 * @throws {Error} When an error occurs
 */
const formatBoolean = (bool, options) => {
  try {
    switch (options.method) {
      case "toString":
        return bool.toString();
      case "yesNo":
        return bool ? "Yes" : "No";
      case "onOff":
        return bool ? "On" : "Off";
      default:
        return bool;
    }
  } catch (error) {
    throw new Error(`Error formatting boolean: ${error.message}`);
  }
};

/**
 *
 * @param {*} arr - The array to format
 * @param {*} options - The formatting options
 * @param {String} options.method - The formatting method
 * @param {String} [options.separator] - The separator for join method
 * @param {Function} [options.filterCondition] - The filter condition for filter method
 * @param {Function} [options.mapFunction] - The map function for map method
 * @param {Function} [options.reducer] - The reducer function for reduce method
 * @param {*} [options.initialValue] - The initial value for reduce method
 * @returns - {Array} The formatted array
 * @description Format the given array based on the provided options
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const options = {
 * method: 'join',
 * separator: ', '
 * };
 * const result = formatArray(arr, options);
 * console.log(result); // Output: '1, 2, 3, 4, 5'
 * @throws {Error} When an error occurs
 * @todo You can use lodash or another library for more complex operations
 */
const formatArray = (arr, options) => {
  try {
    switch (options.method) {
      case "join":
        return arr.join(options.separator || ", ");
      case "sort":
        return arr.sort();
      case "filter":
        return arr.filter(options.filterCondition);
      case "map":
        return arr.map(options.mapFunction);
      case "reduce":
        return arr.reduce(options.reducer, options.initialValue || 0);
      default:
        return arr;
    }
  } catch (error) {
    throw new Error(`Error formatting array: ${error.message}`);
  }
};

/**
 *
 * @param {*} obj - The object to format
 * @param {*} options - The formatting options
 * @param {String} options.method - The formatting method
 * @param {Array} [options.fields] - The fields to pick for pick method
 * @returns - {Object} The formatted object
 * @description Format the given object based on the provided options
 * @example
 * const obj = { field1: 'value1', field2: 'value2' };
 * const options = {
 * method: 'stringify'
 * };
 * const result = formatObject(obj, options);
 * console.log(result); // Output: '{"field1":"value1","field2":"value2"}'
 * @throws {Error} When an error occurs
 */
const formatObject = (obj, options) => {
  try {
    switch (options.method) {
      case "stringify":
        return JSON.stringify(obj);
      case "pick":
        return options.fields.reduce((acc, field) => {
          acc[field] = obj[field];
          return acc;
        }, {});
      case "flatten":
        return flattenObject(obj);
      default:
        return obj;
    }
  } catch (error) {
    throw new Error(`Error formatting object: ${error.message}`);
  }
};

/**
 *
 * @param {*} type - The type of the data
 * @param {*} data - The data to format
 * @param {*} formatOptions - The formatting options
 * @param {*} formatOptions.method - The formatting method
 * @returns - The formatted data
 * @description Format the given data based on the provided type and options
 * @example
 * const type = 'string';
 * const data = 'Hello, World!';
 * const formatOptions = {
 * method: 'uppercase'
 * };
 * const result = formatTransformation(type, data, formatOptions);
 * console.log(result); // Output: 'HELLO, WORLD!'
 * @throws {Error} When an error occurs
 * @todo Add more format types
 */
const formatTransformation = (type, data, formatOptions) => {
  try {
    switch (type) {
      case "string":
        return formatString(data, formatOptions);

      case "number":
        return formatNumber(data, formatOptions);

      case "date":
        return formatDate(data, formatOptions);

      case "boolean":
        return formatBoolean(data, formatOptions);

      case "array":
        return formatArray(data, formatOptions);

      case "object":
        return formatObject(data, formatOptions);

      default:
        throw new Error(`Unsupported format type: ${type}`);
    }
  } catch (error) {
    throw new Error(`Error formatting fields: ${error.message}`);
  }
};

/**
 * Executes a transformation based on the provided configuration.
 *
 * @param {Object} transformationConfig - The transformation configuration object.
 * @param {string} transformationConfig.transformationType - The type of transformation to perform. Can be one of: "map", "format", "combine".
 * @param {Array} transformationConfig.inputValues - The array of input values to be transformed.
 * @param {function} [transformationConfig.mapFunction] - The function to be applied to each input value when using the "map" transformation type.
 * @param {string} [transformationConfig.formatType] - The format type to apply when using the "format" transformation type. Can be "currency", "percentage", "date", etc.
 * @param {Object} [transformationConfig.formatOptions] - Additional options for formatting, such as currency code or date format.
 * @param {string} [transformationConfig.separator] - The separator to use when combining input values in the "combine" transformation type. Defaults to ", " if not provided.
 *
 * @returns {Array|string} - The transformed result. Returns an array of transformed values for "map" and "format" types, or a concatenated string for the "combine" type.
 *
 * @throws {Error} When an unsupported transformation type is provided or an error occurs during transformation.
 *
 * @description
 * This function processes input values based on the transformation type specified in the configuration. It supports three main types of transformations:
 *
 * 1. **map**: Applies a provided function to each input value. For example, you can use this to apply mathematical operations or string modifications to an array of values.
 * 2. **format**: Formats each input value based on the format type provided. This is useful for converting numbers to currencies, formatting dates, or handling percentages.
 * 3. **combine**: Joins all input values into a single string, with a separator between each value. This is useful for merging values into a readable format (e.g., comma-separated lists).
 *
 * @example <caption>Map Transformation: Convert all input values to uppercase</caption>
 * const transformationConfig = {
 *   transformationType: 'map',
 *   inputValues: ['apple', 'banana', 'cherry'],
 *   mapFunction: (value) => value.toUpperCase()
 * };
 * const result = executeTransformation(transformationConfig);
 * console.log(result); // Output: ['APPLE', 'BANANA', 'CHERRY']
 *
 * @example <caption>Map Transformation: Multiply input values by 2</caption>
 * const transformationConfig = {
 *   transformationType: 'map',
 *   inputValues: [1, 2, 3],
 *   mapFunction: (value) => value * 2
 * };
 * const result = executeTransformation(transformationConfig);
 * console.log(result); // Output: [2, 4, 6]
 *
 * @example <caption>Format Transformation: Convert numbers to currency format</caption>
 * const transformationConfig = {
 *   transformationType: 'format',
 *   inputValues: [1234.56, 7890.12],
 *   formatType: 'currency',
 *   formatOptions: { currency: 'USD', locale: 'en-US' }
 * };
 * const result = executeTransformation(transformationConfig);
 * console.log(result); // Output: ['$1,234.56', '$7,890.12']
 *
 * @example <caption>Format Transformation: Format dates</caption>
 * const transformationConfig = {
 *   transformationType: 'format',
 *   inputValues: ['2024-09-22', '2024-10-01'],
 *   formatType: 'date',
 *   formatOptions: { locale: 'en-US', dateStyle: 'medium' }
 * };
 * const result = executeTransformation(transformationConfig);
 * console.log(result); // Output: ['Sep 22, 2024', 'Oct 1, 2024']
 *
 * @example <caption>Combine Transformation: Join values with a custom separator</caption>
 * const transformationConfig = {
 *   transformationType: 'combine',
 *   inputValues: ['apple', 'banana', 'cherry'],
 *   separator: ' & '
 * };
 * const result = executeTransformation(transformationConfig);
 * console.log(result); // Output: 'apple & banana & cherry'
 *
 * @example <caption>Combine Transformation: Use default separator</caption>
 * const transformationConfig = {
 *   transformationType: 'combine',
 *   inputValues: ['apple', 'banana', 'cherry']
 * };
 * const result = executeTransformation(transformationConfig);
 * console.log(result); // Output: 'apple, banana, cherry'
 *
 * @throws {Error} When an unsupported transformation type is provided.
 */
const executeTransformation = (transformationConfig) => {
  try {
    const transformationType = transformationConfig.transformationType;
    const inputValues = transformationConfig.inputValues;
    switch (transformationType) {
      case "map":
        return inputValues.map(transformationConfig.mapFunction);

      case "format":
        return inputValues.map((value) =>
          formatTransformation(
            transformationConfig.formatType,
            value,
            transformationConfig.formatOptions
          )
        );

      case "combine":
        return inputValues.join(transformationConfig.separator || ", ");

      default:
        throw new Error(
          `Unsupported transformation type: ${transformationType}`
        );
    }
  } catch (error) {
    throw new Error(`Error executing transformation: ${error.message}`);
  }
};

module.exports = { executeTransformation };
