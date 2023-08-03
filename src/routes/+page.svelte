<script lang="ts">
    import { supabase } from '$lib/supabaseClient';
    import { user } from '$lib/stores'
    import { onMount } from 'svelte';

    onMount(() => {
        console.log($user)
        supabase.auth.getUser().then(({ data }) => {
            if(data.user) $user = data.user
        })
        console.log($user)
    })
</script>


{#if $user != undefined}
    <p>{$user.id}</p>
    <h1 class="text-3xl">Welcome to SvelteKit</h1>
    <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
    <p>Autenticato</p>
{:else}
    <a href="/auth/login">Login</a>
    <a href="/auth/signup">Signup</a>
{/if}