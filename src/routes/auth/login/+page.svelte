<script lang="ts">
    import { goto } from "$app/navigation";
    import { user } from "$lib/stores";
    import { supabase } from "$lib/supabaseClient";
    import Form from '../Form.svelte'

    console.log($user)

    let loading = false;
    let email = "";
    let password = "";

    const handleLogin = async () => {
        try {
            loading = true
            let {data, error} = await supabase.auth.signInWithPassword({email: email, password: password})
            if(error) throw error
            console.log(data)
            if(data.user != null) {
                $user = data.user
            }
            goto("/")
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
            <form on:submit|preventDefault={handleLogin}>
                <header class="text-3xl pb-4">Login</header>
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
                    <span class="inline-block mr-2">{loading?"Loading . . .":"Login"}</span>
                </button>
            </form>
        </div>
        <div class="py-5">
            <div class="grid grid-cols-2 gap-1">
                <div class="text-center sm:text-left whitespace-nowrap">
                    <button
                        class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            class="w-4 h-4 inline-block align-text-top"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                            />
                        </svg>
                        <span class="inline-block ml-1"
                            >Forgot Password</span
                        >
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="py-5">
        <div class="grid grid-cols-2 gap-1">
            <div class="text-center sm:text-left whitespace-nowrap">
                <a href="/auth/signup" class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <span class="inline-block ml-1"
                        >Don't have an account?</span
                    >
                </a>
            </div>
        </div>
    </div>
</Form>