import swaggerJSDoc, { Options, SwaggerDefinition } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for Home-Tools",
    version: "1.0.0",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options: Options = {
  swaggerDefinition,
  apis: [`${__dirname}/../routes/*.js`],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
