import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { RegisterDto } from '../dto/auth.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: unknown;
            name: string;
            email: string;
            roles: string[];
        };
    }>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            email: any;
            roles: any;
        };
    }>;
}
