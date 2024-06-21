import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', format: 'string' },
        email: { type: 'string', format: 'email' },
      },
      required: ['name', 'email'],
    },
  })
  @ApiResponse({ status: 201, description: 'The created user', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createUser(
    @Body() body: { name: string; email: string },
  ): Promise<User> {
    return this.userService.createUser(body.name, body.email);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'All users', type: [User] })
  @ApiResponse({ status: 404, description: 'No users found' })
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  @Get('email')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiQuery({
    name: 'email',
    type: 'string',
    description: 'User email',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'The found user', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserByEmail(@Query('email') email: string) {
    const user = this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get('verify-email/:username/:verificationToken')
  @ApiOperation({ summary: 'Verify user email' })
  @ApiResponse({ status: 200, description: 'Email verified successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Invalid verification token' })
  async verifyEmail(
    @Param('username') username: string,
    @Param('verificationToken') verificationToken: string,
  ): Promise<{ message: string }> {
    const user = await this.userService.verifyEmail(
      username,
      verificationToken,
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.isVerified) {
      throw new BadRequestException('Invalid verification token');
    }
    return { message: 'Email verified successfully' };
  }

  @Get('check-verification/:username')
  @ApiOperation({ summary: 'Check user verification status' })
  @ApiResponse({ status: 200, description: 'User verification status' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async checkVerification(
    @Param('username') username: string,
  ): Promise<{ message: string }> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.isVerified) {
      return { message: 'User is verified' };
    } else {
      return { message: 'User is not verified' };
    }
  }
}
