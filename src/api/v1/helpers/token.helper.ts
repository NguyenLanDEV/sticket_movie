import * as JWT from "jsonwebtoken"
import { handleError } from "../utils/jwt.util";
require("dotenv").config()
// Define the interface for authentication strategies
class AuthStrategy {
    async generateToken(payload: any, options: any) { }
    async verifyToken(token: string, options: any) { }
}

// Define the JWT authentication strategy
class JWTAuthStrategy extends AuthStrategy {
    private secretKey: string = process.env.SECRET_KEY || ""
    private refreshKey: string = process.env.REFRESH_KEY || ""
    constructor() {
        super();
    }

    async generateToken(payload: any, options: any): Promise<any> {
        const signRefresh = options.signRefresh ? true : false;
        const secretKey = signRefresh == true ? this.refreshKey : this.secretKey

        const token = await JWT.sign(payload, secretKey, options)
        return token
    }


    async verifyToken(token: string, options: any): Promise<any> {
        const signRefresh = options.signRefresh ? true : false
        const secretKey = signRefresh == true ? this.refreshKey : this.secretKey
        const payload = await JWT.verify(token, secretKey, options)

        return payload
    }

    /**
     * 
     * @returns {accessToken, refreshToken}
     */
    async createTokenPair(payload: any): Promise<any> {
        // accessToken
        // const accessToken = await JWT.sign(payload, this.secretKey, {
        //     expiresIn: '2 days'
        // })

        // const refreshToken = await JWT.sign(payload, this.refreshKey, {
        //     expiresIn: '7 days'
        // })
        const accessToken = await this.generateToken(payload, {
            expiresIn: '2 days',
        })

        const refreshToken = await this.generateToken(payload, {
            expiresIn: '7 days', signRefresh: true
        })
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





