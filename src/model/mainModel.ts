import { Grade, GradesData } from './../interfaces/gradeInterface';
import {promises as fs} from "fs"
import grades from "../database/grades.json"
import path from "path"

export class MainModel {
    async getData() {
        try {
            const allData = await fs.readFile(path.join(__dirname, '../database/grades.json'))
            return JSON.parse(allData.toString())
        }catch (error) {
            console.log(error)
        }
    }

    async createData(data: Grade) {
        try {
           let controller = await this.reWriteFileCreate(grades, data.grades, data.nextId)
            return controller ? true : false
        }catch (error) {
            console.log(error)
        }
    }

    async editData(data: Grade) {
        try {
            let controller = await this.reWriteFileEdit(data)
            return controller ? true : false
        }catch (err) {

        }
    }

    async deleteData(grade: Grade) {
        
    }

    async getNextId() {
        return grades.nextId
    }



    async reWriteFileCreate(currentData: any, newGrade: {id: number}, nextId: number) {
        
        await currentData.grades.push(newGrade);
        currentData.nextId = nextId;
        // console.log(path.join(__dirname, '../database/grades.json'));
        await fs.writeFile(path.join(__dirname, '../database/grades.json'), JSON.stringify(currentData, null, 2))
        return true
    }

    async reWriteFileEdit(newData: Grade) {
        await fs.writeFile(path.join(__dirname, '../database/grades.json'), JSON.stringify(newData, null, 2))
        return true
    }
 }