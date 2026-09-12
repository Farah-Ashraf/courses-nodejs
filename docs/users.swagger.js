const usersDocs = {
  '/api/users': {
    get: {
      summary: 'Get all users',
      tags: ['Users'],

      security: [
        {
          bearerAuth: []
        }
      ],

      responses: {
        200: {
          description: 'Users retrieved successfully'
        },

        401: {
          description: 'Invalid or missing token'
        }
      }
    }
  },

  '/api/users/signup': {
    post: {
      summary: 'Register a new user',
      tags: ['Users'],

      requestBody: {
        required: true,

        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',

              required: [
                'email',
                'password',
                'firstName',
                'lastName'
              ],

              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'farah@gmail.com'
                },

                password: {
                  type: 'string',
                  format: 'password',
                  minLength: 8,
                  example: '12345678'
                },

                firstName: {
                  type: 'string',
                  example: 'Farah'
                },

                lastName: {
                  type: 'string',
                  example: 'Ashraf'
                },

                role: {
                  type: 'string',
                  enum: [
                    'admin',
                    'manager',
                    'user'
                  ],
                  default: 'user',
                  example: 'user'
                },

                avatar: {
                  type: 'string',
                  format: 'binary'
                }
              }
            }
          }
        }
      },

      responses: {
        201: {
          description: 'User registered successfully'
        },

        400: {
          description: 'User already exists'
        }
      }
    }
  },

  '/api/users/signin': {
    post: {
      summary: 'Login a user',
      tags: ['Users'],

      requestBody: {
        required: true,

        content: {
          'application/json': {
            schema: {
              type: 'object',

              required: [
                'email',
                'password'
              ],

              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'farah@gmail.com'
                },

                password: {
                  type: 'string',
                  format: 'password',
                  example: '12345678'
                }
              }
            }
          }
        }
      },

      responses: {
        200: {
          description: 'Login successful'
        },

        401: {
          description: 'Invalid email or password'
        }
      }
    }
  }
};

module.exports = usersDocs;