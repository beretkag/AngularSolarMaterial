import { Component, Inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent {

  constructor(
    private api: ApiService, 
    public dialog: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  hmke_s: any[] = [];
  dialogTitle: string = 'Rekord rögzítése';
  actionBtn: string = 'Mentés'; 
  form = new FormGroup({
    datum: new FormControl('', Validators.required),
    termeles: new FormControl('', Validators.required),
    HMKE_ID: new FormControl('', Validators.required)
  });

  ngOnInit(){
    this.getAll_HMKE();
   if (this.editData){     
      this.form.controls['datum'].setValue(this.editData.datum);
      this.form.controls['termeles'].setValue(this.editData.termeles);
      this.form.controls['HMKE_ID'].setValue(this.editData.HMKE_ID);
      this.dialogTitle = 'Termelés módosítása';
      this.actionBtn = 'Módosítás';
   }
  }

  getAll_HMKE(){
    this.api.selectAll('hmke').subscribe({
      next: (res:any) => {
        this.hmke_s = res;
      },
      error: (error) => {console.log(error)}
    });
  }

  insert(){
    let data = {
      HMKE: this.form.value.HMKE_ID,
      datum: this.form.value.datum,
      termeles: this.form.value.termeles
    }
    if (!this.editData){
      if (!this.form.valid){
          alert("Nem adtál meg minden adatot!");
      }
      else
      {
        this.api.insert('termeles', data).subscribe({
          next: (res) => {
            alert('Új rekord sikeresen rögzítve');
            this.dialog.close('save');
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    }else
    {
      this.update(data);
    }
  }

  update(data:any){
    if (!this.form.valid){
      alert("Nem adtál meg minden adatot!");
    }
    else
    {
      this.api.update('termeles', this.editData.ID, data).subscribe({
        next: (res) => {
          alert('A módosítás sikeresen megtörtént!');
          this.dialog.close('update');
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

}
