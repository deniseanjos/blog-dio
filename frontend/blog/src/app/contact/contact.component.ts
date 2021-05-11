import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

   //Validação de formulario contato
   nomeValido: boolean = false;
   emailValido: boolean = false;
   mensagemValida: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  enviarMensagem() {

    if (!this.nomeValido || !this.emailValido || !this.mensagemValida) {
      alert("Por gentileza, preencha todos os campos corretamente.")
    } else if (this.nomeValido && this.emailValido && this.mensagemValida) {
      alert('Mensagem enviada com sucesso!')
    }
  }

    //Validação de campos formulario contato
    validaNome(event: any){
      this.nomeValido = this.validation(event.target.value.length < 3, event);
    }
  
    validaEmail(event: any){
      this.emailValido = this.validation(event.target.value.indexOf('@') == -1 || event.target.value.indexOf('.') == -1 || event.target.value.indexOf(' ') >= 1, event);
    }
  
    validaMensagem(event: any){
      this.mensagemValida = this.validation(event.target.value.length < 10, event)
    }
  
    validation(condicao: boolean, event:any){
      let valid = false;
      if(condicao){
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
      }else{
        event.target.classList.remove("is-invalid");
        event.target.classList.add("is-valid");
        valid = true;
      }
      return valid;
    }
}

