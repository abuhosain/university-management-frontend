import { useState } from "react";
import { useAddFacultiesMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api"
import { Button, Modal, Table } from "antd";
import PH_form from "../../../components/form/PH_form";
import PH_Select from "../../../components/form/PH_Select";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
 

 

export const Courses = () => {
  const {data : courses, isFetching} = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({_id, title, prefix, code}) => ({
    key : _id,
    title,
    code : `${prefix}${code}`
  }));

  const columns = [
    {
      title: 'Title',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'Code',
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  return (
    <Table
    loading={isFetching}
    columns={columns}
    dataSource={tableData}
    // onChange={onChange}
  />
  )
}



 
const AddFacultyModal = ({ facultyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  // console.log(facultiesData)
  const [addFaculties] = useAddFacultiesMutation();

  const facultiesOption = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const handleSubmit = (data) => {
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };

    // console.log(facultyData);

    addFaculties(facultyData);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PH_form onSubmit={handleSubmit}>
          <PH_Select
            mode="multiple"
            options={facultiesOption}
            name="faculties"
            label="Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </PH_form>
      </Modal>
    </>
  );
};
