import { Injectable } from '@nestjs/common';
import { Category, Product } from 'src/stubs/product/message';
import { profanity, changeMainLanguage } from 'super-profanity';

interface ProfanityResult {
  detectedWord: string;
  isBadWord: boolean;
  profanityWordRelated: string;
}

@Injectable()
export class ProfanityService {
  profanity: any;
  constructor() {
    changeMainLanguage('fr');
    this.profanity = profanity;
  }

  checkProduct(product: Partial<Product>): void {
    let result: ProfanityResult = this.profanity(product.name || '');
    if (result.isBadWord) throw this.createError(result);

    result = this.profanity(product.description || '');
    if (result.isBadWord) throw this.createError(result);
  }

  checkCategory(category: Partial<Category>): void {
    let result: ProfanityResult = this.profanity(category.name || '');
    if (result.isBadWord) throw this.createError(result);

    result = this.profanity(category.description || '');
    if (result.isBadWord) throw this.createError(result);
  }

  checkStr(...fields: string[]): void {
    for (const s of fields) {
      const result = this.profanity(s);
      if (result.isBadWord) throw this.createError(result);
    }
  }

  private createError(profanityCheck: ProfanityResult): Error {
    return new Error(
      `${profanityCheck.detectedWord} is a profanity (${profanityCheck.profanityWordRelated})`,
    );
  }
}
