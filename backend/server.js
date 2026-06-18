import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import session from "express-session"
import requestIp from "request-ip"
import passport from "passport"
import googleStrategy from "passport-google-oauth20"
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"
import orderRouter from "./routes/order.routes.js"
import { googleAuth } from "./middleware/googleAuth.js"

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Middlewares
app.use(express.json())
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}))
app.use(cookieParser())
app.use(session({
  secret:"my-secret",
  resave:true,
  saveUninitialized:false,
}));

app.use(requestIp.mw());
app.use(passport.initialize())
app.use(passport.session())

passport.use(new googleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:4000/user/google/callback"
},(accessToken,refreshToken,profile,done)=>{
    return done(null,profile)
}))

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})

app.get("/user/google",passport.authenticate("google",{
    scope:["email","profile"],
    prompt:"select_account"
}))

app.get("/user/google/callback",passport.authenticate("google",{
    failureRedirect:"http://localhost:5173/login"
}),googleAuth,(req,res,next)=>{
    res.redirect("http://localhost:5173/profile")
})

// Api Endpoints
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log("Server running on PORT : " + port)
})