import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("../schemas/user.schema").UserDocument>;
    findAll(): Promise<import("../schemas/user.schema").UserDocument[]>;
    findOne(id: string): Promise<import("../schemas/user.schema").UserDocument>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../schemas/user.schema").UserDocument>;
    remove(id: string): Promise<import("../schemas/user.schema").UserDocument>;
}
