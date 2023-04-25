import * as JWT from "jsonwebtoken"
require("dotenv").config()
// Define the interface for authentication strategies
class AuthStrategy {
    async generateToken(payload: any, signRefresh: boolean) { }
    async generateRefreshToken(payload: any, signRefresh: boolean) { }
    async verifyToken(token: string, signRefresh: boolean) { }
    async verifyRefreshToken(token: string, signRefresh: boolean) { }
    async createTokenPair(payload: any): Promise<any> { }
}

// Define the JWT authentication strategy
class JWTAuthStrategy extends AuthStrategy {
    private secretKey: string = process.env.SECRET_KEY || ""
    private refreshKey: string = process.env.REFRESH_KEY || ""

    constructor() {
        super();
    }

    async generateToken(payload: any): Promise<any> {
        const token = await JWT.sign(payload, this.secretKey, {
            expiresIn: '2 days',
        })
        return token
    }

    async generateRefreshToken(payload: any): Promise<any> {
        const token = await JWT.sign(payload, this.refreshKey, {
            expiresIn: '7 days',
        })
        return token
    }


    async verifyToken(token: string): Promise<any> {
        const payload = await JWT.verify(token, this.secretKey)
        return payload
    }

    async verifyRefreshToken(token: string): Promise<any> {
        const payload = await JWT.verify(token, this.refreshKey)
        return payload
    }

    /**
     * 
     * @returns {accessToken, refreshToken}
     */
    async createTokenPair(payload: any): Promise<any> {
        const accessToken = await this.generateToken(payload)
        const refreshToken = await this.generateRefreshToken(payload)

        return { accessToken, refreshToken }
    }
}

// Define a factory function for creating authentication strategy objects
export function createAuthStrategy(strategyName: string, options: any) {
    switch (strategyName) {
        case 'jwt':
            return new JWTAuthStrategy();
        // Add more strategies here as needed
        default:
            throw new Error(`Unknown authentication strategy: ${strategyName}`);
    }
}





