import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import { useGetAllRegesteredSemestersQuery, useUpdateRegesterSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { TSemester } from "../../../types";
import { useState } from "react";

export type TTbaleData = Pick<TSemester, "startDate" | "endDate" | "status">;

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const RegesteredSemester = () => {
  // const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const [semesterId, setSemesterId] = useState("");
  console.log(semesterId);
  const { data: semesterData, isFetching } =
    useGetAllRegesteredSemestersQuery(undefined);
  const [updateSemesterStatus] = useUpdateRegesterSemesterMutation()
  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );

  const handleStatusUpdate = (data : any) => {
    const updatedData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    updateSemesterStatus(updatedData)
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTbaleData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (item) => {
        let colour;
        if (item === "ONGOING") {
          colour = "green";
        }
        if (item === "UPCOMING") {
          colour = "blue";
        }
        if (item === "ENDED") {
          colour = "red";
        }
        return <Tag color={colour}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  // const onChange: TableProps<TTbaleData>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   console.log("params", filters, extra);
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParams[] = [];

  //     setParams(queryParams);
  //   }
  // };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default RegesteredSemester;
