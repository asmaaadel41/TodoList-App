import { Component } from '@angular/core';
import { Guid } from "guid-typescript";
import { Todo } from './models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Todo[] = [];
  form: FormGroup;
  constructor(private _formBuilder: FormBuilder, private toast: NgToastService) {
    this.todos = [
      new Todo(Guid.create(), "Cleaning room", false),
      new Todo(Guid.create(), "Reading book", false),
    ];
    this.form = _formBuilder.group({
      title: ['', [Validators.required]]
    })
  }
  get title() {
    return this.form.get("title");
  }
  ngOnInit(): void {
    let savedTodo = localStorage.getItem('todo');
    savedTodo ? this.todos = JSON.parse(savedTodo) : this.todos;
  }
  add(event: any) {
    console.log(this.form.value);
    let todo = new Todo(Guid.create(), this.title?.value, false);
    this.form.reset();
    if ('todo' in localStorage) {
      this.todos = JSON.parse(localStorage.getItem('todo')!);
      let exist = this.todos.filter((item) => item.title === todo.title)[0];
      if (exist) {
        this.showInfo()
      }
      else {
        this.todos.push(todo);
        this.saveTodos();
      }
    }
    else {
      this.todos.push(todo);
      this.saveTodos();
    }
  }
  isCompleted(id: Guid) {
    let todo = this.todos.filter((item) => item.id === id)[0]
    todo.isCompleted = true
    this.saveTodos();
  }
  delete(id: Guid) {
    let todo = this.todos.filter((item) => item.id === id)[0];
    let index = this.todos.indexOf(todo, 0);
    if (index > -1) {
      this.todos.splice(index, 1)
    }
    this.saveTodos();
  }
  clearAll() {
    this.todos = [];
    localStorage.clear();
  }
  saveTodos() {
    localStorage.setItem('todo', JSON.stringify(this.todos));
  }
  showInfo() {
    this.toast.error({ detail: "Error", summary: 'This Task Already Exist', duration: 3000 });
  }
}
