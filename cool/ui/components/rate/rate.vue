<template>
	<view class="cl-rate">
		<view class="cl-rate__text cl-rate__text-left" v-if="showLeftText">
			{{ value2 * 2 }}
		</view>
		
		<view class="cl-rate__icon" v-for="(item, index) in list" :key="index" @tap="onTap(index)" :style="{'width':rateWidth+'px !important'}">
			<cl-icon :name="icon" :size="size" :color="voidColor"></cl-icon>

			<view class="cl-rate__icon-active" :style="{
					width: item.width
				}">
				<cl-icon :name="icon" :size="size" :color="item.color"></cl-icon>
			</view>
		</view>

		<view class="cl-rate__text" v-if="showText">
			{{ value2 * 2 }}
		</view>
	</view>
</template>

<script>
	import {
		isNumber,
		getCurrentColor
	} from '../../utils';

	export default {
		props: {
			icon: {
				type: String,
				default: 'cl-icon-favor-fill'
			},
			color: {
				type: [String, Array],
				default: '#409EFF'
			},
			voidColor: {
				type: String,
				default: '#C6D1DE'
			},
			size: {
				type: [Number, String],
				default: 40
			},
			value: {
				type: [Number, String],
				default: 0
			},
			max: {
				type: [Number, String],
				default: 5
			},
			disabled: {
				type: [Boolean, String],
				default: false
			},
			showText: {
				type: Boolean,
				default: false
			},
			showLeftText: {
				type: Boolean,
				default: false
			},
			rateWidth: {
				type: [Number, String],
				default: 10
			}
		},
		data() {
			return {
				value2: 0
			};
		},
		watch: {
			value: {
				immediate: true,
				handler(val) {
					this.value2 = val;
				}
			}
		},
		computed: {
			list() {
				return new Array(this.max).fill(1).map((e, i) => {
					let int = parseInt(this.value2);
					let dec = this.value2 - int;

					return {
						width: (this.value2 > i ? (int > i ? 100 : dec * 100) : 0) + '%',
						color: getCurrentColor({
							value: this.value2,
							color: this.color,
							max: this.max
						})
					};
				});
			}
		},
		methods: {
			onTap(index) {
				if (this.disabled) {
					return false;
				}

				this.value2 = index + 1;

				this.$emit('input', this.value2);
				this.$emit('change', this.value2);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.cl-rate {
		display: flex;
		align-items: center;

		&__icon {
			display: flex;
			align-items: center;
			position: relative;
			margin-right: 10rpx;
			// width: 12px !important;

			cl-icon {
				display: flex;
				align-items: center;
			}
		}

		&__icon-active {
			display: flex;
			align-items: center;
			position: absolute;
			top: 0;
			left: 0;
			overflow: hidden;

			cl-icon {
				display: flex;
				align-items: center;
			}
		}

		&__text {
			font-size: 26rpx;
			margin-left: 10rpx;
			color: #44BB56;
			font-weight: bolder;
		}
	}
</style>
