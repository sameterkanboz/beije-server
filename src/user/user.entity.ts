import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  id: number;

  @Column()
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  name: string;

  @Column()
  @ApiProperty({
    example: 'ABC123DE',
    description:
      "Alphanumeric value as a token for verification of the user's email address",
  })
  verificationToken: string;

  @Column()
  @ApiProperty({
    example: 'example@example.com',
    description: 'The email of the user',
  })
  email: string;

  @Column({ default: false })
  @ApiProperty({
    example: false,
    description: 'The verification status of the user',
  })
  isVerified: boolean;
}
