import { Component } from '@angular/core';
import { Guid } from "guid-typescript";
import { Todo } from './models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Todo[] = [];
  form: FormGroup;
  constructor(private _formBuilder: FormBuilder) {
    this.todos = [
      new Todo(Guid.create(), "Cleaning home", false),
      new Todo(Guid.create(), "Washing dress", false),
    ]
    this.form = _formBuilder.group({
      title: ['', [Validators.required]]
    })
  }
  get title() {
    return this.form.get("title");
  }
  onSubmit(event: string) {
    console.log(this.form.value);
    let todo = new Todo(Guid.create(), this.title?.value, false);
    this.todos.push(todo);
    this.form.reset();
  }
  isCompleted(id: Guid) {
    let todo = this.todos.filter((item) => item.id === id)[0]
    todo.isCompleted = true
    // console.log(todo);
  }
  delete(id: Guid) {
    let todo = this.todos.filter((item) => item.id === id)[0];
    let index = this.todos.indexOf(todo, 0);
    if (index > -1) {
      this.todos.splice(index, 1)
    }
    // console.log(index)
  }
  clearAll() {
    this.todos = []
  }
}
