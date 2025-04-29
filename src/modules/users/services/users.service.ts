import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userRepository.findAll();
  }

  async findEligibleUsers(): Promise<UserDocument[]> {
    return this.userRepository.findByRole('user');
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userRepository.findByEmail(email);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    await this.findById(id);
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<UserDocument> {
    await this.findById(id);
    return this.userRepository.remove(id);
  }
}
