import { MainController } from "./controller/mainController";
import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: express.Express = express();
const PORT = process.env.PORT || 3000;
const Controller = new MainController();

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Connected Successfully, listen to ${PORT}`);
});

app.get("/get-data", async (req: Request, res: Response) => {
  try {
    res.send(await Controller.loadData());
  } catch (error) {
    console.log(error);
  }
});

app.post("/create-data", async (req: Request, res: Response) => {
  try {
    await Controller.saveNewData(req.body);
    // console.log("voltou");
    res.send("Regitro salvo com sucesso: \n " + JSON.stringify(req.body, null, 3))
  } catch (error) {
    console.log(error);
  }
});

app.put("/edit-data/:id", async (req: Request, res: Response) => {
    try {
      await Controller.editData(req.body, Number(req.params.id));
      res.send(`Registro de ID ${req.params.id}: ` + JSON.stringify(req.body, null, 3))
    } catch (error) {
      console.log(error);
    }
  });
