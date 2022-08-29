import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Developer } from './developer.model';
import { Game } from './game.model';
import { Category } from './category.model';
import { User } from './user.model';
import { Admin } from './admin.model';
import { UserGame } from './userGame.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  header = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  baseUrl = 'https://gamerayapi.azurewebsites.net/api';

  addGame(game: Game) {
    return this.http.post(this.baseUrl + '/game', game, { headers: this.header });

  }

  addDeveloper(developer: Developer) {
    return this.http.post(this.baseUrl + '/developer', developer, { headers: this.header });
  }

  addCategory(category: Category) {
    return this.http.post(this.baseUrl + '/category', category, { headers: this.header });
  }

  addAdmin(admin: Admin) {
    return this.http.post(this.baseUrl + '/admin', admin, { headers: this.header });
  }

  addUser(user: User) {
    return this.http.post(this.baseUrl + '/user', user, { headers: this.header });
  }




  getGame(id: number) {
    return this.http.get(this.baseUrl + '/game/' + id.toString(), { headers: this.header });
  }

  getDeveloper(id: number) {
    return this.http.get(this.baseUrl + '/developer/' + id.toString(), { headers: this.header });
  }

  getCategory(id: number) {
    return this.http.get(this.baseUrl + '/category/' + id.toString(), { headers: this.header });
  }

  getAdmin(id: number) {
    return this.http.get(this.baseUrl + '/admin/' + id.toString(), { headers: this.header });
  }

  getUser(id: number) {
    return this.http.get(this.baseUrl + '/user/' + id.toString(), { headers: this.header });
  }




  getGames() {
    return this.http.get(this.baseUrl + '/game', { headers: this.header });
  }

  getDevelopers() {
    return this.http.get(this.baseUrl + '/developer', { headers: this.header });
  }

  getCategories() {
    return this.http.get(this.baseUrl + '/category', { headers: this.header });
  }
  
  getAdmins() {
    return this.http.get(this.baseUrl + '/admin', { headers: this.header });
  }
  
  getUsers() {
    return this.http.get(this.baseUrl + '/user', { headers: this.header });
  }



  deleteGame(id: number) {
    return this.http.delete(this.baseUrl + '/game/' + id.toString(), { headers: this.header });
  }

  deleteCategory(id: number) {
    return this.http.delete(this.baseUrl + '/category/' + id.toString(), { headers: this.header });
  }

  deleteDeveloper(id: number) {
    return this.http.delete(this.baseUrl + '/developer/' + id.toString(), { headers: this.header });
  }

  deleteAdmin(id: number) {
    return this.http.delete(this.baseUrl + '/admin/' + id.toString(), { headers: this.header });
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + '/user/' + id.toString(), { headers: this.header });
  }




  editDeveloper(developer: Developer) {
    return this.http.put(this.baseUrl + '/developer/' + developer.id.toString(), developer, { headers: this.header });
  }

  editGame(game: Game) {
    return this.http.put(this.baseUrl + '/game/' + game.id.toString(), game, { headers: this.header });
  }

  editCategory(category: Category) {
    return this.http.put(this.baseUrl + '/category/' + category.id.toString(), category, { headers: this.header });
  }

  editAdmin(admin: Admin) {
    return this.http.put(this.baseUrl + '/admin/' + admin.id.toString(), admin, { headers: this.header });
  }

  editUser(user: User) {
    return this.http.put(this.baseUrl + '/user/' + user.id.toString(), user, { headers: this.header });
  }

  uploadFile(formData: FormData) {
    return this.http.post(this.baseUrl + '/upload', formData, { reportProgress: true, observe: 'events' });
  }

  addUserGame(userGame: UserGame) {
    return this.http.post(this.baseUrl + '/userGame', userGame, { headers: this.header });
  }
  
  getUserGame(id: number) {
    return this.http.get(this.baseUrl + '/userGame/' + id.toString(), { headers: this.header });
  }

  getUserGames() {
    return this.http.get(this.baseUrl + '/userGame', { headers: this.header });
  }
  
  deleteUserGame(id: number) {
    return this.http.delete(this.baseUrl + '/userGame/' + id.toString(), { headers: this.header });
  }

  editUserGame(userGame: UserGame) {
    return this.http.put(this.baseUrl + '/userGame/' + userGame.id.toString(), userGame, { headers: this.header });
  }
}

