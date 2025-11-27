import jwt, { JwtPayload } from "jsonwebtoken";

export function createToken(payload: object): string {
  return jwt.sign(payload, process.env.JWT_SECRET!);
}

export function verifyToken(token: string): JwtPayload {
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET!);
  return verifiedToken as JwtPayload;
}

export async function verifyTokenFromAuthorization(
  authorization: string | null,
): Promise<JwtPayload> {
  if (!authorization) {
    throw new Error("No authorization header");
  }

  const token = authorization.split(" ")[1];
  const decoded = jwt.decode(token);

  if (!decoded || typeof decoded === "string") {
    throw new Error("Invalid token");
  }

  return decoded as JwtPayload;
}
