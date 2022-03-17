import { BaseService } from './base.service';
import type { Person } from '../Models/person.model';

export class PersonsService extends BaseService {
	public constructor(
		baseApiUrl: string)
	{
		super(`${baseApiUrl}/persons`);
	}

	public Read(id: number, callback: (person: Person) => void): void {
		return this.Request('GET', `${this.apiUrl}/${id}`, callback);
	}

	public ReadAll(callback: (persons: Array<Person>) => void): void {
		return this.Request('GET', `${this.apiUrl}/`, callback);
	}

	public ReadByCategory(categoryId: number, callback: (persons: Array<Person>) => void): void {
		const filteredCallback = (persons: Array<Person>) => callback(persons
			.filter(person => person.category_id === categoryId)
		);

		return this.ReadAll(filteredCallback);
	}
}
