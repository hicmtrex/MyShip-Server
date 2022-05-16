import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const db = await mongoose.connect('mongodb://localhost:27017/myship-pfe', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${db.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDb;
