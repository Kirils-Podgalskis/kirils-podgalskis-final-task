import { APIRequestContext } from "@playwright/test";
import { BASE_URL } from "./constants.ts";
export interface ProductsResponse {
    //TODO: fill
}

export interface ShopUser {
    //TODO: fill
}

export class ShopApiClient {
    private token: string | null = null;
    
    constructor(private readonly request: APIRequestContext) {
    }

    private getToken(): string {
        if (!this.token) throw new Error('Not authenticated - call register() first')
        return this.token;
    }

    setToken(token: string): void {
        this.token = token;
    }

    private authHeader(): Record <string, string> {
        return { Authorization: `Token ${this.getToken()}` }
    }

    async getProducts(): Promise<ProductsResponse> {
        return "something" as ProductsResponse
    }

    async searchProducts(keyword: string) : Promise<ProductsResponse> {
        return "something" as ProductsResponse
    }

    async createAccount(user: ShopUser): Promise<void> {
        
    }

    async deleteAccount(email: string, password: string): Promise<void> {

    }

    async verifyLogin(email: string, password: string): Promise<boolean> {
        return true
    }

}