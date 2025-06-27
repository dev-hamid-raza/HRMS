import express from "express"
import cors from "cors"

export const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use("/test", (req,res) => {
    res.send("Hello World")
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

