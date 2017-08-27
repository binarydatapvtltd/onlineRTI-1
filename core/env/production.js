"use strict";
const config = {
  db: {
    URL: 'mongodb://localhost/rtiguru',
    options: {
      server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
      replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } }
    },
    DEBUG: false,
    autoIndex: false
  },
  server: {
    host: 'http://rtiguru.com',
    PORT: process.env.PORT || 9000
  },
  mail:{
    poolConfig : {
      pool: true,
        host: 'smtp.gmail.com', // Gmail as mail client
        port: 587,
        secure: false, // use SSL
        auth: {
          user: process.env.USERNAME,
          pass: process.env.PASSWORD
        }
    },
    from: ` <${process.env.USERNAME}>`
  },
    mailTransporter: 'gmail',
    salt: '51ca5acbce3e6a5b2dd9772b36cff34c',
    secret: '876sdf&%&^435345(*^&^654sdsdc&^&kjsdfjbksdureyy3(&(*&(&7$%^#%#&^*(&)*)*',
    allowed_image_extensions : ['image/jpeg','image/jpg','image/png','image/gif','image/bmp'],
    file_extensions : {
      'image/jpeg' : 'jpg',
      'image/jpg' : 'jpg',
      'image/png' : 'png',
      'image/gif' : 'gif',
      'image/bmp' : 'bmp',
    },
    /*In case no property image found or upload */
    image_path: 'images/',
    image_name: 'noimage.jpg',
    fileLimits: {
        fileSize: 2000000, //the max file size (in bytes)
        files: 10 //the max number of file
    },
    docLimit: 10,
    defaultAdmin: {
      email: 'admin@gmail.com',
      password: '123456',
      role: 'admin',
      status: true
    }
};
module.exports = config;