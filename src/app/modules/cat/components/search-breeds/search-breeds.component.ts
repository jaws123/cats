import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CatsDto} from '@cat/dto/cats-dto';
import {CatHttpService} from '@cat/services/cat-http.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-search-breeds',
  templateUrl: './search-breeds.component.html'
})
export class SearchBreedsComponent implements OnInit, OnDestroy {

  breedForm: FormGroup;
  cats: CatsDto[];
  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private catHttpService: CatHttpService) { }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    const {name} = this.breedForm.value;
    this.subscriptions.add(this.getBreedsByNameSubscription(name));
  }

  private buildForm() {
    this.breedForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  private getBreedsByNameSubscription(name: string): Subscription {
    return this.catHttpService.getBreedsByName(name).subscribe((cats: CatsDto[]) => {
      this.cats = cats;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
