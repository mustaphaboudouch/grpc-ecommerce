import { Controller, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { ProfanityService } from 'src/profanity/profanity.service';
import { GrpcAuthGuard } from 'src/auth/auth.guard';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import {
  CreateCategoryRequest,
  CreateCategoryResponse,
  DeleteCategoryRequest,
  DeleteCategoryResponse,
  GetCategoryRequest,
  GetCategoryResponse,
  ListCategoriesResponse,
} from 'src/stubs/product/request';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './entity/category.dto';

@Controller('category')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private profanityService: ProfanityService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  @GrpcMethod('CategoryService')
  async GetCategory(request: GetCategoryRequest): Promise<GetCategoryResponse> {
    const name = request.name;

    try {
      const category = await this.categoryService.find('', name);
      const pbCategory = this.categoryService.toCategoryPb(category);

      return { category: pbCategory };
    } catch (error) {
      this.logger.error(error);
      throw new RpcException(error);
    }
  }

  @GrpcMethod('CategoryService')
  async ListCategories(): Promise<ListCategoriesResponse> {
    try {
      const categories = await this.categoryService.findAll();

      return {
        categories: categories.map(this.categoryService.toCategoryPb),
        nextPageToken: '',
      };
    } catch (error) {
      this.logger.error(error);
      throw new RpcException(error);
    }
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('CategoryService')
  async CreateCategory(
    request: CreateCategoryRequest,
  ): Promise<CreateCategoryResponse> {
    try {
      await this.validateDto(request.category, CreateCategoryDto);
      const nCategory = {
        name: request.category.name,
        description: request.category.description,
      };
      if (!nCategory.name)
        throw new RpcException({
          message: 'No name provided',
          code: HttpStatus.BAD_REQUEST,
          status: status.INVALID_ARGUMENT,
        });

      this.profanityService.checkCategory(request.category);

      const category = await this.categoryService.create(nCategory);
      const pbCategory = this.categoryService.toCategoryPb(category);

      return { category: pbCategory };
    } catch (error) {
      this.logger.error(error);
      throw new RpcException(error);
    }
  }

  @GrpcMethod('CategoryService')
  async DeleteCategory(
    request: DeleteCategoryRequest,
  ): Promise<DeleteCategoryResponse> {
    try {
      const category = await this.categoryService.deleteCategory(request.name);
      const pbCategory = this.categoryService.toCategoryPb(category);

      return { category: pbCategory };
    } catch (error) {
      this.logger.error(error);

      throw new RpcException(error);
    }
  }

  private async validateDto(data: any, Dto: any) {
    if (!data) {
      throw new RpcException({
        message: 'No data provided',
        code: status.INVALID_ARGUMENT,
      });
    }
    const dto = plainToInstance(Dto, data);
    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: errors
          .map(
            ({ value, property, constraints }) =>
              `${value} is not a valid ${property} value (${Object.values(
                constraints,
              ).join(', ')})`,
          )
          .join('\n'),
      });
    }
  }
}
