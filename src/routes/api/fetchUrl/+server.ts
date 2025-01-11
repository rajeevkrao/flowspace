import type { RequestHandler } from '@sveltejs/kit';
import { getLinkPreview } from 'link-preview-js';

export const GET: RequestHandler = async ({ url }) => {
	let targetUrl = url.searchParams.get('url');
	if (!targetUrl) {
		return Response.json({ success: 0, message: 'Missing URL parameter' });
	}

	if (!/^https?:\/\//i.test(targetUrl)) {
		targetUrl = 'https://' + targetUrl;
	}

	try {
		console.log({ targetUrl });
		const previewData = await getLinkPreview(targetUrl, { followRedirects: 'follow' });

		console.log({ previewData });

		return Response.json({
			success: 1,
			link: targetUrl,
			meta: {
				title: 'title' in previewData ? previewData.title : '',
				description: 'description' in previewData ? previewData.description : '',
				image: {
					url: 'images' in previewData ? previewData.images[0] : ''
				}
			}
		});
	} catch (e) {
		const err = e as Error;
		return Response.json({ success: 0, message: err.message });
	}
};
