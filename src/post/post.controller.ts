import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto, EditPostDto } from './dtos';
import { PostService } from './post.service';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  async getMany() {
    const data = await this.postService.getMany();
    return {
      message: 'Peticion Correcta',
      data,
    };
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return await this.postService.getOne(id);
  }

  @Post()
  async createOne(@Body() dto: CreatePostDto) {
    return await this.postService.createOne(dto);
  }

  @Put(':id')
  async editOne(@Param('id') id: number, @Body() dto: EditPostDto) {
    return await this.postService.editOne(id, dto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    return await this.postService.deleteOne(id);
  }
}
