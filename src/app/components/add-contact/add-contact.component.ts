import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateScreenSize(event.target.innerWidth);
  }
  constructor(private router: Router, private route: ActivatedRoute) {}
  addressForm: FormGroup = new FormGroup({
    address: new FormControl('', Validators.required),
  });
  screenSize = Math.min(window.screen.width, window.screen.height);
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

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        this.getUserLocation(position)
      );
    }
  }

  updateScreenSize(screen: number) {
    console.log(screen);
    this.screenSize = screen;
  }

  get isMobile() {
    console.log(
      window.screen.width,
      Math.min(window.screen.width, window.screen.height)
    );
    return this.screenSize < 600;
  }

  getUserLocation(position: any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    this.form.patchValue({
      latitude,
      longitude,
    });
  }

  get address() {
    return this.form.controls['address'] as FormArray<FormGroup>;
  }

  addAddress() {
    this.address.push(
      new FormGroup({
        address: new FormControl('', Validators.required),
      })
    );
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
          address: this.form.value.address[0].address,
        },
      });
    }
  }
}
