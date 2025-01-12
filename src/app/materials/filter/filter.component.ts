import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { CityService } from '../../core/services/city.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CUSTOM_DATE_FORMATS } from '../../core/config/date-formats';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ],
})
export class FilterComponent implements OnInit {
  @Output() applyFilters = new EventEmitter<any>();

  filterForm: FormGroup;
  estados: string[] = ['ACTIVO', 'DISPONIBLE', 'ASIGNADO'];
  cities: any[] = [];

  constructor(private fb: FormBuilder, private cityService: CityService) {
    this.filterForm = this.fb.group({
      nombre: [''],
      tipo: [''],
      fechaCompra: [null],
      ciudad: [''],
    });
  }

  ngOnInit(): void {
    this.cityService.getCities().subscribe((data) => {
      this.cities = data;
    });
  }

  onApplyFilters(): void {
    const filters = this.filterForm.value;
    if (filters.fechaCompra) {
      filters.fechaCompra = this.formatDate(filters.fechaCompra);
    }
    this.applyFilters.emit(filters);
  }

  private formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  onClearFilters(): void {
    this.filterForm.reset();
    this.applyFilters.emit({});
  }
}
