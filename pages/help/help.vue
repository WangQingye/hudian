<template>
	<view style="padding: 20rpx;">
		<u-collapse
			:item-style="{marginTop: '30rpx', border: '1px solid #e5e5e5', borderRadius: '15rpx', padding: '10rpx 20rpx 10rpx 20rpx'}">
			<u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index">
				<u-parse :content="item.body" style="margin: 10rpx; margin-top: 0;"></u-parse>
			</u-collapse-item>
			<u-collapse-item title="给我反馈">
				<view class="textarea-wrapper">
					<u-input v-model="form.suggestion" type="textarea" placeholder="使用疑问与建议" />
				</view>
				<u-button @click="postSuggestion" type="primary">提交</u-button>
			</u-collapse-item>
		</u-collapse>
	</view>
</template>

<script>
	import marked from 'marked'
	import uParse from '@/components/u-parse/u-parse.vue'

	export default {
		components: {
			uParse
		},
		data() {
			return {
				form: {
					suggestion: ''
				},
				itemList: [{
					head: '基本介绍',
					body: marked(`这是一个为了方便用户进行友好互点互助交流的任务发布平台，用户可以通过积分悬赏发布自己的任务，也可以通过完成别人的任务来获取积分，从而完成一个完整的互点互助流程。
#### 解决痛点
用户不需要再去各种互点群或者平台通过原始的喊话或者互相添加好友等方式来完成互点。通过发布任务的方式，用户只需要发布任务和完成别人的任务就可以完成互点，在效率和时间节省上有很大提升。

#### 使用流程

用户通过领取任务-完成任务-提交任务来获取积分，获取积分后，可以通过发布任务-审核任务，来发布、检阅自己需要互点的任务。以此循环。
`)
				}, {
					head: '关于任务',
					body: marked(`任务包括了一切您想要别人帮你点击或者完成的事情，比如微信文章阅读、投票、小程序点击、拼多多砍价、滴滴拼团、各类软件的新用户下载注册、等等等等。不同的任务，有不同的难度与要求，所以积分数的设置就不同，您可以根据任务的不同难度，自行设置积分的高低，性价比越高的任务，自然会越快被人领取完成。

#### 发布任务

发布任务时，主要的信息包括平台与完成方式。选择完平台或自行添加平台后，需要在任务描述中说明完成任务的具体方式及其他要求。如果有二维码或者小程序码等，可以上传相应的二维码图片。另外一些细节包括完成时限（用户一旦领取任务后，任务的可领取次数就会减少，所以会限制用户的完成时限，防止用户领取任务后一直没有完成）、积分奖赏、任务数量、有效时间等。

当用户完成任务后，您将在我的发布中看到任务的完成情况，您可以及时去查看用户提交的任务信息，若没有及时审批，提交者一段时间后将会自动获得积分，当然您也可以在事后对有问题的任务发起申述。

另外，请您确认后谨慎选择是否将提交的任务判定为失败，若提交者发起申述并成功，将影响到您的信用分。

#### 领取任务

领取任务后，需要在规定时间内完成任务描述中的事情，并且在关键的地方进行任务截图，用以证明您已经完成该任务。

提交任务后，您将在发布者审核通过或者一定时间后，自动获得积分。但是，如果您提交的截图无法证明完成情况，在自动通过后被发布者提起了申述并通过，您的信用分将被影响。

另外，因为领取任务后，这个任务的领取次数就将被您锁定。所以您需要在规定时间内完成该任务，并且一个用户同时只能领取一个任务，所以希望您领取后及时完成并提交任务。

#### 关于任务申述

申述的前提是您确定您的任务并没用被完成，或您提交的任务并无理拒绝通过。提起申述后，您将直接获得损失的积分。但是，提交申述后，后续将由系统管理员人工进行审核，如果您的申述被驳回，那么您的信用分也将受到影响。所以，请确认任务情况后，谨慎提起申述。
`)
				}, {
					head: '积分与信用分',
					body: marked(`每个账户都将有积分及信用分两个分数来描述账号情况。积分，就像是平台流通的货币，您通过完成任务获取积分，发布任务则会消耗积分。而信用分，则代表了您在平台的信用情况，信用分将直接影响您自己发布任务的完成情况。

#### 积分

获取积分的方式暂时包括：

- 分享推广：您可以分享推广平台到各个微信群或您的朋友，每推荐一位用户点击进入（每位用户能为您带来的进入推荐分一天仅限一次），您都将获得1积分，另外，如果您推荐的是新用户，在他第一次完成任务后，您将再获得2积分。
- 完成任务：按任务描述真实诚信的完成任务，您将获得对应的积分。

#### 信用分

每位用户的初始信用分为100，上限为1000，信用分低于60时将无法再发布或领取任务。

每日登录可获得信用分加1，每次被申述，或者提起申述失败后，都将扣信用分10分。

另外信用分的高低跟您的任务推荐排序有一点关联，将直接影响您自己发布的任务被完成的速度。

毕竟，我们希望营造的是一个诚实诚信的互点互助平台，所以请每位用户一定爱惜自己的信用分，共建诚信高效的互点平台。`)
				}]
			};
		},
		mounted() {
			console.log(marked(`#hello, markdown!`))
		},
		methods: {
			postSuggestion() {
				this.$util.http('addSuggestion', this.form).then(data => {
					this.$util.showToast('提交成功，感谢您的反馈！', '', () => {
						this.form = {
							suggestion: ''
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	@import url("@/components/u-parse/u-parse.css");

	.textarea-wrapper {
		border: 0.5px solid #eee;
		border-radius: 10rpx;
		padding: 10rpx;
		margin-bottom: 10rpx;
	}
</style>
