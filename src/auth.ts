import { SvelteKitAuth } from '@auth/sveltekit';
import { env } from '$env/dynamic/private';
import Google from '@auth/core/providers/google';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [Google({ clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET })],
	secret: env.AUTH_SECRET,
	trustHost: true,
});