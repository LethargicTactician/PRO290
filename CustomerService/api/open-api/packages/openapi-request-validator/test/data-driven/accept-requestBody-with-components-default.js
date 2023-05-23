module.exports = {
  validateArgs: {
    parameters: [],
    requestBody: {
      description: 'a test body',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Test1',
          },
        },
      },
    },
    schemas: {
      Test1: {
        properties: {
          foo: {
            type: 'string',
            default: 'foo',
          },
        },
        required: ['foo'],
      },
    },
  },
  request: {
    body: {},
    headers: {
      'content-type': 'application/json',
    },
  },
};
