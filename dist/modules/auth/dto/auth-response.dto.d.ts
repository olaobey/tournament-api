export declare class AuthResponseDto {
    access_token: string;
    user: {
        id: string;
        name: string;
        email: string;
        roles: string[];
    };
}
