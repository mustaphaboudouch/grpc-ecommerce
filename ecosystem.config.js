module.exports = {
	apps: [
		{
			name: 'server',
			script: 'server/dist/main.js',
			env: {
				PROTO_FILE: 'proto/product/product.proto',
				MONGO_URL:
					'mongodb+srv://mustaphaboudouch:JX8jsjI8EBEo09qr@ecommerce.6iq16bc.mongodb.net/?retryWrites=true&w=majority',
				insecure: 'true',
			},
		},
	],
};
