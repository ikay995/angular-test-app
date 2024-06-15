import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  addressForm: FormGroup = new FormGroup({
    address: new FormControl('', Validators.required),
  });
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[- +()0-9]+$'),
    ]),
    email: new FormControl('', [Validators.email]),
    address: new FormArray([this.addressForm]),
    longitude: new FormControl(3.601521, Validators.required),
    latitude: new FormControl(6.458985, Validators.required),
  });

  get address() {
    return this.form.controls['address'] as FormArray<FormGroup>;
  }

  addAddress() {
    this.address.push(this.addressForm);
  }

  submit() {
    console.log(this.form.value);
    if (this.form.invalid) {
      alert('All fields are required');
    } else {
      window.localStorage.setItem('contact', JSON.stringify(this.form.value));
      alert('Successful');
      this.router.navigate(['/dashboard'], {
        relativeTo: this.route,
        queryParams: {
          name: this.form.value.name,
          phone: this.form.value.phone,
          email: this.form.value.email,
          longitude: this.form.value.longitude,
          latitude: this.form.value.latitude,
        },
      });
    }
  }
}
