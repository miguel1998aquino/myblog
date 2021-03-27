import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities';
import { Repository } from 'typeorm';
import { CreatePostDto, EditPostDto } from './dtos';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getMany() {
    return await this.postRepository.find();
  }
  async getOne(id: number, author?: User) {
    const post = await this.postRepository
      .findOne(id)
      .then((p) => (!author ? p : !!p && author.id === p.author.id ? p : null));
    if (!post)
      throw new NotFoundException('pos no existe o no esta autorizado');
    return post;
  }
  async createOne(dto: CreatePostDto, author: User) {
    const newpost = this.postRepository.create({ ...dto, author });
    return await this.postRepository.save(newpost);
  }

  async editOne(id: number, dto: EditPostDto, author?: User) {
    const post = await this.getOne(id, author);
    if (!post) throw new NotFoundException('no existe el dato');
    const editedPost = Object.assign(post, dto);
    return await this.postRepository.save(editedPost);
  }
  async deleteOne(id: number, author?: User) {
    const post = await this.getOne(id, author);
    return await this.postRepository.remove(post);
  }
}
