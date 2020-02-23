import { Component, EventEmitter, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit, OnDestroy {
  @Input() selectionList: Array<any>;
  @Output() selectedValue: EventEmitter<string> = new EventEmitter();

  public fieldIsFocused: boolean;
  public searchField: FormControl;

  private componentIsDestroyed$: Subject<boolean> = new Subject();
  private copyOfSelectionList: Array<any>;

  constructor() {
    this.searchField = new FormControl();
  }

  ngOnInit() {
    this.copyOfSelectionList = Object.assign([], this.selectionList);
    this.subscribeToSearchFieldValueChanges();
  }

  public get fieldIsFocusedAndThereAreAvailableSelection(): boolean {
    return this.fieldIsFocused && this.selectionList.length > 0;
  }

  public hideSelection(): void {
    this.fieldIsFocused = false;
  }

  public setSelectedValue(selectedValue: string): void {
    this.selectedValue.emit(selectedValue);
    this.hideSelection();
  }

  public showSelection(): void {
    this.fieldIsFocused = true;
  }

  private subscribeToSearchFieldValueChanges(): void {
    this.searchField.valueChanges
      .pipe(debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.componentIsDestroyed$)
      )
      .subscribe(searchValue => {
        this.selectionList = this.copyOfSelectionList;
        this.filterSearchResults(searchValue);
      });
  }

  private filterSearchResults(searchValue: string): void {
    const filteredSelection = this.selectionList.filter(selection => selection.toLowerCase().includes(searchValue));
    this.selectionList = filteredSelection.sort();
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

}
