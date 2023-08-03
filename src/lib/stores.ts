import { writable, type Writable } from "svelte/store";
import type { AuthUser } from "@supabase/supabase-js";

export const user: Writable<AuthUser> = writable()