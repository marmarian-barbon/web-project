<script lang="ts">
	import { CategoriesService } from './Services/category.service';
	import { PersonsService } from './Services/person.service';
	import HomePage from './Pages/HomePage.svelte';
	import CategoryPage from './Pages/CategoryPage.svelte';
	import PersonPage from './Pages/PersonPage.svelte';
	import type { Category } from './Models/category.model';
	import type { Person } from './Models/person.model';

	const categoriesService = new CategoriesService('http://localhost:3000');
	const personsService = new PersonsService('http://localhost:3000');

	let page: 'home' | 'category' | 'person' | null = null;

	let caregoriesList: Array<Category> | null = null;

	let pageContent: {
		category: Category | null;
		personsList?: Array<Person>;
		person?: Person;
	} | null = null;

	function clearPage(): void {
		page = null;
		pageContent = null;
	}

	function toHome(): void
	{
		clearPage();

		const onLoad = () => {
			page = 'home';
			pageContent = null;
		};

		return onLoad();
	}

	function toCategory(id: number): void {
		clearPage();

		const onLoad = (persons: Array<Person>) => {
			page = 'category';
			pageContent = {
				category: caregoriesList.find(category => category.id === id),
				personsList: persons
			};
		};

		return personsService.ReadByCategory(id, onLoad);
	}

	function toPerson(id: number): void {
		clearPage();

		const onLoad = (person: Person) => {
			page = 'person';
			pageContent = {
				category: caregoriesList.find(category => category.id === person.id),
				person
			};
		};

		return personsService.Read(id, onLoad);
	}

	categoriesService.ReadAll(categories => {
		caregoriesList = categories;
		toHome();
	});
</script>

<header>
	<div on:click={toHome}>Главная</div>
	{#if caregoriesList}
	{#each caregoriesList as category}
	<div on:click={() => toCategory(category.id)}>{category.title}</div>
	{/each}
	{/if}
</header>

<main>
	{#if page === 'home'}
	<HomePage></HomePage>
	{:else if page === 'category'}
	<CategoryPage
		category={pageContent.category}
		persons={pageContent.personsList}
		selectPerson={toPerson}>
	</CategoryPage>
	{:else if page === 'person'}
	<PersonPage
		person={pageContent.person}>
	</PersonPage>
	{:else}
	Загрузка...
	{/if}
</main>

<style lang="scss">
	main {
		background-color: bisque;
	}
</style>
