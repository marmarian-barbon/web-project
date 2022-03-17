import { BaseService } from './base.service';
import type { Category } from '../Models/category.model';

export class CategoriesService extends BaseService {
	public constructor(
		baseApiUrl: string)
	{
		super(`${baseApiUrl}/categories`);
	}

	public ReadAll(callback: (categories: Array<Category>) => void): void {
		return this.Request('GET', `${this.apiUrl}/`, callback);
	}
}
