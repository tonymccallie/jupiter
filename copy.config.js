module.exports = {
	copyJodit: {
		src: '{{ROOT}}/node_modules/jodit/build/jodit.min.js',
		dest: '{{BUILD}}'
	},
	copyJoditCss: {
		src: '{{ROOT}}/node_modules/jodit/build/jodit.min.css',
		dest: '{{BUILD}}'
	}
}