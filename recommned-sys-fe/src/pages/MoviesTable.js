import axios from "axios"
import React, { useEffect, useState } from "react"
import { Card, Table, Typography, Tag } from "antd"

export default function MoviesTable() {
  const [dataFilm, setDataFilm] = useState([])
  const columnFilm = [
    {
      title: "Movie Id",
      dataIndex: "movieId"
    },
    {
      title: "Title",
      dataIndex: "title"
    },
    {
      title: "Type",
      dataIndex: "genres",
      render: (val) => {
        return val.split("|").map((genres) => <Tag>{genres}</Tag>)
      }
    }
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
      .get("http://127.0.0.1:8000/movies_lens/")
      .then((res) => {
        const dataFilmRes = res.data.data
          .map((val) => parseVal(val))
          .filter((val) => Object.keys(val).length > 0)
        setDataFilm(dataFilmRes)
        console.log(dataFilmRes[0])
      })
      .catch()
  }, [])
  return (
    <div className="overflow-y-auto">
      <Typography.Title level={3}>Movies</Typography.Title>
      <Table dataSource={dataFilm} columns={columnFilm} />
    </div>
  )
}
