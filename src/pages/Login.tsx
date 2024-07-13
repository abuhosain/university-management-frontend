import { Button, Row } from "antd";
import { FieldValues, } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PH_form from "../components/form/PH_form";
import PH_Input from "../components/form/PH_Input";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     id: "A-0001",
  //     password: "admin123",
  //   },
  // });

  // const {register} = useFormContext()

  const defaultValues = {
    userId: "A-0001",
    password: "admin123",
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("loggin in");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as unknown as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("logged in", { id: toastId, duration: 2000 });
      //  console.log(res)
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error("something went wrong", { id: toastId, duration: 2000 });
    }
    console.log(data);
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PH_form onSubmit={onSubmit} defaultValues={defaultValues}>
        <PH_Input type="text" name="userId" label={"ID:"} />
        <PH_Input type="text" name="password" label={"Password:"} />
        <Button htmlType="submit">Login</Button>
      </PH_form>
    </Row>
  );
};

export default Login;
