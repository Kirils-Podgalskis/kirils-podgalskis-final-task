import { ShopUser } from '../utils/shopApiClient.ts';

export function generateUser(): ShopUser {
    const timestamp = Date.now();

    return {
        name: `kptester${timestamp}`,
        title: "Mr",
        firstname: `firstNameTester${timestamp}`,
        lastname: `lastNameTester${timestamp}`,
        email: `kptester${timestamp}@example.com`,
        password: 'password123',
        company: 'million dollar company',
        address1: 'Vingrotāju iela 1',
        address2: 'room',
        country: "India",
        state: "Indian State",
        city: "Indian City",
        zipcode: "6767",
        mobile_number: "67676767",
        birth_date: 6,
        birth_month: "July",
        birth_year: 1967,
        card: {
            nameOnCard: `firstNameTester${timestamp}`,
            cardNumber: "424242424242",
            cvc: "000",
            expiryMonth: "12",
            expiryYear: "2030",
        }
    }
}