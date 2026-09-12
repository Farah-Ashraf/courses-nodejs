const coursesDocs = {

  '/api/courses': {

    get: {
      summary: 'Get all courses',
      tags: ['Courses'],

      responses: {
        200: {
          description: 'Courses retrieved successfully'
        }
      }
    },

    post: {
      summary: 'Add a new course',
      tags: ['Courses'],

      security: [
        {
          bearerAuth: []
        }
      ],

      requestBody: {
        required: true,

        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Course'
            }
          }
        }
      },

      responses: {
        201: {
          description: 'Course created successfully'
        },

        401: {
          description: 'Invalid or missing token'
        },

        403: {
          description: 'Not authorized'
        }
      }
    }
  },


  '/api/courses/{courseId}': {

    get: {
      summary: 'Get a course by ID',
      tags: ['Courses'],

      parameters: [
        {
          name: 'courseId',
          in: 'path',
          required: true,

          schema: {
            type: 'string'
          },

          example: '68c123456789abcdef123456'
        }
      ],

      responses: {
        200: {
          description: 'Course retrieved successfully'
        },

        404: {
          description: 'Course not found'
        }
      }
    },


    patch: {
      summary: 'Update a course',
      tags: ['Courses'],

      security: [
        {
          bearerAuth: []
        }
      ],

      parameters: [
        {
          name: 'courseId',
          in: 'path',
          required: true,

          schema: {
            type: 'string'
          },

          example: '68c123456789abcdef123456'
        }
      ],

      requestBody: {
        required: true,

        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Course'
            }
          }
        }
      },

      responses: {
        200: {
          description: 'Course updated successfully'
        },

        401: {
          description: 'Invalid or missing token'
        },

        403: {
          description: 'Not authorized'
        },

        404: {
          description: 'Course not found'
        }
      }
    },


    delete: {
      summary: 'Delete a course',
      tags: ['Courses'],

      security: [
        {
          bearerAuth: []
        }
      ],

      parameters: [
        {
          name: 'courseId',
          in: 'path',
          required: true,

          schema: {
            type: 'string'
          },

          example: '68c123456789abcdef123456'
        }
      ],

      responses: {
        200: {
          description: 'Course deleted successfully'
        },

        401: {
          description: 'Invalid or missing token'
        },

        403: {
          description: 'Not authorized'
        },

        404: {
          description: 'Course not found'
        }
      }
    }
  }
};

module.exports = coursesDocs;