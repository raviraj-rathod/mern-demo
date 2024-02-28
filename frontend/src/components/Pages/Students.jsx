import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import API from "../../apis";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { allStudents } from "../Store/studentsSlice";

export default function Students() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    getAllStudents()
  }, [])
  
  const getAllStudents = () =>{
    const backend = new API();
    backend.fetch('student/get', {
      method: "GET"
    }).then((res) => {
      if (res.status == 'success') {
        dispatch(allStudents(res.content))
      }
      console.log(res);
    })
  }

  const notify = (message) => toast(message);

  const deleteClick = (data) => {
    console.log(data);
    const backend = new API();
    backend.fetch(`student/delete/${data.id}`, {
      method: "GET"
    }).then((res) => {
      if (res.status == 'success') {
        notify(res.message)
        getAllStudents()
      }
      console.log(res);
    })
  }
  const goTo = (link) => {
    navigate(link)
  }
  const studentsData = useSelector((state) => {
    console.log(state);
    return state.student.students;
  })
  return (
    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
      <div className="flex align-center justify-between my-3">
        <div></div>
        <Button className={`mx-3 text-white`} onClick={() => goTo(`/students/add`)}>Add Student</Button>
      </div>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">#</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Gender</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Phone number</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            studentsData.map((student, ind) => {
              return (
                <tr key={student?.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ind + 1}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{student?.student_name}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{student?.student_email}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{student?.student_gender}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{student?.student_phone}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <Button className={`mx-3 text-white`} onClick={() => goTo(`/students/${student?.id}`)}>Edit</Button>
                    <Button className={`mx-3 text-white`} onClick={() => deleteClick(student)}>Delete</Button>
                  </td>
                </tr>)
            })
          }
        </tbody>
      </table>
    </div>
  )
}
