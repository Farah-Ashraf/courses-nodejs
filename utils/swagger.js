const swaggerJsdoc = require('swagger-jsdoc');

const usersDocs = require('../docs/users.swagger');
const coursesDocs = require('../docs/courses.swagger');

const options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'Courses Management API',
      version: '1.0.0',
      description: 'API documentation for the Courses Management System'
    },

    servers: [
      {
        url: 'http://localhost:5000'
      }
    ],

    components: {

      // JWT authentication
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },

      // Database models
      schemas: {

        User: {
          type: 'object',

          required: [
            'email',
            'password',
            'firstName',
            'lastName'
          ],

          properties: {

            _id: {
              type: 'string',
              example: '68c123456789abcdef123456'
            },

            email: {
              type: 'string',
              format: 'email',
              example: 'farah@gmail.com'
            },

            password: {
              type: 'string',
              format: 'password',
              minLength: 8,
              writeOnly: true,
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
              example: 'uploads/profile-image.png'
            }
          }
        },


        Course: {
          type: 'object',

          required: [
            'title',
            'price'
          ],

          properties: {

            _id: {
              type: 'string',
              example: '68c123456789abcdef123456'
            },

            title: {
              type: 'string',
              example: 'Node.js Course'
            },

            price: {
              type: 'number',
              example: 500
            }
          }
        }
      }
    },

    // API endpoints
    paths: {
      ...usersDocs,
      ...coursesDocs
    }
  },

  apis: []
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;