<script lang="ts">
	import type { Person } from '../Models/person.model';

	export let person: Person;
</script>

<svelte:head>
	<title>{person.first_name} {person.last_name}</title>
</svelte:head>

<article>
	<span>{person.first_name}</span>
	<span>{person.last_name}</span>
</article>
