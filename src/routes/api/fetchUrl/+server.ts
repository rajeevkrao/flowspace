import type { RequestHandler } from '@sveltejs/kit';
import linkPreviewGenerator from 'link-preview-generator';

export const GET: RequestHandler = async ({ url }) => {
	let targetUrl = url.searchParams.get('url');
	if (!targetUrl) {
		return Response.json({ success: 0, message: 'Missing URL parameter' });
	}

	if (!/^https?:\/\//i.test(targetUrl)) {
		targetUrl = 'https://' + targetUrl;
	}

	try {
		const previewData = await linkPreviewGenerator(targetUrl);

		console.log({ previewData });

		return Response.json({
			success: 1,
			link: targetUrl,
			meta: {
				title: previewData.title,
				description: previewData.description,
				image: {
					url: previewData.img
				}
			}
		});
	} catch (e) {
		const err = e as Error;
		return Response.json({ success: 0, message: err.message });
	}
};
