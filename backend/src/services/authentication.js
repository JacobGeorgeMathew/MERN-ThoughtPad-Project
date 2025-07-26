import JWT from "jsonwebtoken";

const secret = "jgm@8227";

export function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
    fullName: user.fullName,
  };

  const token = JWT.sign(payload,secret);

  return token;
};

export function validateToken(token) {
  const payload = JWT.verify(token,secret);
  return payload;
};