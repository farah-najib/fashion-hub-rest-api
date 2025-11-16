const swaggerUi = require('swagger-ui-express')
// const YAML = require('yamljs')
const YAML = require('yaml')
const path = require('path')
const fs = require('fs')

const {
  SwaggerUIBundle,
  SwaggerUIStandalonePreset
} = require('swagger-ui-dist')

// const swaggerDocument = YAML.load(path.join(__dirname, 'openapi.yaml'))
const file = fs.readFileSync(path.join(__dirname, 'openapi.yaml'), 'utf8')
const swaggerDocument = YAML.parse(file)

module.exports = {
  swaggerUi,
  swaggerDocument
}
