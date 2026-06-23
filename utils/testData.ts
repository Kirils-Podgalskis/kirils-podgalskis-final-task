export function generateUser() {
    const timestamp = Date.now();

    return {
        username: `kptester${timestamp}`,
        email: `kptester${timestamp}@example.com`,
        password: 'password123'
    }
}