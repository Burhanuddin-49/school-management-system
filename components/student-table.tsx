"use client";

import type React from "react";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import type { RootState } from "@/store/store";
import {
  addStudent,
  updateStudent,
  deleteStudent,
} from "@/store/studentsSlice";
import type { Student } from "@/store/studentsSlice";

const subjectOptions = [
  "Math",
  "Science",
  "English",
  "History",
  "Geography",
  "Art",
  "Music",
  "Physical Education",
];
const yearOptions = [
  "KG1",
  "KG2",
  "KG3",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];
const divisionOptions = ["A", "B", "C", "D", "E"];

export function StudentTable() {
  const dispatch = useDispatch();
  const students = useSelector((state: RootState) => state.students);
  const filters = useSelector((state: RootState) => state.filters);

  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    year: "",
    division: "",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter((student) => {
    const [studentYear, studentDivision] = student.class.split("-");
    return (
      (!filters.level ||
        (filters.level === "Primary"
          ? Number.parseInt(studentYear) <= 5 || studentYear.includes("KG")
          : Number.parseInt(studentYear) > 5)) &&
      (!filters.year || studentYear === filters.year) &&
      (!filters.division || studentDivision === filters.division)
    );
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = () => {
    const newId = Math.max(...students.map((s) => s.id)) + 1;
    const newClass = `${newStudent.year}-${newStudent.division}`;
    const studentToAdd: Student = {
      id: newId,
      name: newStudent.name,
      age: Number.parseInt(newStudent.age),
      class: newClass,
      photo: "/placeholder.svg?height=200&width=200",
      subjects: [],
    };
    dispatch(addStudent(studentToAdd));
    setNewStudent({ name: "", age: "", year: "", division: "" });
    setIsAddModalOpen(false);
  };

  const handleEdit = (student: Student) => {
    const [year, division] = student.class.split("-");
    setEditingStudent({ ...student, year, division });
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingStudent) {
      setEditingStudent({ ...editingStudent, [e.target.name]: e.target.value });
    }
  };

  const handleEditSelectChange = (name: string, value: string) => {
    if (editingStudent) {
      setEditingStudent({ ...editingStudent, [name]: value });
    }
  };

  const handleEditSubjectChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (editingStudent) {
      const updatedSubjects = [...editingStudent.subjects];
      updatedSubjects[index] = {
        ...updatedSubjects[index],
        mark: Number.parseInt(e.target.value),
      };
      setEditingStudent({ ...editingStudent, subjects: updatedSubjects });
    }
  };

  const handleSubjectChange = (value: string, index: number) => {
    if (editingStudent) {
      const updatedSubjects = [...editingStudent.subjects];
      updatedSubjects[index] = { ...updatedSubjects[index], name: value };
      setEditingStudent({ ...editingStudent, subjects: updatedSubjects });
    }
  };

  const handleAddSubject = () => {
    if (editingStudent) {
      setEditingStudent({
        ...editingStudent,
        subjects: [...editingStudent.subjects, { name: "", mark: 0 }],
      });
    }
  };

  const handleSaveEdit = () => {
    if (editingStudent) {
      const updatedStudent: Student = {
        ...editingStudent,
        class: `${editingStudent.year}-${editingStudent.division}`,
        age: Number.parseInt(editingStudent.age as unknown as string),
      };
      dispatch(updateStudent(updatedStudent));
      setIsEditModalOpen(false);
    }
  };

  const handleView = (student: Student) => {
    setViewingStudent(student);
    setIsViewModalOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteStudent(id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Student List</h2>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>Add New Student</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newStudent.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Age
                </Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={newStudent.age}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">
                  Year
                </Label>
                <Select
                  name="year"
                  onValueChange={(value) => handleSelectChange("year", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="division" className="text-right">
                  Division
                </Label>
                <Select
                  name="division"
                  onValueChange={(value) =>
                    handleSelectChange("division", value)
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select division" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisionOptions.map((division) => (
                      <SelectItem key={division} value={division}>
                        {division}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddStudent}>Save</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.age}</TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell className="flex">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(student.id)}
                  className="ml-2"
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleView(student)}
                  className="ml-2"
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Student: {editingStudent?.name}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="info">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Student Information</TabsTrigger>
              <TabsTrigger value="subjects">Subjects & Marks</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={editingStudent?.name}
                    onChange={handleEditInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-age" className="text-right">
                    Age
                  </Label>
                  <Input
                    id="edit-age"
                    name="age"
                    type="number"
                    value={editingStudent?.age}
                    onChange={handleEditInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-year" className="text-right">
                    Year
                  </Label>
                  <Select
                    name="year"
                    value={editingStudent?.year}
                    onValueChange={(value) =>
                      handleEditSelectChange("year", value)
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-division" className="text-right">
                    Division
                  </Label>
                  <Select
                    name="division"
                    value={editingStudent?.division}
                    onValueChange={(value) =>
                      handleEditSelectChange("division", value)
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select division" />
                    </SelectTrigger>
                    <SelectContent>
                      {divisionOptions.map((division) => (
                        <SelectItem key={division} value={division}>
                          {division}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="subjects">
              <div className="grid gap-4 py-4">
                {editingStudent?.subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 items-center gap-4"
                  >
                    <Select
                      value={subject.name}
                      onValueChange={(value) =>
                        handleSubjectChange(value, index)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjectOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      value={subject.mark}
                      onChange={(e) => handleEditSubjectChange(e, index)}
                      className="col-span-2"
                    />
                  </div>
                ))}
                <Button onClick={handleAddSubject} variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Subject
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          <Button onClick={handleSaveEdit}>Save Changes</Button>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Student Details: {viewingStudent?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex justify-center">
                  <Image
                    src={viewingStudent?.photo || "/placeholder.svg"}
                    alt={viewingStudent?.name || "Student"}
                    width={200}
                    height={200}
                    className="rounded-full"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-semibold">Name:</div>
                  <div>{viewingStudent?.name}</div>
                  <div className="font-semibold">Age:</div>
                  <div>{viewingStudent?.age}</div>
                  <div className="font-semibold">Class:</div>
                  <div>{viewingStudent?.class}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Current Year Marks</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Mark</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {viewingStudent?.subjects.map((subject, index) => (
                      <TableRow key={index}>
                        <TableCell>{subject.name}</TableCell>
                        <TableCell>{subject.mark}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
