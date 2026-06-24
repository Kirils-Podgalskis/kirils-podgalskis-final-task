import { APIRequestContext } from "@playwright/test";
import { BASE_URL } from "./constants.ts";

export interface UserType {
	usertype: string;
}
export interface Category {
	usertype: UserType;
	category: string;
}
export interface Product {
	id: number;
	name: string;
	price: string;
	brand: string;
	category: Category;
}
export interface ProductsResponse {
	responseCode: number;
	products: Product[];
	message: string | null;
}

export interface ShopUser {
	//TODO: fill
}

export class ShopApiClient {
	private token: string | null = null;

	constructor(private readonly request: APIRequestContext) {}

	private getToken(): string {
		if (!this.token)
			throw new Error("Not authenticated - call register() first");
		return this.token;
	}

	setToken(token: string): void {
		this.token = token;
	}

	private authHeader(): Record<string, string> {
		return { Authorization: `Token ${this.getToken()}` };
	}

	async getProducts(): Promise<ProductsResponse> {
		const res = await this.request.get(`${BASE_URL}/productsList`);
		return res.json() as Promise<ProductsResponse>;
	}

	async searchProducts(body: object): Promise<ProductsResponse> {
		const res = await this.request.post(`${BASE_URL}/searchProduct`, body);
		return res.json() as Promise<ProductsResponse>;
	}

	async createAccount(user: ShopUser): Promise<void> {}

	async deleteAccount(email: string, password: string): Promise<void> {}

	async verifyLogin(email: string, password: string): Promise<boolean> {
		return true;
	}
}
