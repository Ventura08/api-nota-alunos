export interface Grade {
	nextId: number; 
      grades: {
      id: number,
      student: string,
      subject: string,
      type: string,
      value: number,
      timestamp: Date}
}

export interface GradesData {
      id: number;
      student: string,
      subject: string,
      type: string,
      value: number,
      timestamp: Date
}

