console.log(getAverage(process.argv));

/**
 *
 * @param {Array} arguments - list of arguments the user have entered. Presumes argument[0] and argument[1]
 *  to always be system default peth-arguments, which are removed.
 * @returns {Number} - the average of provided arguments
 */
function getAverage(arguments) {
  arguments.splice(0, 2);
  const args = arguments
    .map((parameter) => Number(parameter))
    .filter((parameter) => !isNaN(parameter));
  console.log(args);
  if (args.length) {
    return (
      args.reduce((result, argument) => (result += argument), 0) / args.length
    );
  } else {
    return "You havn't provided any arguments";
  }
}
