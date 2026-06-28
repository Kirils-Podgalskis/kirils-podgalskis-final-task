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
	name: string, 
	email: string,
	password: string, 
	title: string, 
	birth_date: number, 
	birth_month: string, 
	birth_year: number, 
	firstname: string, 
	lastname: string, 
	company: string, 
	address1: string 
	address2: string, 
	country: string, 
	zipcode: string, 
	state: string, 
	city: string, 
	mobile_number: string,
	card: object
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

	async createAccount(user: ShopUser): Promise<void> {
		await this.request.post(`${BASE_URL}/api/createAccount`, {
			multipart: {
				name:         user.name,
				email:        user.email,
				password:     user.password,
				title:        user.title,
				birth_date:   user.birth_date,
				birth_month:  user.birth_month,
				birth_year:   user.birth_year,
				firstname:    user.firstname,
				lastname:     user.lastname,
				company:      user.company,
				address1:     user.address1,
				address2:     user.address2,
				country:      user.country,
				zipcode:      user.zipcode,
				state:        user.state,
				city:         user.city,
				mobile_number: user.mobile_number,
			}
		});
	}

	async deleteAccount(email: string, password: string): Promise<void> {
		await this.request.delete(`${BASE_URL}/deleteAccount`, {
			form: { 
				email: email,
				password: password
			},
		})
	}

	async verifyLogin(email: string, password: string): Promise<boolean> {
		return true;
	}
}
