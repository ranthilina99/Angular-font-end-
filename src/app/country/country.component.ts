import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

// create the Country class
export class Country {
  constructor(
    public id: number,
    public countryName: string,
    public capital: string,
    public language: string,
    public callingCodes: string,
    public region: string
  ) {
  }
}
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countries: Country[];
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;

  // Form builder used Reactive form
  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCountry();

    this.editForm = this.fb.group({
      id: [''],
      countryName: [''],
      capital: [''],
      language: [''],
      callingCodes: [''],
      region: ['']
    } );
  }
  // create the get country function
  getCountry(){
    this.httpClient.get<any>('http://localhost:8080/rest/v2/countries').subscribe(
      response => {
        console.log(response);
        this.countries = response;
      }
    );
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // onsubmit function used submit the form
  onSubmit(f: NgForm) {
    const url = 'http://localhost:8080/rest/v2/country/addnew';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); // the table is relod
      });
    this.modalService.dismissAll(); // model is dismiss
  }

  // openEdit() function used to open the form
  openEdit(targetModal, country: Country) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    this.editForm.patchValue( {
    id: country.id,
    countryName: country.countryName,
    capital: country.capital,
    language: country.language,
    callingCodes: country.callingCodes,
    region: country.region
  });
  }
  // create the on save function
  onSave() {
    const editURL = 'http://localhost:8080/rest/v2/countries/' + this.editForm.value.id + '/edit';
    console.log(this.editForm.value);
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }
  // create the opendelete() function used the display delete popup form d
  openDelete(targetModal, country: Country) {
    this.deleteId = country.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  // create the onDelete function
  onDelete() {
    const deleteURL = 'http://localhost:8080/rest/v2/countries/' + this.deleteId + '/delete';
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }
}
