<template>
	<view v-cloak>
		<view class="header">
			<view class="header-main">
				<view class="header-left-img">
					<image :src="subjectImg" mode=""></image>
				</view>
				<view class="header-right">
					<text class="sub-title">{{subjectData.title}}</text>
					<text class="sub-title-original">{{subjectData.original_title}}</text>
					<view class="sub-info">
						<text v-for="(item, index) in subjectData.countries" :key="index">{{index===subjectData.countries.length-1?item+'/ ':item+' '}}</text>
						<text v-for="(item, index) in subjectData.genres" :key="item">{{index===subjectData.genres.length-1?item+'/ ':item+' '}}</text>
						<text>{{subjectData.mainland_pubdate + '（中国大陆）上映/ '}}</text>
						<text>{{'片长'+subjectData.durations[0]}}</text>
					</view>

					<view class="sub-footer">
						<view class="sub-love-btn">
							<image src="@/static/images/detail/love.png" mode=""></image>
							<text>想看</text>
						</view>
						<view class="sub-seen-btn">
							<image src="@/static/images/detail/seen.png" mode=""></image>
							<text>看过</text>
						</view>
						<view class="sub-play-btn">
							<image src="@/static/images/detail/play.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="header-rate">
				<view class="header-rate-left">
					<text class="header-rate-title">豆瓣评分</text>
					<text class="header-rate-num" v-cloak>{{subjectData.rating.average}}</text>
					<cl-rate class="header-rate-view" :value="subjectData.rating.average/2" :size="26" :rateWidth="16" color="#44BB56"
					 disabled></cl-rate>
				</view>
				<view class="header-rate-right">

					<view v-for="(item,index) in rateList" :key="item.score">
						<view class="header-rate-line">
							<cl-rate class="rate-line" :value="item.score" :max="item.score" :size="16" :rateWidth="8" color="#686868"
							 disabled></cl-rate>
							<cl-progress class="progress-line" color="#686868" :sroke-width="8" :value="item.scale" :show-text="false"></cl-progress>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content" :style="{'height':contentHeight+'px'}">
			<cl-tabs v-model="tabIndex" type="swiper" :stickyTop="stickyTop" :labels="labels" @input="change">
				<template v-slot="{ index, item }">
					<view v-if="item.value===0" class="intro">
						<view class="summary">
							<text>{{item.data.summary}}</text>
						</view>
						<view class="classify">相关分类</view>
						<view class="tags">
							<scroll-view class="tags-scroll" scroll-x="true" scroll-with-animation>
								<view class="tags-box" v-for="item in item.data.tags" :key="item">
									{{item}}
								</view>
							</scroll-view>
						</view>

						<view class="content-title">演职员</view>
						<view class="cast-gallery">
							<scroll-view class="gallery-scroll" scroll-x="true" scroll-with-animation>
								<view class="gallery-item" v-for="item in item.data.directors" :key="item.id">
									<image :src="item.avatars.large" mode=""></image>
									<view class="g-name">{{item.name}}</view>
									<view class="g-info">导演</view>
								</view>
								<view class="gallery-item" v-for="item in item.data.casts" :key="item.id">
									<image :src="item.avatars.large" mode=""></image>
									<view class="g-name">{{item.name}}</view>
									<view class="g-info">演员</view>
								</view>
							</scroll-view>
						</view>
					</view>
					<!-- 					<view v-if="item.value===1" class="announce">
						<view class="announce-item" v-for="(item, index) in item.data" :key="item.id">
							<video :id="'video-'+index" :src="item.resource_url"></video>
							<image class="announce-postor" :src="item.medium" mode="" @click="videoPlay(index)"></image>
							<image class="play-btn" src="@/static/images/detail/play-v2.png" mode="" @click="videoPlay(index)"></image>
						</view>
					</view> -->
					<view v-if="item.value===1" class="review">
						<view class="review-item" v-for="item in item.data" :key="item.id">
							<view class="review-header">
								<image class="review-avatar" :src="item.author.avatar" mode=""></image>
								<view class="review-info">
									<view class="review-author">{{item.author.name}}</view>
									<cl-rate class="review-info-rate" :value="item.rating.value" :size="16" :rateWidth="8" color="#44BB56"
									 disabled></cl-rate>
								</view>
								<image class="review-more" src="@/static/images/detail/more.png" mode=""></image>
							</view>
							<view class="review-title">{{item.title}}</view>
							<view class="review-summary">{{item.summary}}</view>
							<view class="review-footer">
								<view>
									<image src="../../static/images/detail/useful.png" mode=""></image>
									<text>{{item.useful_count}}</text>
								</view>
								<view>
									<image src="../../static/images/detail/useless.png" mode=""></image>
									<text>{{item.useless_count}}</text>
								</view>
								<view>
									<image src="../../static/images/detail/comments.png" mode=""></image>
									<text>{{item.comments_count}}</text>
								</view>
								<text class="review-at">{{item.created_at}}</text>
							</view>
						</view>
					</view>
					<view v-if="item.value===2" class="comment">
						<view class="comment-item" v-for="item in item.data" :key="item.id">
							<view class="comment-header">
								<image :src="item.author.avatar" mode=""></image>
								<view class="comment-info">
									<view class="comment-author">{{item.author.name}}</view>
									<cl-rate class="comment-info-rate" :value="item.rating.value" :size="16" :rateWidth="8" color="#44BB56"
									 disabled></cl-rate>
								</view>
							</view>
							<view class="comment-summary">{{item.content}}</view>
							<view class="comment-footer">
								<view>
									<image src="../../static/images/detail/useful.png" mode=""></image>
									<text>{{item.useful_count}}</text>
								</view>
								<text class="comment-at">{{item.created_at}}</text>
							</view>
						</view>
					</view>
					<!-- 					<view v-if="item.value===4" class="other">
						<text>{{JSON.stringify(subjectData) + '-' + item.label}}</text>
					</view> -->
				</template>
			</cl-tabs>
		</view>
	</view>
