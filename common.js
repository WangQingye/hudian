export default {
	showToast(text, icon, cb) {
		uni.showToast({
			title: text,
			duration: 1500,
			icon: icon || 'none',
			complete() {
				setTimeout(() => {
					cb()
				}, 1500)
			}
		});
	}
}
