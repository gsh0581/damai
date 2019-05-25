require(["../../static/conf/config.js"], function () {
	require(["jquery", "sw", "jq.cookie",], function ($, Swiper) {
		var jsonp53 = {};
		var content = {};
		var category = [
			{
				href: "//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item: "ych",
				info: "演唱会"
			},
			{
				href: "//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item: "hjgj",
				info: "话剧歌剧"
			},
			{
				href: "//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item: "tyjj",
				info: "体育"
			},
			{
				href: "//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item: "qz",
				info: "儿童亲子"
			},
			{
				href: "//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item: "zlxx",
				info: "展览休闲"
			},
			{
				href: "//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item: "yyh",
				info: "音乐会"
			},
			{
				href: "//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item: "xsxq",
				info: "曲苑杂坛"
			},
			{
				href: "//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item: "wdbl",
				info: "舞蹈芭蕾"
			},
			{
				href: "//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item: "dm",
				info: "二次元"
			},
			{
				href: "//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item: "lyzl",
				info: "旅游展览"
			},
		]
		var restUrl = ["https://api-gw.damai.cn//search.html?cat=1&destCity=%E5%85%A8%E5%9B%BD&_ksTS=1558188816507_87",
			"https://api-gw.damai.cn//search.html?cat=3&destCity=%E5%85%A8%E5%9B%BD&_ksTS=1558188816512_101",
			"https://api-gw.damai.cn//search.html?cat=6&destCity=%E5%85%A8%E5%9B%BD&_ksTS=1558188816517_115",
			"https://api-gw.damai.cn//search.html?cat=100&destCity=%E5%85%A8%E5%9B%BD&_ksTS=1558188816519_129"
		]
		var content_list = [{ "name": "演唱会", "id": "1" }, { "name": "话剧歌剧", "id": "3" }, { "name": "体育比赛", "id": "6", "link": "https://p.damai.cn/wow/pc/act/sports" }, { "name": "儿童亲子", "id": "100" }]
		$(document).ready(function(){
			var status = $(".span-user").attr("status");
			if (status == 0 && $.cookie("people")!='') {
				let cookieuser = JSON.parse($.cookie("people"));
				var valuename = cookieuser.user;
				if (valuename.length > 1) {
					$(".span-user").html(valuename);
					$(".span-user").attr("status", 1);
				}
				else {
					$(".span-user").html("登录");
				}

			}
			
		})	
		var tpl;
		var mySwiper = new Swiper('.swiper-container', {
			autoplay: true,//等同于以下设置
			loop: true, // 循环模式选项
			spaceBetween: 30,
			effect: 'fade',
			// 如果需要分页器
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			// 如果需要前进后退按钮
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			}
		})
		// 抓取城市
		$.ajax({
			url: `https://api-gw.damai.cn/cityList.html?_ksTS=1558163181541_52`,
			dataType: 'jsonp',
			type: "get",
			processData: false,
			crossDomain: true,
			success: function (data) {

				for (const key in data.hotCities) {
					tpl = `<span class="name-city" data-spm="dselectcity&amp;clicktitle=${data.hotCities[key]}">${data.hotCities[key]}</span>`
					$('.hot-city').children(".list-other").append(tpl);
				}
				for (const key in data.allCities) {
					tpl = `<span class="name-city" data-spm="dselectcity&amp;clicktitle=${data.allCities[key]}">${data.allCities[key]}</span>`
					$('.other-city').children(".list-other").append(tpl);
				}

			},
		})
		
		$(".location-header").on('mousemove', function () {
			$(".city-header").show();
		})
		$(".location-header").on('mouseout', function () {
			$(".city-header").hide();
		})
		$(".out-login").on("click",function(){
			$.cookie('people', '',{ path: '/' });
			$.cookie('plist', '',{ path: '/' });
		
		})
		// 循环抓取首页
		for (let i = 0; i < content_list.length; i++) {
			var tpl = `<div class="dm-content dm-content-${content_list[i].id}" data-spm="card_${i}" style="display: block;">
							<div class="head">
								<span class="head-title">${content_list[i].name}</span>
								<a href="//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&amp;order=1" target="_blank" data-spm="dviewall">
									<span class="head-more">查看全部</span>
								</a>
							</div>
							<div class="box">
							<div class="box-right">
							</div>
							</div>
						</div>`;
			$('.dm-content-wrap').append(tpl);
			$.ajax({
				url: restUrl[i],
				dataType: 'jsonp',
				type: "get",
				processData: false,
				crossDomain: true,
				success: function (res) {
					render_content_left(res.data[0], i);
					render_content_right(res.data, i)
				},
			})
		}
		function render_category_item(index) {
			var tpl = `<a href="${category[index].href}" class="category__list" data-spm="ditem_${index}">
						<span class="category__icon category__icon__${category[index].item}"></span>
							<p class="category__info">
							${category[index].info}
								</p>
						</a> `;
			return tpl;
		}
		(function render_category() {
			for (let i = 0; i < category.length; i++) {
				var $item = render_category_item(i);
				$('.category').append($item);
			}
		})();
		function render_content_right(data, i) {

			for (let index = 1; index < data.length; index++) {

				var tpl = `
			<a href="http://localhost:9999/pages/product/product.html?id=${data[index].id}" class="box-right__item" data-spm="ditem_${index}" target="_blank">
				<div class="itemimg">
					<img src="${data[index].verticalPic}">
				</div>
				<div class="iteminfo">
					<div class="title" title="${data[index].name}">${data[index].name}</div>
					<div class="venue">${data[index].venueName}</div>
					<div class="showtime">${data[index].showTime}</div>
					<div class="price">¥${data[index].formattedPriceStr.slice(0, data[index].formattedPriceStr.indexOf('-'))}<span>起</span></div>
				</div>
			</a>`;
				$(`[data-spm=card_${i}]`).children().children('.box-right').append(tpl);
			}
		}

		// $(`[data-spm=card_${i}]`).children('.box').children('.box-right').append(tpl);

		// }
		function render_content_left(data, i) {
			var tpl = `
				<a href="#" class="box-left" target="_blank" data-spm="ditem_"${i}">
				<img class="box-left__bg" src="${data.verticalPic}">
				<div class="box-left__info">
					<div class="title">${data.name}</div>
				<div class="details">¥${data.formattedPriceStr.slice(0, data.formattedPriceStr.indexOf('-'))}<span>起</span></div>
				</div>
			</a>`;
			$(`[data-spm=card_${i}]`).children('.box').prepend(tpl);

		}


	})
})