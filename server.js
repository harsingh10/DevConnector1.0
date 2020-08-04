import express from "express"

const app = express()

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
  res.send("API is Running")
})

app.listen(PORT, () => console.log(`server is up and running on PORT ${PORT}`))
