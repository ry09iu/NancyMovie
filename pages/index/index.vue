<template>
	<view class="container">
		<view class="header" :style="{'padding-top':headerPaddingTop + 'px'}">
			<cl-search v-model="val1" placeholder="搜索图片、文章、链接" @search="onSearch" :show-search-button="false">
			</cl-search>
			<view class="header-swiper" :style="{'height':headerSwiperHeight}">
				<bw-swiper :swiperList="swiperList" style="width:100%" swiperType w_h="0.675" :previousMargin="previousMargin"
				 :nextMargin="nextMargin" @clickItem="showDetail"></bw-swiper>
			</view>
		</view>

		<view class="content">
			<view class="hot-line">
				<!-- <cl-rate class="footer-rate" :value="5.6" size="32" color="#F9b513" show-text disabled></cl-rate> -->
			</view>
		</view>
	</view>
</template>

<script>
	import bwSwiper from '@/wxcomponents/bw-swiper/bw-swiper.vue'
	import Request from '@/utils/luch-request/index.js'
	import mockData from '@/data/in_theaters.js'
	const http = new Request();
	export default {
		components: {
			bwSwiper
		},
		data() {
			return {
				headerPaddingTop: 0,
				headerSwiperHeight: '100%',
				val1: "",
				nextMargin: '36px',
				previousMargin: '36px',
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				swiperList: []
			}
		},
		async onLoad() {
			this.getWindowHeight();
			if (this.$apiSource === 0) {
				this.handleData(mockData.inTheatersList.subjects);
			} else {
				let subjects = await http.get('https://douban-api.uieee.com/v2/movie/in_theaters', {
					header: {
						"Content-Type": 'json'
					}
				});
				console.log("subjects", subjects)
				this.handleData(subjects.data.subjects);
			}
		},
		methods: {
			handleData(list) {
				let swiperData = [];
				list.forEach((item) => {
					if (item.images.large.indexOf("s_ratio_poster") > -1) {
						item.images.large = item.images.large.replace("s_ratio_poster", "l_ratio_poster").replace(".webp", ".jpg");
					}
					swiperData.push({
						id: item.id,
						img: item.images.large,
						text: item.title,
						rating: item.rating.average,
						genres: item.genres,
						durations: item.durations,
						pubdates: item.pubdates
					})
				})
				this.swiperList = swiperData;
			},
			showDetail(item) {
				uni.navigateTo({
					url: "/pages/detail/detail?id=" + item.id
				});
			},
			getWindowHeight() {
				let _this = this;
				uni.getSystemInfo({
					success(res) {
						let h = 70;
						if (res.windowHeight > 700) {
							let top = (res.windowHeight - 700) / 2;
							if (res.windowHeight > 750) {
								top = 25;
							}
							_this.headerPaddingTop = top;
							h += top;
						}
						_this.headerSwiperHeight = res.windowHeight - h + 'px';
						const width = (res.windowHeight - 100) * 0.675;
						const margin = (res.windowWidth - width) / 2;
						_this.nextMargin = margin > 0 ? margin + 'px' : '0px';
						_this.previousMargin = _this.nextMargin;
					}
				});
			}
		}
	}
</script>

<style>
	.container {
		font-size: 14px;
		line-height: 24px;
	}

	.cl-search {
		padding: 14upx 50upx !important;
	}

	.header-swiper {
		display: flex;
		align-items: center;
		width: 100%;
	}
</style>
