import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table implements OnInit {
  @Input() coloumns: any[] = [];
  @Input() data: any[] = [];
  @Input() pagination = false;
  @Input() pageSize = 10;
  @Input() loading = false;
  @Input() sortable = false;
  @Input() searchable = false;

  @Output() rowClick = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  filteredData: any[] = [];
  pagedData: any[] = [];
  currentPage = 1;

  ngOnInit(): void {
    this.filteredData = [...this.data];
    this.updatePagination();
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredData = this.data.filter((row) =>
      Object.values(row).some((item) => String(item).toLowerCase().includes(value)),
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    if (!this.pagination) {
      this.pagedData = this.filteredData;
      return;
    }

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.pagedData = this.filteredData.slice(start, end);
  }
}
