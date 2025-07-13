import { v4 as uuidv4 } from 'uuid';
import { UserModel } from '../models';
import { User } from '../types';

export class UserService {

    private readonly model: typeof UserModel;

    constructor() {
        this.model = UserModel;
    }

    async getUserById(id: string): Promise<User | null> {
        try {
            const user = await this.model.get(id);
            if (!user) {
                throw new Error('No user found for the given ID');
            }
            return user;
        } catch (err) {
            throw new Error('Failed to retrieve user');
        }
    }

    async createUser(data: Omit<User, "id" | 'createdAt' | 'updatedAt'>): Promise<void> {
        try {
            if (!data.email || !data.username || !data.phone) {
                throw new Error('Missing required user fields');
            }
            const existingUser = await this.model.getExistingUser(data.username, data.email, data.phone);
            if (existingUser) {
                throw new Error('User already exists');
            }
            return this.model.create({
                id: uuidv4(),
                ...data,
            });
        } catch (err) {
            throw new Error('Failed to create user');
        }
    }

    async updateUser(id: string, data: Partial<User>): Promise<void> {
        try {
            const user = await this.model.get(id);
            if (!user) {
                throw new Error('No user found for the given ID');
            }
            return this.model.update(id, data);
        } catch (err) {
            throw new Error('Failed to update user');
        }
    }

    async deleteUser(id: string): Promise<void> {
        try {
            const user = await this.model.get(id);
            if (!user) {
                throw new Error('No user found for the given ID');
            }
            return this.model.delete(id);
        } catch (err) {
            throw new Error('Failed to delete user');
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            const users = await this.model.getAll();
            if (users.length === 0) {
                throw new Error('No users found');
            }
            return users;
        } catch (err) {
            throw new Error('Failed to retrieve users');
        }
    }
}
