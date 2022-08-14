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

app.get("/get-data/:id", async (req: Request, res: Response) => {
  try {
    res.json(await Controller.loadCustomData(Number(req.params.id)));
  } catch (error) {
    console.log(error);
  }
});

app.get("/get-data/:nome/:materia/sum", async (req: Request, res: Response) => {
  try {
    const sumGrades = await Controller.loadSumGradeStudent(req.params.nome, req.params.materia)
    res.send(sumGrades.toString());
  } catch (error) {
    console.log(error);
  }
});

app.get("/get-data/:nome/:materia/med", async (req: Request, res: Response) => {
    try {
      const medGrades = await Controller.loadMedGradeStudent(req.params.nome, req.params.materia)
      res.send(medGrades.toString());
    } catch (error) {
      console.log(error);
    }
  });

app.post("/create-data", async (req: Request, res: Response) => {
  try {
    await Controller.saveNewData(req.body);
    // console.log("voltou");
    res.send(
      "Regitro salvo com sucesso: \n " + JSON.stringify(req.body, null, 3)
    );
  } catch (error) {
    console.log(error);
  }
});

app.put("/edit-data/:id", async (req: Request, res: Response) => {
  try {
    await Controller.editData(req.body, Number(req.params.id));
    res.send(`Registro de ID ${req.params.id} editado com sucesso `);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/:id/delete", async (req: Request, res: Response) => {
  try {
    await Controller.deleteData(Number(req.params.id));
    res.send(`Registro de ID ${req.params.id} deletado com sucesso`);
  } catch (error) {
    console.log(error);
  }
});
