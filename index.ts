import loginRouter from './routes/login'
import swDocument from './swagger.def'
import {Request, Response} from 'express'

const { sequelize, Phone } = require("./models");

const express = require('express'),
  http = require('http'),
  swaggerUI = require('swagger-ui-express')
const app = express()
const bodyParser = require('body-parser').json()

app.use(bodyParser)
app.use(express.json())
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swDocument))
app.use('/login', loginRouter)
const server = http.createServer(app)

const hostname = '0.0.0.0'
const port = 3001
server.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}`)
  await sequelize.authenticate()
  // await sequelize.sync()
  console.log("Database connected successfully")
})

app.post("/phones", async (req: Request, res: Response) => {
  const { name, quantity, brand } = req.body;

  try {
    const product = await Phone.create({ name, quantity, brand });

    return res.json(product);
  } catch (err) {
    return res.json(err);
  }
});

app.get("/phones", async (_: Request, res: Response) => {
  try {
    const products = await Phone.findAll();

    return res.json(products);
  } catch (err) {
    return res.json(err);
  }
});

app.get("/phones/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const product = await Phone.findOne({
      where: { id },
    });

    return res.json([product]);
  } catch (err) {
    return res.json(err);
  }
});

app.put("/phones/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, quantity, brand } = req.body;

  try {
    const product = await Phone.findOne({
      where: { id },
    });

    product.name = name;
    product.quantity = quantity;
    product.brand = brand;

    await product.save();

    return res.json(product);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});

app.delete("/phones/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const product = await Phone.findOne({
      where: { id },
    });

    await product.destroy();
    return res.json({ message: "Phone deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});