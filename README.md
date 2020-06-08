# Angular Material Smart Form

This library is supposed to help developers make forms fast and easy. It is useful specially for admin dashboards in which customizing UI is not that imoportant.

## Get Started

install the package

`npm install material-smart-form --save`

import the module in your own module.

```
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialSmartFormModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})

export  class  AppModule { }
```

## Usage

The simplest usage of this component could be so:

in you component's template file:

`<ng-smart-form [schema]="formSchema" [values]="values" (formSubmit)="submit($event)"> </ng-smart-form>`

and in your component:

```js
formSchema: FormSchema = {
	name: {
		type: FormFieldType.Text,
	},
}

values: {
	name: 'John',
}

submit(values: {name: string}) {
	console.log(values);
}
```
