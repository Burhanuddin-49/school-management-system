import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Subject {
  name: string;
  mark: number;
}

export interface Student {
  id: number;
  name: string;
  age: number;
  class: string;
  photo: string;
  subjects: Subject[];
}

const initialState: Student[] = [
  {
    id: 1,
    name: "Alice Brown",
    age: 4,
    class: "KG1-A",
    photo:
      "https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?w=200&h=200&crop=faces",
    subjects: [
      { name: "Math", mark: 80 },
      { name: "Science", mark: 75 },
      { name: "English", mark: 85 },
    ],
  },
  {
    id: 2,
    name: "Mohammed Khan",
    age: 4,
    class: "KG1-B",
    photo:
      "https://plus.unsplash.com/premium_photo-1664303750803-64ed26cbf49c?w=200&h=200&crop=faces",
    subjects: [
      { name: "Math", mark: 90 },
      { name: "Science", mark: 88 },
      { name: "English", mark: 92 },
    ],
  },
  {
    id: 3,
    name: "Sophia Lee",
    age: 4,
    class: "KG1-C",
    photo:
      "https://plus.unsplash.com/premium_photo-1683140621573-233422bfc7f1?w=200&h=200&crop=faces",
    subjects: [
      { name: "Math", mark: 78 },
      { name: "Science", mark: 80 },
      { name: "English", mark: 86 },
    ],
  },
  {
    id: 4,
    name: "John Doe",
    age: 10,
    class: "5-A",
    photo:
      "https://plus.unsplash.com/premium_photo-1663054876115-b709596e37f8?w=200&h=200&crop=faces",
    subjects: [
      { name: "Math", mark: 85 },
      { name: "Science", mark: 78 },
      { name: "English", mark: 92 },
    ],
  },
  {
    id: 5,
    name: "Emma Watson",
    age: 7,
    class: "3-B",
    photo:
      "https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?w=200&h=200&crop=faces",
    subjects: [
      { name: "Math", mark: 82 },
      { name: "Science", mark: 76 },
      { name: "English", mark: 89 },
    ],
  },
  {
    id: 6,
    name: "Oliver Smith",
    age: 8,
    class: "4-C",
    photo:
      "https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?w=200&h=200&crop=faces",
    subjects: [
      { name: "Math", mark: 91 },
      { name: "Science", mark: 85 },
      { name: "English", mark: 90 },
    ],
  },
  {
    id: 7,
    name: "Jane Smith",
    age: 11,
    class: "6-B",
    photo:
      "https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?w=200&h=200&crop=faces",
    subjects: [
      { name: "Math", mark: 92 },
      { name: "Science", mark: 88 },
      { name: "English", mark: 95 },
    ],
  },
  {
    id: 8,
    name: "Liam Johnson",
    age: 12,
    class: "7-A",
    photo:
      "https://plus.unsplash.com/premium_photo-1661894778072-bd093f80f31a?w=200&h=200&crop=faces",
    subjects: [
      { name: "Math", mark: 84 },
      { name: "Science", mark: 80 },
      { name: "English", mark: 87 },
    ],
  },
  {
    id: 9,
    name: "Ava Williams",
    age: 13,
    class: "8-D",
    photo:
      "https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?w=200&h=200&crop=faces",
    subjects: [
      { name: "Math", mark: 86 },
      { name: "Science", mark: 83 },
      { name: "English", mark: 88 },
    ],
  },
  {
    id: 10,
    name: "Noah Wilson",
    age: 14,
    class: "9-C",
    photo:
      "https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?w=200&h=200&crop=faces",
    subjects: [
      { name: "Math", mark: 89 },
      { name: "Science", mark: 86 },
      { name: "English", mark: 91 },
    ],
  },
];


const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      console.log(action.payload);
      state.push(action.payload);
    },
    updateStudent: (state, action: PayloadAction<Student>) => {
      const index = state.findIndex(
        (student) => student.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteStudent: (state, action: PayloadAction<number>) => {
      return state.filter((student) => student.id !== action.payload);
    },
  },
});

export const { addStudent, updateStudent, deleteStudent } =
  studentsSlice.actions;
export default studentsSlice.reducer;
