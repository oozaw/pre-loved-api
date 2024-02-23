import { Injectable, NotFoundException } from '@nestjs/common';
import { EditDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) throw new NotFoundException('User not found');

      delete user.password;

      return {
        status: true,
        message: 'User fetched successfully',
        data: {
          ...user,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async editUser(userId: number, dto: EditDto) {
    try {
      // check the user
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) throw new NotFoundException('User not found');

      // update the user
      const result = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...dto,
        },
      });

      // return the updated user
      delete result.password;

      return {
        status: true,
        message: 'User updated successfully',
        data: {
          ...result,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
