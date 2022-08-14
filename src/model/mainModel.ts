import { Grade, GradesData } from "./../interfaces/gradeInterface";
import { promises as fs } from "fs";
import grades from "../database/grades.json";
import path from "path";

export class MainModel {
  async getData() {
    try {
      const allData = await fs.readFile(
        path.join(__dirname, "../database/grades.json")
      );
      return JSON.parse(allData.toString());
    } catch (error) {
      console.log(error);
    }
  }

  async getCustomData(data: Array<GradesData>, id: number) {
    try {
        // console.log(data)
      const filteredData = await this.findStudent(data, id);
    //   console.log(filteredData)
      return filteredData
    } catch (error) {
      console.log(error);
    }
  }

  async createData(data: Grade) {
    try {
      let controller = await this.reWriteFileCreate(
        await this.getData(),
        data.grades,
        data.nextId
      );
      //    console.log(controller)
      return controller ? true : false;
    } catch (error) {
      console.log(error);
    }
  }

  async editData(data: Grade) {
    try {
      let controller = await this.reWriteFileEdit(data);
      return controller ? true : false;
    } catch (error) {
      return console.log(error);
    }
  }

  async deleteData(data: Grade) {
    try {
      let controller = await this.reWriteFileEdit(data);
      return controller ? true : false;
    } catch (error) {
      return console.log(error);
    }
  }

  async getNextId() {
    return grades.nextId;
  }

  async findStudent(data: Array<GradesData>,id: number) {
    
    try {
        return data.filter((item) => item.id == id) || "NENHUM REGISTRO ENCOTRADO"
    }catch (error) {
        return console.log(error)
    }
  }

  async reWriteFileCreate(
    currentData: any,
    newGrade: { id: number },
    nextId: number
  ) {
    await currentData.grades.push(newGrade);
    currentData.nextId = nextId;
    // console.log(path.join(__dirname, '../database/grades.json'));
    await fs.writeFile(
      path.join(__dirname, "../database/grades.json"),
      JSON.stringify(currentData, null, 2)
    );
    return true;
  }

  async reWriteFileEdit(newData: Grade) {
    await fs.writeFile(
      path.join(__dirname, "../database/grades.json"),
      JSON.stringify(newData, null, 2)
    );
    return true;
  }

  async reWriteFileDelete(newData: Grade) {
    await fs.writeFile(
      path.join(__dirname, "../database/grades.json"),
      JSON.stringify(newData, null, 2)
    );
    return true;
  }
}
