import mongoose from 'mongoose';

const connectMongo = () => {
  mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
      console.log('Successfully connected to Mongo');
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export default connectMongo;
