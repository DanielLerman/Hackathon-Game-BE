const signupSchema = {
    type: "object",
    properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        nickname: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        confirmPassword: { type: "string" },
    },
    required: [
        "firstName",
        "lastName",
        "nickname",
        "email",
        "password",
        "confirmPassword",
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
