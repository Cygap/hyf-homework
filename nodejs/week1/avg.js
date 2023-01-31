console.log(getAverage(process.argv));

/**
 *
 * @param {Array} arguments - list of arguments the user have entered. Presumes argument[0] and argument[1]
 *  to always be system default peth-arguments, which are removed.
 * @returns {Number} - the average of provided arguments (all non-number values are considered to be 0);
 */
function getAverage(arguments) {
  arguments.splice(0, 2);
  if (arguments.length) {
    console.log("All not-number arguments are considered to be Zeros");
    return (
      arguments.reduce(
        (result, argument) => (result += isNaN(+argument) ? 0 : +argument),
        0
      ) / arguments.length
    );
  } else {
    return "You havn't provided any arguments";
  }
}
