<script lang="ts">
	import { onMount } from 'svelte';

	import Header from '@editorjs/header';
	import List from '@editorjs/list';
	import { SignIn } from '@auth/sveltekit/components';
	import { page } from "$app/stores"

	let EditorJS;

	console.log({page: $page.data })

	onMount(async () => {
		const { default: Editor } = await import('@editorjs/editorjs');
		// @ts-ignore
		const { default: LinkTool } = await import('@editorjs/link');
		const { default: Table } = await import('@editorjs/table');
		const { default: CodeTool } = await import('@editorjs/code');
		EditorJS = Editor;
		// Initialize your editor here
		const editor = new EditorJS({
			holder: 'editorjs',
			/* readOnly: true, */
			onChange: (a) => {
				console.log('Editor data has changed', a);
			},
			// other configuration options
			tools: {
				header: {
					class: Header,
					inlineToolbar: true,
					config: {
						placeholder: 'Enter a header',
						levels: [1, 2, 3],
						defaultLevel: 1
					}
				},
				list: {
					class: List,
					inlineToolbar: true,
					config: {
						defaultStyle: 'unordered'
					}
				},
				linkTool: {
					class: LinkTool,
					inlineToolbar: true,
					config: {
						endpoint: '/api/fetchUrl' // Your backend endpoint for url data fetching
					}
				},
				table: {
					class: Table,
					inlineToolbar: true
				},
				code: {
					class: CodeTool,
					inlineToolbar: true
				}
			}
		});
	});
</script>

<div class="account">
	<SignIn provider="google" signInPage="app/signin"/>
</div>

<div id="editorjs"></div>

<style>
	.account {
		position: fixed;
		bottom: 0;
		right: 0;
	}
</style>
