import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { generateVerificationToken } from 'src/utils/utils';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  async createUser(name: string, email: string): Promise<User> {
    const verificationToken = generateVerificationToken();
    const user = this.userRepository.create({ name, email, verificationToken });
    await this.userRepository.save(user);
    await this.mailService.sendVerificationEmail(email, verificationToken);
    return user;
  }

  async verifyEmail(
    username: string,
    verificationToken: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { name: username },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.verificationToken !== verificationToken) {
      throw new BadRequestException('Invalid verification token');
    }

    user.isVerified = true;
    await this.userRepository.save(user);

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { name: username },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
}
