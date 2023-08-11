<script lang="ts">
    import { user } from "$lib/stores";
</script>


{#if $user != undefined}
    <h1 class="text-3xl">Welcome to SvelteKit</h1>
    <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
    <p>Autenticato</p>
{:else}
    <a href="/auth/login">Login</a>
    <a href="/auth/signup">Signup</a>
{/if}