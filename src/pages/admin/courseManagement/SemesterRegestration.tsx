import { FieldValues, SubmitHandler } from "react-hook-form";
import PH_form from "../../../components/form/PH_form";
import { Button, Col, Flex } from "antd";
import PH_Select from "../../../components/form/PH_Select";
import {  semesterStatusOptions } from "../../../constants/semester";
import { toast } from "sonner";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PH_Input from "../../../components/form/PH_Input";
import { useAddRegesterSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";
 
const SemesterRegestration = () => {
  const [addSemester] = useAddRegesterSemesterMutation();
 const {data : academicSemesters} = useGetAllSemestersQuery([{
  name : "sort", value : "year"
 }]);
 
 const academicSemesterOptions = academicSemesters?.data?.map((item) =>( {
  value : item._id,
  label : `${item.name} ${item.year}`
 }))
 
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data)
    const toastId = toast.loading("Creating..")
 
    const semesterData = {
      ...data,
      minCredit : Number(data.minCredit),
      maxCredit : Number(data.minCredit),
    };

    console.log(semesterData)

    try {
      console.log(semesterData);
      const res = await addSemester(semesterData) as TResponse<any>;
      if(res.error){
        toast.error(res.error.data.message, {id : toastId} )
      }else{
        toast.success("Semester Created", {id : toastId})
      }
    } catch (err) {
      toast.error("Something went wrong", {id : toastId});
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PH_form onSubmit={onSubmit}>
          <PH_Select
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />

          <PH_Select
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PH_Input type="text" name="minCredit" label="Min Credit" />
          <PH_Input type="text" name="maxCredit" label="Max Credit" />

          <Button htmlType="submit">Submit</Button>
        </PH_form>
      </Col>
    </Flex>
  );
};

export default SemesterRegestration;
