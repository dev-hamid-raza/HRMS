import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

// import routes
import userRouter from './routes/user.routes.js'
import departmentRouter from './routes/department.routes.js'
import designationRouter from './routes/designation.routes.js'
import employeeRouter from './routes/employee.routes.js'
import attendanceRouter from './routes/attendance.routes.js'


export const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())


app.use("/api/v1/users", userRouter)
app.use("/api/v1/departments",departmentRouter)
app.use("/api/v1/designations",designationRouter)
app.use("/api/v1/employees", employeeRouter)
app.use("/api/v1/attendance", attendanceRouter)