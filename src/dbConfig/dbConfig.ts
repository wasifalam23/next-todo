import mongoose from 'mongoose';

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL!)
    .then(() => {
      console.log('DB connection successful');
    })
    .catch((err) => {
      console.log('💥Error:', err);
    });
};

export default connect;
