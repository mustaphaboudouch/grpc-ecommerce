import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product as ProductPb } from '../stubs/product/message';
import { CreateProductDto, UpdateProductDto } from './entity/product.dto';
import { Product, ProductDocument } from './entity/product.schema';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  toProductPb(product: Partial<ProductDocument>): ProductPb {
    return {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
    };
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const createdProduct = new this.productModel(createProductDto);
      return await createdProduct.save();
    } catch (error) {
      if ((error?.message as string)?.includes('E11000')) {
        throw new Error(`${createProductDto.name} name is taken`);
      }
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async find(id: string | number, name: string) {
    const product = await this.productModel.findOne({ id, name });

    if (!product) {
      throw new Error(`product with id ${id} or name ${name} not found`);
    }

    return product;
  }

  async updateProduct(
    { id, name }: { name?: string; id?: string },
    uProduct: UpdateProductDto,
  ): Promise<Product> {
    let product: ProductDocument;
    if (id) {
      product = await this.productModel.findById(id);
    } else {
      product = await this.productModel.findOne({ name });
    }

    if (!product) {
      throw new Error(`product with id ${id} or name ${name} not found`);
    }

    Object.assign(product, uProduct);

    await product.save();
    return product;
  }

  async deleteProduct(id: number | string) {
    const product = await this.productModel.findOneAndDelete({
      name: { $regex: `^${id}$`, $options: 'i' },
    });

    if (!product) {
      throw new Error(`product with name ${id} not found`);
    }

    return product;
  }
}
