# Angular Material Smart Form

This library is supposed to help developers make forms fast and easy. It is useful specially for admin dashboards in which customizing UI is not that imoportant.

## Get Started

install the package

`npm install material-smart-form --save`

import the module in your own module.

```ts
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialSmartFormModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Usage

The simplest usage of this component could be so:

in you component's template file:

```html
<ng-smart-form
  [schema]="formSchema"
  [values]="values"
  [isSubmitting]="isSubmitting"
  (formSubmit)="submit($event)"
>
</ng-smart-form>
```

and in your component:

```ts
isSubmitting: boolean;

formSchema: FormSchema = {
name: {
type: FormFieldTypes.Text,
},
}

values: {
name: 'John',
}

submit(values: {name: string}) {
  this.isSubmitting = true;
  setTimeout(() => {
    this.isSubmitting = false;
  }, 2000);
}
```

## Demo

```
git clone https://github.com/poormohammadi/ng-smart-form.git
cd ng-smart-form
npm i
npm start
```
