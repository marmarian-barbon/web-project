<script lang="ts">
	import type { Category } from '../Models/category.model';
	import type { Person } from '../Models/person.model';

	export let category: Category;

	export let persons: Array<Person>;

	export let selectPerson: (id: number) => void;
</script>

<svelte:head>
	<title>{category.title}</title>
</svelte:head>

<section>
	{#each persons as person}
	<div on:click={() => selectPerson(person.id)}>
		<span>{person.first_name}</span>
		<span>{person.last_name}</span>
	</div>
	{/each}
</section>
