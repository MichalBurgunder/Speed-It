# Speeder

Quickly assesses function speed for node.js functions by running the function multiple times. Simple example:

```
  const speeder = require('speeder')
  // ...

  const result = await speeder(testFunction)
  console.log(result)
  /**
   *  => {
   *   min: 0.0004448890686035156,
   *   max: 0.024062156677246094,
   *   mean: 0.0006889100074768067,
   *   median: 0.0004668235778808594,
   *   variance: 0.0000014637582903558247,
   *   std: 0.0012098587894278509, // standard deviation
   *   counts: 1000,
   *   name: 'Function 1'
   *   }
   */
```

Ofcourse, some functions will want to be run with one input:

```
const result = await speeder(testFunction, {inputs: 777})
```

Some other might want to be run with multiple inputs:

```
const result = await speeder(testFunction, {inputs: [777, true], multipleInputs: true})
```

You can also analyze an array of functions:

```
const result = await speeder([testFunction, testFunction2], {inputs: [777, true]})
```

as well as have inputs for all of these functions as well:

```

const result = await speeder([testFunction, testFunction2], {inputs: [["firstInput", ["secondInput"]], [true, false]]})

```

You can also create your own analytics pipeline by only fetching the raw data:

```

const result = await speeder([testFunction, testFunction2], {raw: true})
console.log(result) // => [0.023, 0.022, 0.045, ....]

```

Full list of options:

`{names: "fetchData function"}`: Return the analysis with the specified string name

`{inputs: [88, true, ...]` (default no inputs): Executes the function with the given inputs (use double arrays for multiple functions)

`{multipleInputs: true}` (default: false): Whether you are inputting mutiple values into the functions or not (NOTE: for multiple functions, you can input an array: `{multipleInputs: [true, true, false, true,...]}`)

`{errors: true}` (default false): If set to true, and an error is thrown, it includes this particular datapoint in the analysis.

`{errorOutAfter: 10}` (default 1): Specifies the number of errors that may occur before execution is halted (used in conjunction with the `errors` option). If an error is thrown, and `{errors: false}`, it will not include this data point in the analysis

`{raw: true}` (default false): If true, returns an array of datapoints

`{counts: 100}` (default 1000): Specifies the number of times the functions are run


## Support
Feel free to open issues and request features on [github](https://github.com/MichalBurgunder/speeder).

