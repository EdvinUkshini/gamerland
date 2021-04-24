const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const userMiddleware = require('../middleware/users.js');


router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
    db.query(
      `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
        req.body.email
      )});`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({
            msg: 'Email address is already registered'
          });
        } else {
          // email is available
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                msg: err
              });
            } else {
              // has hashed pw => add to database
              db.query(
                `INSERT INTO users (id, firstname, lastname, email, password, role, registered) 
                                                                                VALUES ('${uuid.v4()}', 
                                                                                ${db.escape(req.body.firstname)}, 
                                                                                ${db.escape(req.body.lastname)},
                                                                                ${db.escape(req.body.email)},
                                                                                ${db.escape(hash)},
                                                                                'User',
                                                                                now())`,
                (err, result) => {
                  if (err) {
                    throw err;
                    return res.status(400).send({
                      msg: err
                    });
                  }
                  return res.status(201).send({
                    msg: 'Registered!'
                  });
                }
              );
            }
          });
        }
      }
    );
  });

  router.post('/login', (req, res, next) => {
    db.query(
      `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
      (err, result) => {
        // user does not exists
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err
          });
        }
        if (!result.length) {
          return res.status(401).send({
            msg: 'Email or password is incorrect!'
          });
        }
        // check password
        bcrypt.compare(
          req.body.password,
          result[0]['password'],
          (bErr, bResult) => {
            // wrong password
            if (bErr) {
              throw bErr;
              return res.status(401).send({
                msg: 'Email or password is incorrect!'
              });
            }
            if (bResult) {
              const token = jwt.sign({
                  email: result[0].email,
                  userId: result[0].id
                },
                'GAMERLAND', {
                  expiresIn: '7d'
                }
              );
              db.query(
                `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
              );
              return res.status(200).send({
                msg: 'Logged in!',
                token,
                user: result[0]
              });
            }
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
        );
      }
    );
  });


  router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send('This is the secret content. Only logged in users can see that!');
  });

module.exports = router;