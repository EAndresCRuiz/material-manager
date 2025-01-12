import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../material.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  materials: any[] = [];
  displayedColumns: string[] = ['nombre', 'tipo', 'acciones'];

  constructor(private materialService: MaterialService) { }

  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials(): void {
    this.materialService.getAllMaterials().subscribe((data) => {
      this.materials = data;
    });
  }

}
