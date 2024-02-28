import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import API from "../../apis";
import Form from "../Form";
import { toast } from "react-toastify";
import { getSingleStudent } from "../Store/studentsSlice";

export default function Student() {
  const navigate = useNavigate()
  const [fload, setfload] = useState(false)
  const dispatch = useDispatch();
  const params = useParams()
  useEffect(() => {
    if (params.id) {
      if (params.id != 'add') {
        setfload(true)
        const backend = new API();
        backend.fetch(`student/get/${params.id}`, {
          method: "GET"
        }).then((res) => {
          if (res.status == 'success') {
            dispatch(getSingleStudent(res.content))
            setfload(false)
          }
          console.log(res);
        })
      } else {
        setfload(false)
      }
    }
  }, [params])
  const userData = useSelector((state) => {
    console.log(state.users);
    return state.student.singleStudent;
  })
  console.log(userData);
  const handleChangeSelect = (name, value) => {
    console.log(name, value);
    // setSelectedValues(prevState => ({
    //   ...prevState,
    //   [name]: value
    // }));
  };
  const [fields] = useState([
    {
      name: 'student_name',
      label: 'Student name',
      type: 'text',
      placeholder: 'Enter student name',
      classes: 'mb-4',
      rules: {
        required: 'Student name is required',
      },
    },
    {
      name: 'student_phone',
      label: 'Student phone number',
      type: 'number',
      placeholder: 'Enter phone number',
      classes: 'mb-4',
      rules: {
        required: 'Student phone number is required',
      },
    },
    {
      name: 'student_dob',
      label: 'Student Date of Birth',
      type: 'date',
      placeholder: 'select date of birth',
      classes: 'mb-4',
      rules: {
        required: 'Student date of birth is required',
      },
    },
    {
      name: 'student_gender',
      label: 'Gender',
      type: 'select',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
      ],
      classes: 'mb-4',
      rules: {
        required: 'Select the gender',
      },
    },
    {
      name: 'student_email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email address',
      classes: 'mb-4',
      pattern: "[a-z]+",
      rules: {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address',
        },
      },
    },
    // {
    //   label: 'Password',
    //   name: 'password',
    //   type: 'password',
    //   placeholder: 'Enter a password',
    //   rules:  params.id == 'add'? {
    //     required: 'Password is required',
    //     minLength: {
    //       value: 8,
    //       message: "Password must have at least 8 characters"
    //     },
    //     pattern: {
    //       value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //       message: 'Password must contain at least 8 characters, one uppercase letter, one digit, and one special character'
    //     }
    //   }: {},
    //   disabled: params.id != 'add' ? true : false,
    //   classes: 'mb-4',
    // },
  ]);
  const notify = (message) => toast(message);
  const handelSubmit = (data) => {
    const backend = new API();
    if (params.id == 'add') {
      backend.fetch('student/add', { method: "POST", body: JSON.stringify(data) }).then((res) => {
        if (res.status == 'success') {
          notify(res.message)
          navigate('/students')
        }
      })
    } else {
      const datatoUpdate = {
        student_name:data.student_name,
        student_dob:data.student_dob,
        id:data.id,
        student_gender:data.student_gender,
        student_email:data.student_email,
        student_phone:data.student_phone,
      }
      backend.fetch('student/update', { method: "POST", body: JSON.stringify(datatoUpdate) }).then((res) => {
        if (res.status == 'success') {
          notify(res.message)
          navigate('/students')
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
