import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { ControlType } from '../enums/control.enum';
import { TranslateService } from '@ngx-translate/core';
import { controlValidation } from '../constant/control.constant';

@Injectable({ providedIn: 'root' })
export class AppControlService {
  constructor(private translate: TranslateService) {}

  generateFormControl(controlType: ControlType, value: any): any {
    switch (controlType) {
      case ControlType.input: {
        return [
          value,
          [
            Validators.required,
            Validators.minLength(controlValidation.defaultMinLength),
            Validators.maxLength(controlValidation.defaultMaxLength),
            Validators.pattern(controlValidation.input.pattern),
          ],
        ];
      }
      default: {
        throw new Error('Invalid control type.');
      }
    }
  }

  public generateToolTip(
    controlType: ControlType,
    pageName: string,
    controlName: string,
    generalFields: boolean = false
  ): string {
    switch (controlType) {
      case ControlType.input: {
        return this.translate.instant('app.general.tooltip.control', {
          controlName: generalFields
            ? this.getGeneralControlText(controlName)
            : this.getControlText(pageName, controlName),
          minLength: controlValidation.defaultMinLength,
          maxLength: controlValidation.defaultMaxLength,
          pattern: this.translate.instant(controlValidation.input.patternKey),
          regx: controlValidation.input.pattern,
        });
      }
      default: {
        throw new Error('Invalid control type.');
      }
    }
  }

  public getControlText(pageName: string, controlName: string): string {
    return this.translate.instant(
      'app.page.' + pageName + '.label.' + controlName
    );
  }

  public getGeneralControlText(controlName: string): string {
    return this.translate.instant('app.general.page.' + controlName);
  }
}
