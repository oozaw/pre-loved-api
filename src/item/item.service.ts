import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateItemDto, UpdateItemDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateItemDto) {
    try {
      const item = await this.prisma.item.create({
        data: {
          userId,
          ...dto,
        },
      });

      return {
        status: true,
        message: 'Item created successfully',
        data: {
          ...item,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const items = await this.prisma.item.findMany();

      return {
        status: true,
        message: 'Items fetched successfully',
        data: [...items],
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const item = await this.prisma.item.findUnique({
        where: {
          id,
        },
      });

      return {
        status: true,
        message: 'Item fetched successfully',
        data: {
          ...item,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async update(userId: number, id: number, dto: UpdateItemDto) {
    try {
      const item = await this.prisma.item.findUnique({
        where: {
          id,
        },
      });

      // check if the user is the owner or not
      if (item.userId != userId) {
        throw new ForbiddenException({
          status: false,
          message: 'Update item failed',
        });
      }

      const updatedItem = await this.prisma.item.update({
        where: {
          id,
        },
        data: {
          ...dto,
        },
      });

      return {
        status: true,
        message: 'Item updated successfully',
        data: {
          ...updatedItem,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.item.delete({
        where: {
          id,
        },
      });

      return {
        status: true,
        message: 'Item deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
