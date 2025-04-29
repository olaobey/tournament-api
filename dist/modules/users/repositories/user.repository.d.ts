import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
export declare class UserRepository {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserDto: CreateUserDto): Promise<UserDocument>;
    findAll(): Promise<UserDocument[]>;
    findByRole(role: string): Promise<UserDocument[]>;
    findById(id: string): Promise<UserDocument>;
    findByEmail(email: string): Promise<UserDocument>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument>;
    remove(id: string): Promise<UserDocument>;
}
