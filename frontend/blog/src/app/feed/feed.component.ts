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
    this.postService.postMensagem(this.post).subscribe((data: Post) => {
      this.post = data
      location.assign('/feed')
    })
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

}
