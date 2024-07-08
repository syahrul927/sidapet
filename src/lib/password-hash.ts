import bcrypt from "bcryptjs";
export default function passwordHash(password: string) {
  return bcrypt.hashSync(password, 10);
}
