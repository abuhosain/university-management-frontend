import { FieldValues, SubmitHandler } from "react-hook-form";
import PH_form from "../../../components/form/PH_form";
import { Button, Col, Flex } from "antd";
import PH_Select from "../../../components/form/PH_Select";
 
import { toast } from "sonner";
 
import PH_Input from "../../../components/form/PH_Input";
import { useAddCoursesMutation,  useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";

const CreateCourse = () => {
 const [addCourse] = useAddCoursesMutation();
  const {data : courses} = useGetAllCoursesQuery(undefined);
 

  const preRequisiteCoursesOptions = courses?.data?.map((item: { _id: any; title: any; }) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data)
    const toastId = toast.loading("Creating..");

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses?.map((item: any) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    console.log(courseData);

    try {
      
      const res = (await addCourse(courseData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Course Created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PH_form onSubmit={onSubmit}>
          <PH_Input type="text" name="title" label="Title" />
          <PH_Input type="text" name="prefix" label="Prefix" />
          <PH_Input type="text" name="code" label="Code" />
          <PH_Input type="text" name="credits" label="Credits " />
          <PH_Select
          mode="multiple"
            options={preRequisiteCoursesOptions}
            label="preRequisiteCourses"
            name="preRequisiteCourses"
          />
          <Button htmlType="submit">Submit</Button>
        </PH_form>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
