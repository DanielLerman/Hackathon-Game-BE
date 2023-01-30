const Ajv = require("ajv");
const ajv = new Ajv();

function compileValidationSchema(schema) {
    return ajv.compile(schema);
}

module.exports = compileValidationSchema;