</template>

<script>
	import clRate from '@/cool/ui/components/rate/rate.vue'
	import mockSubData from '@/data/subject.js'
	import mockReviewsData from '@/data/reviews.js'
	import mockCommentsData from '@/data/comments.js'
	import Request from '@/utils/luch-request/index.js'
	const http = new Request();
	export default {
		components: {
			clRate
		},
		data() {
			return {
				stickyTop: 0,
				summary: 'summary123',
				subjectData: '',
				subjectImg: '',
				rateList: '',
				reviewsData: '',
				reviewsHeight: 0,
				commentsData: '',
				commentsHeight: 0,
				introHeight: 0,
				contentHeight: 420,
				tabIndex: 0,
				labels: [{
						label: "简介",
						value: 0
					},
					// {
					// 	label: "预告",
					// 	value: 1
					// },
					{
						label: "影评",
						value: 1
					},
					{
						label: "讨论",
						value: 2
					}
				]
			}
		},
		async onLoad(options) {
			let __this = this;
			if (this.$apiSource === 0) {
				// 简介, /v2/movie/subject/:id
				this.subjectData = mockSubData.subject;
				// 影评, /v2/movie/subject/:id/reviews
				this.reviewsData = mockReviewsData.reviews.reviews;
				// 影评, /v2/movie/subject/:id/comments
				this.commentsData = mockCommentsData.comments.comments;
				this.handleData();
			} else {
				let subject = await http.get('https://douban-api.uieee.com/v2/movie/subject/' + options.id, {
					header: {
						"Content-Type": 'json'
					}
				});
				this.subjectData = subject.data;
			
				let reviews = await http.get('https://douban-api.uieee.com/v2/movie/subject/' + options.id + '/reviews', {
					header: {
						"Content-Type": 'json'
					}
				});
				this.reviewsData = reviews.data.reviews;
				let comments = await http.get('https://douban-api.uieee.com/v2/movie/subject/' + options.id + '/comments', {
					header: {
						"Content-Type": 'json'
					}
				});
				this.commentsData = comments.data.comments;
				
				this.handleData();
			}
		},
		methods: {
			handleData() {
				if (this.subjectData.images.large.indexOf("s_ratio_poster") > -1) {
					this.subjectImg = this.subjectData.images.large.replace("s_ratio_poster", "l_ratio_poster").replace(".webp",
						".jpg");
				}
				let rating = this.subjectData.rating;
				let sum = 0;
				let rateList = [];
				for (let score in rating.details) {
					sum += rating.details[score];
					rateList.push({
						score: parseInt(score),
						scale: rating.details[score]
					})
				}
				rateList.forEach(item => {
					item.scale = ((item.scale / sum) * 100).toFixed(1)
				})
				console.log('rateList', rateList);
				this.rateList = rateList.reverse();

				if (process.env.VUE_APP_PLATFORM === 'h5') {
					this.stickyTop = 80;
				} else {
					this.stickyTop = 0;
				}

				console.log('subjectData', this.subjectData);
				console.log('reviewsData', this.reviewsData);
				console.log('commentsData', this.commentsData);


				this.labels[0].data = this.subjectData;
				// this.labels[1].data = this.subjectData.trailers;
				this.labels[1].data = this.reviewsData;
				this.labels[2].data = this.commentsData;

				console.log("this.labels", this.labels);
			},
			change(index) {
				if (process.env.VUE_APP_PLATFORM === 'mp-weixin') {
					return;
				}
				// 动态切换 swiper 的高度, 小程序无效。。
				let __this = this;
				switch (index) {
					case 0:
						__this.contentHeight = 420;
						break;
						// case 1:
						// 	// __this.setSwiperHeight('.announce');
						// 	break;
					case 1:
						__this.setSwiperHeight('.review');
						break;
					case 2:
						__this.setSwiperHeight('.comment');
						break;
						// case 4:
						// 	__this.setSwiperHeight('.other');
						// 	break;
					default:
						break;
				}
			},
			setSwiperHeight(element) {
				let __this = this;
				setTimeout(() => {
					const query = uni.createSelectorQuery().in(__this);
					query.select(element).boundingClientRect(data => {
						__this.contentHeight = data.height;
					}).exec();
				}, 500);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './detail.scss'
</style>
