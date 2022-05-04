
function makeUser({
  _id,
  profilePicture = "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
  username,
  email,
  emailVerified = false,
  passwordHash,
  passwordSalt,
  sixDigitVerifcationCode,
  addedAt
}) {
  if(!username) {
    throw new Error("Username must exist.");
  }

  if(!email) {
    throw new Error("E-Mail must exist.");
  }

  return {
    _id,
    username,
    email,
    profilePicture,
    passwordHash,
    passwordSalt,
    emailVerified,
    sixDigitVerifcationCode,
    addedAt
  }
}

module.exports = {
  makeUser
}