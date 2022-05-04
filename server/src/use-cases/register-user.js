const { UserDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const { createRandomSalt, createPasswordHash, genereteRandomSixDigitCode } = require("../utils/hash");
const { sendEmail } = require("../utils/sendEmail");
const { userToUserView } = require("./functions/userToUserView");

async function registerUser({ username, email, password }) {
  const foundUser = await UserDAO.findUserByEmailOrUsername(username, email);
  if(foundUser) {
    const errorMessage = foundUser.username === username 
      ? "Username " + username + " already taken!"
      : "Account with this e-mail already exists!";
    throw new Error(errorMessage);
  }

  const passwordSalt = createRandomSalt();
  const passwordHash = createPasswordHash(password, passwordSalt);

  const sixDigitVerifcationCode = genereteRandomSixDigitCode();

  const addedAt = new Date().toLocaleDateString();

  const user = makeUser({ username, email, passwordHash, passwordSalt, sixDigitVerifcationCode, addedAt });
  const insertResult = await UserDAO.insertUser(user);

  const wasSuccessFull = insertResult.acknowledged === true && insertResult.insertedId;
  if(!wasSuccessFull) {
    throw new Error("Registration failed, please try again.");
  }

  await sendEmailVerifcation(user);
  
  const registeredUser = await UserDAO.findUserById(insertResult.insertedId);
  const registeredUserView = userToUserView(registeredUser);
  return registeredUserView;
}


async function sendEmailVerifcation(user) {
  return await sendEmail({
    to: user.email,
    subject: "Welcome to Fließband",
    message: `
      Hello ${user.username}!

      Welcome to Fließband. It's wonderful!

      To start using your Fließband-Account please verify your email using this code:

      <h1>${user.sixDigitVerifcationCode}</h1>

      Have fun!

      Your Team @Fließband
    `
  });
}

module.exports = {
  registerUser
}