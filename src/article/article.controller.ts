import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ArticleDTO } from './dto/article';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationDTO } from './dto/paginationDTO';

@ApiTags('article')
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @ApiOperation({ summary: 'create article' })
  @UseGuards(JwtAuthGuard)
  @Post()
  createArticle(@Body(new ValidationPipe()) article: ArticleDTO, @Req() req) {
    return this.articleService.createArticle(article, req.user.id);
  }

  @ApiOperation({ summary: 'get articles' })
  @Get('/')
  getArticle(@Query() query: PaginationDTO) {
    const { limit, page } = query;
    return this.articleService.getArticle(limit, page);
  }

  @ApiOperation({ summary: 'get article by id' })
  @Get(':id')
  getArticleById(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.getArticleById(id);
  }
}
