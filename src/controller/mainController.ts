import { Grade, GradesData } from "./../interfaces/gradeInterface";
import { MainModel } from "../model/mainModel";

const DB = new MainModel();
const currentData = DB.getData();
const nextId = DB.getNextId();

export class MainController {
  async loadData() {
    return await DB.getData();
  }

  async saveNewData(data: Grade) {
    data.grades.id = Number(await nextId);
    data.nextId = Number(await nextId) + 1;

    const validator = await DB.createData(data);
    return validator ? true : false;
  }

  async editData(data: GradesData, id: number) {
    const grades = await currentData;
    const arrayGrades: Array<GradesData> = Array.from(grades.grades);
    const changedData = this.changeData(arrayGrades, data, id);

    const grade: any = {
      nextId: await nextId,
      grades: await changedData,
    };
    const valildator = await DB.editData(grade)
  }

  async deleteData(id: number) {
    const grades = await currentData;
    const arrayGrades: Array<GradesData> = Array.from(grades.grades);
    const nonDeletedData = this.deleteFilter(id, arrayGrades);
    console.log(nonDeletedData);
}

  async changeData(
    arrayGrades: Array<GradesData>,
    data: GradesData,
    id: number
  ) {
    return arrayGrades.map((item) => {
      if (item.id == id) {
        item = data;
        item.id = Number(id);
      }
      return item;
    });
  }

  async deleteFilter(
    id: number,
    arrayGrades: Array<GradesData>,
  ) {
    return arrayGrades.map((item) => item.id != id)
  }


}
