import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import API from "../../apis";
import { getAllUsers } from "../Store/usersSlice";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Users() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    getAllusers()
  }, [])
  
  const getAllusers = () =>{
    const backend = new API();
    backend.fetch('user/get', {
      method: "GET"
    }).then((res) => {
      if (res.status == 'success') {
        dispatch(getAllUsers(res.content))
      }
      console.log(res);
    })
  }

  const notify = (message) => toast(message);

  const deleteClick = (data) => {
    console.log(data);
    const backend = new API();
    backend.fetch(`user/delete/${data.id}`, {
      method: "GET"
    }).then((res) => {
      if (res.status == 'success') {
        notify(res.message)
        getAllusers()
        // dispatch(getAllUsers(res.content))
      }
      console.log(res);
    })
  }
  const goTo = (link) => {
    navigate(link)
  }
  const usersData = useSelector((state) => {
    console.log(state);
    return state.users.users;
  })
  return (
    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
      <div className="flex align-center justify-between my-3">
        <div></div>
        <Button className={`mx-3 text-white`} onClick={() => goTo(`/users/add`)}>Add User</Button>
      </div>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">#</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Username</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User type</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            usersData.map((user, ind) => {
              return (
                <tr key={user?.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ind + 1}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user?.username}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user?.type}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <Button className={`mx-3 text-white`} onClick={() => goTo(`/users/${user?.id}`)}>Edit</Button>
                    <Button className={`mx-3 text-white`} onClick={() => deleteClick(user)}>Delete</Button>
                  </td>
                </tr>)
            })
          }
        </tbody>
      </table>
    </div>
  )
}
