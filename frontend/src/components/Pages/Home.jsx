import { useSelector } from "react-redux"

export default function Home() {
  const userData = useSelector((state)=>{
    return state.auth.userData;
  })
  return (
    <div className=" font-bold text-xl">
    Hello {userData?.fName} {userData?.lName}!<br/>
    YourEmail is : {userData?.email}<br/>
      
    {/* {JSON.stringify(userData)} */}
    </div>
  )
}
