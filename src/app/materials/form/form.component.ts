import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from '../material.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';

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
})
export class FormComponent implements OnInit {
  materialForm: FormGroup;
  isEditMode = false;
  estados: string[] = ['ACTIVO', 'DISPONIBLE', 'ASIGNADO'];
  ciudades = [
    { id: 1, nombre: 'Ciudad 1' },
    { id: 2, nombre: 'Ciudad 2' },
    { id: 3, nombre: 'Ciudad 3' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private materialService: MaterialService
  ) {
    this.materialForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      tipo: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      fecha_compra: ['', Validators.required],
      fecha_venta: [''],
      estado: ['', Validators.required],
      ciudad_id: [null, Validators.required],
    });
  }

  ngOnInit(): void {
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
}
