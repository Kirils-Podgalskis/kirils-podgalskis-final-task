export function generateUser() {
    const timestamp = Date.now();

    return {
        title: "Mr",
        firstName: `firstNameTester${timestamp}`,
        lastName: `lastNameTester${timestamp}`,
        username: `kptester${timestamp}`,
        email: `kptester${timestamp}@example.com`,
        password: 'password123',
        address: 'Vingrotāju iela 1',
        country: "India",
        state: "Indian State",
        city: "Indian City",
        zipcode: "6767",
        phone: "67676767",
        day: "6",
        month: "July",
        year: "1967",
        card: {
            nameOnCard: `firstNameTester${timestamp}`,
            cardNumber: "424242424242",
            cvc: "000",
            expiryMonth: "12",
            expiryYear: "2030",
        }
    }
}