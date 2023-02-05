import { Form, Button, Input, Typography } from "antd"
import axios from "axios"
import React, { useState } from "react"
import ReactJson from "react-json-view"
export default function RecommendFilm() {
  const [resRec, setResRec] = useState([])
  const [userId, setUserId] = useState("")
  const onFinish = (val) => {
    if (Number(val.userId) <= 671 && Number(val.userId) > 0) {
      {
        axios
          .get(`http://127.0.0.1:8000/recommend?userId=${val.userId}`)
          .then((res) => {
            console.log(res.data.userId)
            setResRec(res.data.userId)
          })
          .catch()
      }
    }
  }
  return (
    <div>
      <Typography.Title level={4}>API integrate</Typography.Title>
      <Typography.Paragraph copyable={{text: `http://127.0.0.1:8000/recommend?userId=${userId}`}}>
        http://127.0.0.1:8000/recommend?userId={userId}
      </Typography.Paragraph>
      <Form onFinish={onFinish}>
        <Form.Item
          label="UserId"
          name="userId"
          rules={[
            {
              required: true,
              message: "Please input userID"
            }
          ]}
        >
          <Input
            onChange={(e) => {
              setUserId(e.target.value)
            }}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>

      <div className="mt-[40px]"></div>
      <Typography.Title level={4}>Result</Typography.Title>
      <ReactJson src={resRec} />
    </div>
  )
}
