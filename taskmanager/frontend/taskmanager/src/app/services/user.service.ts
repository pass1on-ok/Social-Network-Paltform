import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Admin', email: 'admin@email.com', password: 'admin',token:'1' },
    { id: 2, name: 'Kumar', email: 'kumar@email.com', password: '123', token:'2' }
  ];

  constructor() { }

  getUsers(): User[] {
    return this.users;
  }

  createUser(user: User): void {
    this.users.push(user);
  }

  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }
}
