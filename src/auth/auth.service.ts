import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    // hashing the password
    const password = await argon.hash(dto.password);

    // save the user
    try {
      const user = await this.prisma.user.create({
        data: {
          phone: dto.phone,
          password,
          name: dto.name,
        },
      });

      const token = await this.signToken(user.id, user.phone);

      return {
        status: true,
        message: 'User created successfully',
        data: {
          name: user.name,
          phone: user.phone,
          token: token.access_token,
        },
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials are already taken');
        }
      }

      throw error;
    }
  }

  async login(dto: LoginDto) {
    // find the user
    const user = await this.prisma.user.findUnique({
      where: {
        phone: dto.phone,
      },
    });

    // throw an error if the user is not exists
    if (!user) throw new NotFoundException('Credentials invalid');

    // compare the password
    const isMatched = await argon.verify(user.password, dto.password);

    // throw an error if the credentials is incorrect
    if (!isMatched) throw new ForbiddenException('Credentials invalid');

    // return acess token if credential is correct
    const token = await this.signToken(user.id, user.phone);

    return {
      status: true,
      message: 'User logged in successfully',
      data: {
        name: user.name,
        phone: user.phone,
        token: token.access_token,
      },
    };
  }

  async signToken(
    userId: number,
    phone: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      phone,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
