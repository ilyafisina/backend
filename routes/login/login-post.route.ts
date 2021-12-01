import schema, {joiSchema} from './login.spec/login.schema'
export const swPostUser = {
    "summary": "Create the new user",
    "tags": [
      "login"
    ],
    "requestBody": {
      "content": {
        "application/json": {
            "schema": {
                ...schema
              }
        }
      }
    },
    "responses": {
      "200": {
        "description": "User created"
      },
      "default": {
        "description": "Error message"
      }
    }
  }
  export default async (req: any, res: any) => {
    try {
      await joiSchema.validateAsync(req.body)
      res.send('This is a login POST service')
    } catch(err) {
      res.send(err)
    }
  }