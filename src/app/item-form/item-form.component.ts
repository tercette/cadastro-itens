import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzCheckboxModule,
    NzButtonModule
  ],
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItemFormComponent implements OnInit {
  itemForm: FormGroup;
  editIndex: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {
    this.itemForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(70)]],
      categoria: ['', Validators.required],
      ativo: [false],
      quantidade: [''],
      preco: ['']
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['index'] !== undefined) {
        this.editIndex = +params['index'];
        const item = this.itemService.getItems()[this.editIndex];
        if (item) {
          this.itemForm.patchValue(item);
        }
      }
    });
  }

  onSave(): void {
    if (this.itemForm.valid) {
      const item = this.itemForm.value;
      if (this.editIndex !== null) {
        this.itemService.updateItem(this.editIndex, item);
        this.router.navigate(['/list']);
        alert('Item atualizado com sucesso');
      } else {
        this.itemService.addItem(item);
        this.router.navigate(['/list']);
        alert('Item adicionado com sucesso');
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/list']);
  }
}
