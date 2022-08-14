import { Grade, GradesData } from "./../interfaces/gradeInterface";
import { MainModel } from "../model/mainModel";

const DB = new MainModel();
const currentData = DB.getData();
const nextId = DB.getNextId();

export class MainController {
  async loadData() {
    return await DB.getData();
  }

  async loadCustomData(id: number) {
    const grades = await currentData;
    const arrayGrades: Array<GradesData> = Array.from(grades.grades);
    return await DB.getCustomData(arrayGrades, id);
  }

  async saveNewData(data: Grade) {
    data.grades.id = Number(await nextId);
    data.nextId = Number(await nextId) + 1;

    const validator = await DB.createData(data);
    // return validator ? true : false;
  }

  async editData(data: GradesData, id: number) {
    const grades = await currentData;
    const arrayGrades: Array<GradesData> = Array.from(grades.grades);
    const changedData = this.changeData(arrayGrades, data, id);

    const grade: any = {
      nextId: await nextId,
      grades: await changedData,
    };
    const validator = await DB.editData(grade);
    return validator ? true : false;
  }

  async deleteData(id: number) {
    const grades = await currentData;
    const arrayGrades: Array<GradesData> = Array.from(grades.grades);
    const nonDeletedData = this.deleteFilter(id, arrayGrades);
    // console.log(nonDeletedData);
    const grade: any = {
      nextId: await nextId,
      grades: await nonDeletedData,
    };

    const validator = await DB.deleteData(grade);

    return validator ? true : false;
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

  async deleteFilter(id: number, arrayGrades: Array<GradesData>) {
    return arrayGrades.filter((item) => item.id != id);
  }

  async loadSumGradeStudent(nome: string, materia: string) {
    const grades = await currentData;
    let nota = 0;
    const sumGrades = grades.grades.map(
      (aluno: { student: string; subject: string; value: number }) => {
        if (
          aluno.student == nome &&
          aluno.subject.split("-")[1].replace(" ", "") == materia
        ) {
          nota += aluno.value;
        }
      }
    );

    return nota;
  }

  async loadMedGradeStudent(nome: string, materia: string) {
    const grades = await currentData;
    let nota: {value: number, counter: number} = {
        value: 0,
        counter: 0
    };
    const sumGrades = grades.grades.map(
      (aluno: { student: string; subject: string; value: number }) => {
        if (
          aluno.student == nome &&
          aluno.subject.split("-")[1].replace(" ", "") == materia
        ) {
          nota.counter += 1
          nota.value += aluno.value 
        }
      }
    );
    return Number(nota.value / nota.counter).toFixed(2);
  }
}
