<template>
	<view class="container">
		<view class="header">
			<cl-search v-model="val1" placeholder="搜索图片、文章、链接" @search="onSearch" :show-search-button="false">
			</cl-search>
			<bw-swiper :swiperList="swiperList" style="width:100%" swiperType w_h="0.675"></bw-swiper>
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
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				swiperList: [{
					img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
					text: '加油'
				}, {
					img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
					text: '加油1'
				}, {
					img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
					text: '加油2'
				}]
			}
		},
		created: function() {
			let list = mockData.inTheatersList.subjects;
			let swiperData = [];
			list.forEach((item) => {
				if (item.images.large.indexOf("s_ratio_poster") > -1) {
					item.images.large = item.images.large.replace("s_ratio_poster", "l_ratio_poster");
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
			console.log(swiperData);
			// swiperData.push({
			// 	img: "https://img9.doubanio.com/view/photo/l/public/p2578705064.webp",
			// 	img2: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2578705064.webp"
			// 	text: "text2"
			// })
			this.swiperList = swiperData;
			// http.get('https://douban-api.uieee.com/v2/movie/in_theaters', {
			// 	header: {
			// 		"Content-Type": 'json'
			// 	}
			// }).then(res => {
			// 	console.log('res', res);
			// 	let list = res.data.subjects;
			// 	let swiperData = [];
			// 	list.forEach((item) => {
			// 		swiperData.push({
			// 			img: item.images.large,
			// 			text: item.title
			// 		})
			// 	})
			// 	console.log(swiperData);
			// 	this.swiperList = swiperData;
			// });
		},
		methods: {

		}
	}
</script>

<style>
	.container {
		font-size: 14px;
		line-height: 24px;
	}
	
	.cl-search {
		padding: 7px 18px !important;
	}
</style>
