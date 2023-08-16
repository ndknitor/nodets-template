import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json'; // Output JSON file for generated Swagger spec
const endpointsFiles = ['./src/server.ts'];   // Path to your route files

const doc = {
    info: {
        title: 'Your API',
        description: 'API documentation using Swagger',
        version: '1.0.0',
    },
    host: 'localhost:' + process.env["HOST_PORT"] || 3000, // Update with your server's host and port
    basePath: '/',
    schemes: ['http'], // Update with 'https' if needed
};

swaggerAutogen(outputFile, endpointsFiles, doc);
