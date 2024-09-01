import { FieldValues, SubmitHandler } from "react-hook-form";
import PH_form from "../../../components/form/PH_form";
import { Button, Col, Flex } from "antd";
import PH_Select from "../../../components/form/PH_Select";
import { monthOptions } from "../../../constants/global";
import { semesterOptions } from "../../../constants/semester";
import { zodResolver } from "@hookform/resolvers/zod";

import { academicSemesteSchema } from "../../../schema/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));
console.log(yearOptions);
const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data)
    const toastId = toast.loading("Creating..")
    const name = semesterOptions[Number(data?.name) - 1].label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };

    try {
      console.log(semesterData);
      const res = await addAcademicSemester(semesterData) as TResponse;
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
        <PH_form
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesteSchema)}
        >
          <PH_Select label="Name" options={semesterOptions} name="name" />
          <PH_Select label="Year" options={yearOptions} name="year" />
          <PH_Select
            label="Start Month"
            options={monthOptions}
            name="startMonth"
          />
          <PH_Select label="End Month" options={monthOptions} name="endMonth" />

          <Button htmlType="submit">Submit</Button>
        </PH_form>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
