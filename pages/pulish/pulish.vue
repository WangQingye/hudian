<template>
	<view class="publish-form">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="任务分类">
				<!-- <u-input v-model="form.sex" type="select" :list="list" /> -->
				<view slot="right">
					<text>asdasas</text>
				</view>
				<u-select v-model="form.sex" :list="list"></u-select>
			</u-form-item>
			<u-form-item label="任务描述">
				<u-input v-model="form.intro" />
			</u-form-item>
			<u-form-item label="任务链接">
				<u-input v-model="form.intro" />
			</u-form-item>
			<u-form-item label="任务图片">
				<u-input v-model="form.intro" />
			</u-form-item>
			<u-form-item label="积分奖励">
				<u-input v-model="form.intro" />
			</u-form-item>
			<u-form-item label="任务数量">
				<u-input v-model="form.intro" />
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					intro: '',
					sex: ''
				},
				checkboxList: [{
						name: '苹果',
						checked: false,
						disabled: false
					},
					{
						name: '雪梨',
						checked: false,
						disabled: false
					},
					{
						name: '柠檬',
						checked: false,
						disabled: false
					}
				],
				radioList: [{
						name: '鲜甜',
						disabled: false
					},
					{
						name: '麻辣',
						disabled: false
					}
				],
				radio: '',
				switchVal: false,
				list: [
					{
						value: '1',
						label: '江'
					},
					{
						value: '2',
						label: '湖'
					}
				],
			};
		}
	}
</script>

<style lang="scss">
.publish-form {
	padding: 20rpx 30rpx;
}
</style>
