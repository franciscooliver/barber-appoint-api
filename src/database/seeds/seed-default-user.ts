import { AppDataSource } from '@database/data-source'; // Certifique-se de que o data-source esteja configurado
import * as bcrypt from "bcrypt";
import { User } from "@modules/users/entities/user.entity";

export async function seedDefaultUser(): Promise<void> {
  const userRepository = AppDataSource.getRepository(User);
  const existingUser = await userRepository.findOne({ where: { email: "franciscoalves@gmail.com" } });
  if (!existingUser) {
    const user = userRepository.create({
      name: "Francisco Alves",
      email: "franciscoalves@gmail.com",
      password: 'fran123',
      role: "barbershop",
      isActive: true,
    });
    await userRepository.save(user);
    console.log("Default user seeded.");
  }
}
