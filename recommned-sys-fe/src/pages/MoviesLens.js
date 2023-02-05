import axios from "axios"
import React, { useEffect, useState } from "react"
import { Card, Table, Typography, Tag } from "antd"
import MoviesTable from "./MoviesTable"
import RatingTable from "./RatingTable"
import RecommendFilm from "./RecommendFilm"
export default function MoviesLens() {
  return (
    <div>
      <MoviesTable />
      <RatingTable />
      <RecommendFilm />
    </div>
  )
}
