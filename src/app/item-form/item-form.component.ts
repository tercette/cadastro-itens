// src/app/item-form/item-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageService } from 'ng-zorro-antd/message';
import { provideNgxMask } from 'ngx-mask';
import { ItemService } from '../item.service';
import { NullToNAPipe } from '../null-to-na.pipe'; // Importação direta do pipe standalone
import { Item } from '../Types/models';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzCheckboxModule,
    NzButtonModule,
    NzInputNumberModule,
    NullToNAPipe
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
  itemForm: FormGroup;
  editIndex: number | null = null;
  categorias = ['Automóvel', 'Caminhão', 'Avião'];
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private message: NzMessageService
  ) {
    this.itemForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(70)]],
      categoria: ['', Validators.required],
      ativo: [false],
      quantidade: [{ value: '', disabled: true }, Validators.min(1)],
      preco: [{ value: '', disabled: true }, Validators.min(0)]
    });
  }

  ngOnInit(): void {
    // Verificar se está no modo de edição
    this.route.queryParams.subscribe(params => {
      if (params['index'] !== undefined) {
        this.editIndex = +params['index'];
        const items = this.itemService.getItems();
        const item = items[this.editIndex];
        if (item) {
          this.itemForm.patchValue(item);
          if (item.ativo) {
            this.enableConditionalFields();
          }
        }
      }
    });

    // Monitorar mudanças no campo 'ativo' para aplicar validações condicionais
    this.itemForm.get('ativo')?.valueChanges.subscribe(ativo => {
      if (ativo) {
        this.enableConditionalFields();
      } else {
        this.disableConditionalFields();
      }
    });
  }

  // Habilitar campos condicionais e aplicar validadores
  enableConditionalFields(): void {
    const quantidadeControl = this.itemForm.get('quantidade');
    const precoControl = this.itemForm.get('preco');

    quantidadeControl?.enable();
    precoControl?.enable();

    quantidadeControl?.setValidators([Validators.required, Validators.min(1)]);
    precoControl?.setValidators([Validators.required, this.currencyValidator]);

    quantidadeControl?.updateValueAndValidity();
    precoControl?.updateValueAndValidity();
  }

  // Desabilitar campos condicionais e remover validadores
  disableConditionalFields(): void {
    const quantidadeControl = this.itemForm.get('quantidade');
    const precoControl = this.itemForm.get('preco');

    quantidadeControl?.disable();
    precoControl?.disable();

    quantidadeControl?.clearValidators();
    precoControl?.clearValidators();

    quantidadeControl?.setValue('');
    precoControl?.setValue('');

    quantidadeControl?.updateValueAndValidity();
    precoControl?.updateValueAndValidity();
  }

  // Validador personalizado para o campo monetário
  currencyValidator(control: AbstractControl) {
    const value = control.value;
    // Regex para validar formato monetário, ex: 1.234,56
    const valid = /^(\d{1,3}(?:\.\d{3})*|\d+)(\,\d{2})?$/.test(value);
    return valid ? null : { currency: true };
  }

  // Função de submissão do formulário
  onSave(): void {
    if (this.itemForm.valid) {
      this.isSubmitting = true;
      const item: Item = this.itemForm.value;
      if (this.editIndex !== null) {
        // Atualizar item existente
        this.itemService.updateItem(this.editIndex, item);
        this.message.success('Item atualizado com sucesso');
      } else {
        // Adicionar novo item
        this.itemService.addItem(item);
        this.message.success('Item adicionado com sucesso');
      }
      this.router.navigate(['/list']);
    } else {
      this.validateAllFormFields(this.itemForm);
      this.message.error('Por favor, corrija os erros no formulário.');
    }
  }

  // Função de cancelamento
  onCancel(): void {
    this.router.navigate(['/list']);
  }

  // Função para validar todos os campos do formulário
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsDirty({ onlySelf: true });
        control?.updateValueAndValidity();
      }
    });
  }
}
