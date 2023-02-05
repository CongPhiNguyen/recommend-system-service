import axios from "axios"
import React, { useEffect, useState } from "react"
import { Card, Table, Typography, Tag } from "antd"

export default function RatingTable() {
  const [dataRatings, setDataRatings] = useState([])
  const columnRatings = [
    {
      title: "Movie Id",
      dataIndex: "movieId"
    },
    {
      title: "UserId",
      dataIndex: "userId"
    },
    {
      title: "ratings",
      dataIndex: "rating"
    }
    // {
    //   title: "Type",
    //   dataIndex: "genres",
    //   render: (val) => {
    //     return val.split("|").map((genres) => <Tag>{genres}</Tag>)
    //   }
    // }
  ]

  const parseVal = (val) => {
    try {
      return JSON.parse(
        val
          .replaceAll(`'`, `"`)
          .replaceAll("ObjectId(", "")
          .replaceAll("),", ",")
      )
    } catch (err) {
      return {}
    }
  }

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/movies_lens/ratings")
      .then((res) => {
        const dataRatingsRes = res.data.data
          .map((val) => parseVal(val))
          .filter((val) => Object.keys(val).length > 0)
        setDataRatings(dataRatingsRes)
        console.log(dataRatingsRes[0])
      })
      .catch()
  }, [])
  return (
    <div className="overflow-y-auto">
      <Typography.Title level={3}>Movies</Typography.Title>
      <Table dataSource={dataRatings} columns={columnRatings} />
    </div>
  )
}
