import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from '../../core/services/material.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { CityService } from '../../core/services/city.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CUSTOM_DATE_FORMATS } from '../../core/config/date-formats';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ],
})
export class FormComponent implements OnInit {
  materialForm: FormGroup;
  isEditMode = false;
  estados: string[] = ['ACTIVO', 'DISPONIBLE', 'ASIGNADO'];
  cities: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private materialService: MaterialService,
    private cityService: CityService
  ) {
    this.materialForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      tipo: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      fechaCompra: ['', Validators.required],
      fechaVenta: [''],
      estado: ['', Validators.required],
      ciudadId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.cityService.getCities().subscribe((data) => {
      this.cities = data;
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.materialService.getMaterialById(+id).subscribe((material) => {
        this.materialForm.patchValue(material);
      });
    }
  }

  onSubmit(): void {
    if (this.materialForm.invalid) return;

    if (this.isEditMode) {
      this.materialService
        .updateMaterial(this.route.snapshot.params['id'], this.materialForm.value)
        .subscribe(() => this.router.navigate(['/materials']));
    } else {
      this.materialService
        .createMaterial(this.materialForm.value)
        .subscribe(() => this.router.navigate(['/materials']));
    }
  }

  private formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }
}
