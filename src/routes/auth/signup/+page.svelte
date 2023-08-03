<script lang="ts">
    import { supabase } from "$lib/supabaseClient";
    import { user } from "$lib/stores";
    import Form from '../Form.svelte'

    console.log($user)

    let loading = false;
    let email = "";
    let password = "";

    const handleSignup = async () => {
        try {
            loading = true
            let {data, error} = await supabase.auth.signUp({email: email, password: password})
            if(error) throw error
            console.log("check your email")
            console.log(data)
            if(data.user != null) {
                $user = data.user
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        } finally {
            loading = false;
        }
    };
</script>

<Form>
    <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <div class="px-5 py-7">
            <form on:submit|preventDefault={handleSignup}>
                <header class="text-3xl pb-4">Sign up</header>
                <label
                    for="email"
                    class="font-semibold text-sm text-gray-600 pb-1 block"
                    >E-mail</label
                >
                <input
                    id="email"
                    type="email"
                    placeholder="example@mail.com"
                    bind:value={email}
                    class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />
                <label
                    for="password"
                    class="font-semibold text-sm text-gray-600 pb-1 block"
                    >Password</label
                >
                <input
                    id="password"
                    type="password"
                    placeholder="password"
                    bind:value={password}
                    class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />
                <button
                    type="submit"
                    disabled={loading}
                    class="transition duration-200 {loading?"bg-gray-500 hover:bg-gray-600 focus:bg-gray-700 focus:ring-gray-500":"bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:ring-blue-500"}  focus:shadow-sm focus:ring-4 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                    <span class="inline-block mr-2">{loading?"Loading . . .":"Sign up"}</span>
                </button>
            </form>
        </div>
    </div>
    <div class="py-5">
        <div class="grid grid-cols-2 gap-1">
            <div class="text-center sm:text-left whitespace-nowrap">
                <a href="/auth/login" class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <span class="inline-block ml-1"
                        >Already have an account?</span
                    >
                </a>
            </div>
        </div>
    </div>
</Form>