import { Button, Row } from "antd"
import PH_form from "../components/form/PH_form"
import PH_Input from "../components/form/PH_Input"
import {  FieldValues, SubmitHandler } from "react-hook-form"
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api"
import { TResponse } from "../types"
import { useAppDispatch } from "../redux/hooks"
import { logout } from "../redux/features/auth/authSlice"
import {  useNavigate } from "react-router-dom"
 

const ChangePassword = () => {
    const [changePassword] = useChangePasswordMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSubmit  : SubmitHandler<FieldValues>=  async(data) => {
       const res = (await changePassword(data)) as TResponse<any>;
        if(res?.data?.success){
            dispatch(logout());
            return navigate("/login")
        } 
    }
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PH_form onSubmit={onSubmit} >
        <PH_Input type="text" name="oldPassword" label="Old Password"/>
        <PH_Input type="text" name="newPassword" label={"New Password:"} />
        <Button htmlType="submit">Login</Button>
      </PH_form>
    </Row>
  )
}

export default ChangePassword