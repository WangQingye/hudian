<template>
	<view>
		<view class="publish-form" v-if="showReal === true">
			<u-form :model="form" ref="uForm" label-width="150">
				<u-form-item label="任务分类" prop="type">
					<u-input type="select" :select-open="selectShow" v-model="form.type" placeholder="请选择任务类型"
						@click="selectShow = true"></u-input>
					<!-- 任务种类选择 -->
					<u-select mode="single-column" :list="taskLists" v-model="selectShow" @confirm="selectConfirm">
					</u-select>
				</u-form-item>
				<u-form-item label="自定义分类" v-if="form.type === '自定义'" prop="originType">
					<u-input v-model="form.originType" placeholder="请输入自定义任务分类名称,方便搜索" />
				</u-form-item>
				<u-form-item label="任务链接" prop="link">
					<u-input v-model="form.link" placeholder="您需要点击的链接,或者复制后打开软件的代码" />
				</u-form-item>
				<u-form-item label="任务图片" prop="img">
					<uni-file-picker v-model="imageValue" file-mediatype="image" mode="grid" :limit="1"
						@success="success">
					</uni-file-picker>
					<text style="color: #D3D3D3;">二维码或者小程序码等</text>
				</u-form-item>
				<u-form-item label="任务描述" prop="desc">
					<u-input v-model="form.desc" type="textarea" placeholder="请输入任务介绍/完成的方法及步骤等" />
				</u-form-item>
				<u-form-item label="积分奖励" prop="score">
					<u-input v-model="form.score" type="number" placeholder="积分奖励(奖励越高,完成越快)" />
					<view slot="right">
						分
					</view>
				</u-form-item>
				<u-form-item label="任务时限" prop="time">
					<u-input type="select" :select-open="selectTimeShow" v-model="form.time" placeholder="请选择完成时间限制"
						@click="selectTimeShow = true"></u-input>
					<!-- 任务种类选择 -->
					<u-select mode="single-column" :list="timeLists" v-model="selectTimeShow"
						@confirm="selectTimeConfirm">
					</u-select>
				</u-form-item>
				<!-- <u-form-item label="任务时限" prop="time">
				<u-input v-model="form.time" type="number" placeholder="完成时间限制(建议5-10分钟)" />
				<view slot="right">
					分钟
				</view>
			</u-form-item> -->
				<u-form-item label="任务数量" prop="num">
					<u-input v-model="form.num" type="number" placeholder="发布的任务数量" />
				</u-form-item>
			</u-form>
			<view style="margin-top: 50rpx;">
				<u-button type="primary" @click="submit">发布</u-button>
			</view>
		</view>
		<view class="publish-form" v-if="showReal === false">
			<u-form :model="form" ref="uForm" label-width="150">
				<u-form-item label="生活标题" prop="link">
					<u-input v-model="form.link" placeholder="生活标题" />
				</u-form-item>
				<u-form-item label="生活图片" prop="img">
					<uni-file-picker v-model="imageValue" file-mediatype="image" mode="grid" :limit="1"
						@success="success">
					</uni-file-picker>
					<text style="color: #D3D3D3;">美好照片</text>
				</u-form-item>
				<u-form-item label="生活描述" prop="desc">
					<u-input v-model="form.desc" type="textarea" placeholder="生活描述" />
				</u-form-item>
			</u-form>
			<view style="margin-top: 50rpx;">
				<u-button type="primary" @click="submit">记录</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showReal: undefined,
				selectShow: false,
				selectTimeShow: false,
				taskLists: [{
						value: '1',
						label: '拼多多'
					},
					{
						value: '2',
						label: '淘宝'
					},
					{
						value: '3',
						label: '小程序'
					},
					{
						value: '4',
						label: '抖音'
					},
					{
						value: '5',
						label: '快手'
					},
					{
						value: '3',
						label: '自定义'
					}
				],
				timeLists: [{
						value: '60',
						label: '1小时'
					},
					{
						value: '180',
						label: '3小时'
					},
					{
						value: '1440',
						label: '24小时'
					}
				],
				form: {
					type: '',
					originType: '',
					desc: '',
					link: '',
					img: '',
					score: '',
					time: '',
					num: '',
				},
				imageValue: [],
				rules: {
					type: [{
						required: true,
						message: '请选择任务分类',
						trigger: ['change', 'blur'],
					}],
					originType: [{
						required: true,
						message: '请输入自定义分类',
						trigger: ['change', 'blur'],
					}],
					score: [{
						required: true,
						message: '请设置积分奖励',
						trigger: ['change', 'blur'],
					}],
					time: [{
						required: true,
						message: '请设置任务完成时限',
						trigger: ['change', 'blur'],
					}],
					num: [{
						required: true,
						message: '请设置任务数量',
						trigger: ['change', 'blur'],
					}],
					img: [{
						validator: (rule, value, callback) => {
							if (this.form.img || this.form.link) {
								callback()
								return true
							} else {
								callback(new Error('任务链接和图片至少填写一个'))
								return false
							}
						},
						message: '任务链接和图片至少填写一个',
						trigger: ['change', 'blur'],
					}],
					link: [{
						validator: (rule, value, callback) => {
							if (this.form.img || this.form.link) {
								callback()
								return true
							} else {
								callback(new Error('任务链接和图片至少填写一个'))
								return false
							}
						},
						message: '任务链接和图片至少填写一个',
						trigger: ['change', 'blur'],
					}]
				}
			};
		},
		onLoad() {
			this.showReal = this.$util.store.showReal
			if (!this.showReal) {
				uni.setNavigationBarTitle({
					title: '记录生活'
				});
			}
		},
		methods: {
			selectConfirm(e) {
				this.form.type = e[0].label
			},
			selectTimeConfirm(e) {
				this.form.time = e[0].label
			},
			success(e) {
				this.form.img = e.tempFilePaths[0]
			},
			submit() {
				this.$refs.uForm.validate(async valid => {
					if (valid) {
						if (this.$util.store.userInfo.score < (this.form.score * this.form.num)) {
							this.$util.showToast('积分不足，您当前的可用积分为：' + this.$util.store.userInfo.score + '，快去做任务吧！')
							return
						} else if (this.$util.store.userInfo.credit < 60) {
							this.$util.showToast('您的信用分过低，不能发布任务哦，请先通过每日登录获取信用分吧')
							return
						} else {
							let addObj = {
								time: this.form.time.slice(0, -2) * 60
							}
							let tip = '发布成功'
							if (!this.showReal) {
								addObj.num = 10
								addObj.type = 'a'
								tip = '记录成功'
								let res = await this.$util.http('testMsg', {
									msg: this.form.link + this.form.desc,
									userId: this.$util.store.userInfo.openId
								})
								if (!res.result) {
									this.$util.showToast('您输入的信息包含违规信息，请修改')
									return
								}
							}
							this.form.type = this.form.originType || this.form.type
							this.$util.http('addTask', Object.assign(this.form, addObj)).then(data => {
								this.$util.showToast(tip, '', () => {
									if (!this.showReal) {
										uni.switchTab({
											url: `/pages/index/index?refresh=1`
										})
									} else {
										uni.redirectTo({
											url: `/pages/task-list/task-list?type=publish`
										})
									}
								})
							})
						}
					}
				});

			},
			// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
			onReady() {
				this.$refs.uForm.setRules(this.rules);
			}
		}
	}
</script>

<style lang="scss">
	.publish-form {
		padding: 20rpx 30rpx;
	}
</style>
