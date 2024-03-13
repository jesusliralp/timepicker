import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements ControlValueAccessor {
  @Input() militarTime: boolean = true;
  @Input() step: number = 60;
  @Input() value: number = 0;

  private _onChange: any;
  private _onTouched: any;

  private _isDisabled: boolean = false;

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  getSelectedTime(): string {
    const seconds = this.getSeconds();
    return `${this.getHours()}:${this.getMinutes()}${(!!seconds ? `:${seconds}` : '')}`
  }

  private getHours(): string {
    return !!this.value ? Math.floor(this.value / 3600).toString().padStart(2, '-') : '--';
  }

  private getMinutes(): string {
    const remaining = this.value % 3600;
    return !!remaining ? Math.floor(remaining / 60).toString().padStart(2, '-') : '--';
  }

  private getSeconds(): string | null {
    const remaining = this.value % 60;
    return (this.step % 60 > 0) ? !!remaining ? remaining.toString().padStart(2, '-') : '--' : null;
  }
}
