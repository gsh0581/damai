require(["../../static/conf/config.js"], function () {
	require(["jquery", "sw"], function ($, Swiper) {
		var jsonp53 ={};
		var ych ={};
		var category=[
			{
				href:"//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item:"ych",
				info:"演唱会"
			},
			{
				href:"//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item:"hjgj",
				info:"话剧歌剧"
			},
			{
				href:"//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item:"tyjj",
				info:"体育"
			},
			{
				href:"//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item:"qz",
				info:"儿童亲子"
			},
			{
				href:"//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item:"zlxx",
				info:"展览休闲"
			},
			{
				href:"//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item:"yyh",
				info:"音乐会"
			},
			{
				href:"//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item:"xsxq",
				info:"曲苑杂坛"
			},
			{
				href:"//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item:"wdbl",
				info:"舞蹈芭蕾"
			},
			{
				href:"//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item:"dm",
				info:"二次元"
			},
			{
				href:"//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item:"lyzl",
				info:"旅游展览"
			},
		]
		var restUrl= ["https://api-gw.damai.cn//search.html?cat=1&destCity=%E5%85%A8%E5%9B%BD&_ksTS=1558188816507_87",
		"https://api-gw.damai.cn//search.html?cat=3&destCity=%E5%85%A8%E5%9B%BD&_ksTS=1558188816512_101",
		"https://api-gw.damai.cn//search.html?cat=6&destCity=%E5%85%A8%E5%9B%BD&_ksTS=1558188816517_115",
		"https://api-gw.damai.cn//search.html?cat=100&destCity=%E5%85%A8%E5%9B%BD&_ksTS=1558188816519_129"
		]
		var content_list=
		
		[{"name":"演唱会","id":"1"},{"name":"话剧歌剧","id":"3"},{"name":"体育比赛","id":"6","link":"https://p.damai.cn/wow/pc/act/sports"},{"name":"儿童亲子","id":"100"}]
	
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
				dataType:'jsonp',
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
		$(".location-header").on('mousemove',function () {  
			$(".city-header").show();
		})
		$(".location-header").on('mouseout',function () {  
			$(".city-header").hide();
		})
			// 循环抓取首页
			for (let i = 0; i < 4; i++) {
				$.ajax({
					url: restUrl[i],
					dataType:'jsonp',
					type: "get",
					processData: false, 
					crossDomain: true,
					success: function (data) {
						var $res = render_content(data);
						$('.dm-content-wrap').append($res);
					},
				})
			}
			
		
		function render_category_item(index){
			var tpl = `<a href="${category[index].href}" class="category__list" data-spm="ditem_${index}">
						<span class="category__icon category__icon__${category[index].item}"></span>
							<p class="category__info">
							${category[index].info}
								</p>
						</a> `;
						return tpl;
		}
		(function render_category(){
			for (let i = 0; i < category.length; i++) {
				var $item = render_category_item(i);
				$('.category').append($item);
				}
		})()
		function render_content_item(data,index){
			if(index==0){
				var left_box = data;
				var tpl = `
				<a href="#" class="box-left" target="_blank" data-spm="ditem_0"">
				<img class="box-left__bg" src="${data.verticalPic}">
				<div class="box-left__info">
					<div class="title">${data.name}</div>
			<div class="details">¥${data.formattedPriceStr.slice(0,data.formattedPriceStr.indexOf('-'))}<span>起</span></div>
				</div>
			</a>`;

			}
			var tpl = `<div class="dm-content dm-content-1" data-spm="card_${item}" style="display: block;">
							<div class="head">
								<span class="head-title">${title}</span>
								<a href="//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&amp;order=1" target="_blank" data-spm="dviewall">
									<span class="head-more">查看全部</span>
								</a>
							</div>
							<div class="box">
							${left_box}
								<div class="box-right">
								${info_list}
								</div>
							</div>
						</div>`;

		}
		function render_content(data) {
			for (let i = 0; i < data.length; i++) {
				var $item = render_category_item(data[i],i);
			}
				
				var $result = 0;
			return $result;
		  }


})
})