import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from '../model/Post';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  listPost: Post[];
  post: Post = new Post;
  tituloPost: string;

  //Validação de dados para publicação
  tituloValido: boolean = false;
  nomeValido: boolean = false;
  mensagemValida: boolean = false;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.findAllPosts()
  }

  findAllPosts() {
    this.postService.getAllPosts().subscribe((resp: Post[]) => {
      this.listPost = resp;
    })
  }

  cadastrarMensagem() {
    if (!this.nomeValido || !this.tituloValido || !this.mensagemValida) {
      alert("Por gentileza preencha todos os campos corretamente.")
    } else if (this.tituloValido && this.mensagemValida && this.nomeValido) {
      this.postService.postMensagem(this.post).subscribe((data: Post) => {
        this.post = data
        location.assign('/feed')
      })
    }
  }

  findByTituloPostagem() {
    if(this.tituloPost == '') {
      this.findAllPosts()
    } else {
      this.postService.getPostByTitulo(this.tituloPost).subscribe((resp: Post[]) => {
        this.listPost = resp;
      })
    }
  }

  //Validação de campos
  validaNome(event: any){
    this.nomeValido = this.validation(event.target.value.length < 3, event);
  }

  validaTitulo(event: any){
    this.tituloValido = this.validation(event.target.value.length < 5, event);
  }

  validaMensagem(event: any){
    this.mensagemValida = this.validation(event.target.value.length < 30, event)
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
