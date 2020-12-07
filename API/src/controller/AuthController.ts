import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Users } from '../entity/Users';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { transporter } from './../config/mailer';
import { validate } from 'class-validator';


class AuthController {
  static login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.status(400).json({ message: ' Username & Password are required!' });
    }

    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (e) {
      return res.status(400).json({ message: ' Username or password incorecct!' });
    }

    // Check password
    if (!user.checkPassword(password)) {
        return res.status(400).json({ message: 'Username or Password are incorrect!' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '120' });
    const refreshToken = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecretRefresh, { expiresIn: '86400' });

    user.refreshToken = refreshToken;

    try {
      await userRepository.save(user)
    } catch (error) {
      return res.status(400).json({ message: 'Somenthing goes wrong !'});
    }

    res.json({ message: 'OK', token, refreshToken, role: user.role, username: user.username });
  };

  static changePassword = async (req: Request, res: Response) => {
    const { userId } = res.locals.jwtPayload;
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
      res.status(400).json({ message: 'Old password & new password are required' });
    }

    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail(userId);
    } catch (e) {
      res.status(400).json({ message: 'Somenthing goes wrong!' });
    }

    if (!user.checkPassword(oldPassword)) {
     return res.status(401).json({ message: 'Check your old Password' });
    }

    user.password = newPassword;
    const validationOps = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOps);

    if (errors.length > 0) {
      return res.status(400).json({ message: errors});
    }

    // Hash password
    user.hashPassword();
    userRepository.save(user);

    res.json({ message: 'Password change!' });
  };

  static forgotPassword = async (req: Request, res: Response) =>{
    const { username } = req.body;
    if (!(username)){
      return res.status(400).json({ message: "Username is requiered !"});
    }

    const message = "Check your email for link to reset your password.";
    let verificationLink;
    let emailStatus = "OK";

    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail({ where: {username}});
      const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecretReset, { expiresIn: '10m'});
      verificationLink = `http://localhost:4200/new-password/${token}`;
      user.resetToken = token;
    } catch (error) {
      return res.json({ message: error});
    }

    // TODO :  send email
    try {
      // send mail with defined transport object
      await transporter.sendMail({
        from: '"Forgot Password 👻" <fernando.mastropietro@gmail.com>', // sender address
        to: user.username, // list of receivers
        subject: "Forgot Password ✔", // Subject line
        //text: "Hello world?", // plain text body
        html:`
          <b>Please click on the follwoing link, or paste this into your browser to complete the process:</b>
          <br><br>
          <a href='${verificationLink}'>${verificationLink}</a>
        `, // html body
      });
      
    } catch (error) {
      emailStatus = error;
      return res.status(400).json({ message: error });
    }

    try {
      await userRepository.save(user);

    } catch (error) {
      emailStatus = error;
      return res.status(400).json({ message: error });
      
    }

    res.json({message, info: emailStatus, test: verificationLink})
  }

  static createNewPassowrd = async (req: Request, res: Response) =>{

    const { newPassword } = req.body;
    const resetToken = req.headers.reset as string;

    if (!(resetToken && newPassword)) {
      res.status(400).json({ message: 'All the fields are required'});
    }

    const userRespository = getRepository(Users);
    let jwtPayload;
    let user: Users;

    try {
      jwtPayload = jwt.verify(resetToken, config.jwtSecretReset);
      user = await userRespository.findOneOrFail({ where: { resetToken }})
    } catch (error) {
      return res.status(401).json({ message: error });
    }

    user.password = newPassword;

    const validtionsOps = { validationError: {target: false, value: false}};
    const errors = await validate(user, validtionsOps);

    if (errors.length > 0){
      return res.status(400).json({ message: errors});
    }

    try {
      user.hashPassword();
      await userRespository.save(user);
    } catch (error) {
      return res.status(401).json({ message: error });
    }

    res.json({message: 'Password changed !'});

  }

  static refreshToken = async (req: Request, res: Response) => {

    const refreshToken = req.headers.refresh as string;

    if (!(refreshToken)){
      return res.status(400).json({ message: 'Somenthing goes wrong !'});
    }

    const userRepository = getRepository(Users);
    let user: Users;

    try {
      const verifyResult = jwt.verify(refreshToken, config.jwtSecretRefresh);
      const { username } = verifyResult as Users;
      user = await userRepository.findOneOrFail( { where : { username }});
    } catch (error) {
      return res.status(400).json({ message: error});
    }

    const token = jwt.sign({userId: user.id, username: user.username }, config.jwtSecret, { expiresIn : '86400' });
    res.json({ message : 'OK', token})
  }



}
export default AuthController;
