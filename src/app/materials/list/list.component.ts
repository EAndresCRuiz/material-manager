import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../../core/services/material.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    FilterComponent,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  materials: any[] = [];
  displayedColumns: string[] = [
    'nombre',
    'descripcion',
    'tipo',
    'precio',
    'fechaCompra',
    'fechaVenta',
    'estado',
    'ciudad',
    'acciones',
  ];

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials(filters: any = {}): void {
    this.materialService.getFilteredMaterials(filters).subscribe((data) => {
      this.materials = data.map((material: any) => ({
        ...material,
        ciudadNombre: material.ciudad?.nombre || 'Sin Ciudad',
      }));
    });
  }
}
