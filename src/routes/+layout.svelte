<script>
    import { supabase } from '$lib/supabaseClient';
    import { user } from '$lib/stores';
    import { onMount } from "svelte";
    import "../app.css";

    onMount(() => {
        supabase.auth.getSession().then(({ data }) => {
            if(data.session?.user) $user = data.session.user
        })
    })
</script>

<slot />