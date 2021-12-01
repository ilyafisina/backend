const joi = require('joi')
export const joiSchema = joi.object().keys({
  mode:    joi.string().required(),
  email:   joi.string().email()
})
const j2s = require('joi-to-swagger')
const schema = j2s(joiSchema).swagger
export default schema