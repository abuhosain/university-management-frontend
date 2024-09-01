import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
type TInputForm = {
  type: string;
  name: string;
  label?: string;
};

const PH_Input = ({ type, name, label }: TInputForm) => {
  return (
    <div style={{ marginBlock: "20px" }}>
     
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}> 
            <Input {...field} type={type} id={name} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PH_Input;
