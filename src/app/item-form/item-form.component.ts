import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select'; // Importante para o campo de seleção
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule, // Assegure que está presente aqui
    NzCheckboxModule,
    NzButtonModule
  ],
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
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
      quantidade: [{ value: '', disabled: true }],
      preco: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['index'] !== undefined) {
        this.editIndex = +params['index'];
        const item = this.itemService.getItems()[this.editIndex];
        if (item) {
          this.itemForm.patchValue(item);
          if (item.ativo) {
            this.itemForm.get('quantidade')?.enable();
            this.itemForm.get('preco')?.enable();
          }
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
