import { Button, Col, Flex } from "antd"
import PH_form from "../../../components/form/PH_form"
import PH_Select from "../../../components/form/PH_Select"

 

export const OfferCourse = () => {
  const onSubmit = (data) => {
    console.log(data)
  }
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
           

          <Button htmlType="submit">Submit</Button>
        </PH_form>
      </Col>
    </Flex>
  )
}
