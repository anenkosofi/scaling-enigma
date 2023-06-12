import mongoose from 'mongoose';

import app from './app';

const { DB_HOST, PORT = 8080 } = process.env;

mongoose.set('strictQuery', false);

mongoose.connect(DB_HOST);

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
start();
