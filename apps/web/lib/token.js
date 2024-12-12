import jwt from "jsonwebtoken";

export async function createToken(payload) {
  return jwt.sign(
    {
      aud: "authenticated",
      role: "authenticated",
      ...payload,
    },
    process.env.SUPABASE_JWT_SECRET,
    {
      expiresIn: "3650d",
      algorithm: "HS256",
    },
  );
}

export async function verifyToken(token) {
  const verifiedToken = await jwt.verify(
    token,
    process.env.SUPABASE_JWT_SECRET,
  );
  return verifiedToken;
}

export async function verifyTokenFromAuthorization(authorization) {
  const token = authorization.replace("Bearer ", "");
  return verifyToken(token);
}
