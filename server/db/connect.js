import mongoose from 'mongoose'

const connectDB = (url, password) => {
    const mongoUrl = url.replace("<password>", password)
    return mongoose.connect(mongoUrl)
}

export default connectDB