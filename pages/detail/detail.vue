<template>
	<view>
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
					<text class="header-rate-num">{{subjectData.rating.average}}</text>
					<cl-rate class="header-rate-view" :value="8.4/2" :size="26" :rateWidth="16" color="#44BB56" disabled></cl-rate>
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
		<view class="content">
			
		</view>
	</view>
</template>

<script>
	import mockData from '@/data/subject.js'
	export default {
		components: {

		},
		data() {
			return {
				subjectData: '',
				subjectImg: '',
				rateList: ''
			}
		},
		async onLoad(options) {
			console.log('subject_id', options.id);
			this.subjectData = mockData.subject;
			console.log('subjectData', this.subjectData);
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
		}
	}
</script>

<style lang="scss">
	@import './detail.scss'
</style>
