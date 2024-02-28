import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import API from "../../apis";
import { getSingleUser } from "../Store/usersSlice";
import Form from "../Form";
import { toast } from "react-toastify";

export default function User() {
  const navigate = useNavigate()
  const [fload, setfload] = useState(false)
  const dispatch = useDispatch();
  const params = useParams()
  useEffect(() => {
    if (params.id) {
      if (params.id != 'add') {
        setfload(true)
        const backend = new API();
        backend.fetch(`user/get/${params.id}`, {
          method: "GET"
        }).then((res) => {
          if (res.status == 'success') {
            dispatch(getSingleUser(res.content))
            setfload(false)
          }
        })
      } else {
        setfload(false)
      }
    }
  }, [params])
  const userData = useSelector((state) => {
    console.log(state.users);
    return state.users.singleUser;
  })
  console.log(userData);
  const handleChangeSelect = (name, value) => {
    console.log(name, value);
  };
  const [fields] = useState([
    {
      name: 'username',
      label: 'User name',
      type: 'text',
      placeholder: 'Enter user name',
      classes: 'mb-4',
      rules: {
        required: 'Username is required',
      },
    },
    {
      name: 'type',
      label: 'Type of user',
      type: 'select',
      options: [
        { label: 'Student', value: 'student' },
        { label: 'Admin', value: 'admin' },
      ],
      classes: 'mb-4',
      rules: {
        required: 'Email is required',
      },
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Enter a password',
      rules:  params.id == 'add'? {
        required: 'Password is required',
        minLength: {
          value: 8,
          message: "Password must have at least 8 characters"
        },
        pattern: {
          value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message: 'Password must contain at least 8 characters, one uppercase letter, one digit, and one special character'
        }
      }: {},
      disabled: params.id != 'add' ? true : false,
      classes: 'mb-4',
    },
  ]);
  const notify = (message) => toast(message);
  const handelSubmit = (data) => {
    const backend = new API();
    if (params.id == 'add') {
      backend.fetch('user/add', { method: "POST", body: JSON.stringify(data) }).then((res) => {
        if (res.status == 'success') {
          notify(res.message)
          navigate('/')
        }
      })
    } else {
      const datatoUpdate = {
        username:data.username,
        id:data.id,
        type:data.type
      }
      backend.fetch('user/update', { method: "POST", body: JSON.stringify(datatoUpdate) }).then((res) => {
        if (res.status == 'success') {
          notify(res.message)
          navigate('/')
        }
      })
    }
    console.log(data);
  }
  return (
    <div className="">{
      !fload &&
      <Form
        onSubmit={handelSubmit}
        defaultValues={userData}
        fields={fields}
        onChangeSelect={handleChangeSelect}
      />
    }
    </div>
  )
}
