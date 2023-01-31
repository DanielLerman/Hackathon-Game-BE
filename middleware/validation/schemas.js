const signupSchema = {
    type: "object",
    properties: {
        email: { type: "string" },
        password: { type: "string" },
        repassword: { type: "string" },
    },
    required: [
        "email",
        "password",
        "repassword",
    ],
    additionalProperties: false,
};

const loginSchema = {
    type: "object",
    properties: {
        email: { type: "string" },
        password: { type: "string" },
    },
    required: ["email", "password"],
    additionalProperties: false,
};

module.exports = {
    signupSchema,
    loginSchema,
};
