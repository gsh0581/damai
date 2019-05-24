require(["../../static/conf/config.js"], function () {
    require(["jquery","jq.cookie","data"], function ($) {
        let itemId;
        let performTime;
        var tips = [
            {

            }
        ];
        $.ajax({
            url: `https://detail.damai.cn/subpage?itemId=594441602010&dmChannel=pc@damai_pc&dataId=210041053&dataType=2&bizCode=ali.china.damai&scenario=itemsku&privilegeActId=&callback=jsonp88`,
            dataType: 'jsonp',
            type: "get",
            jsonpCallback: "jsonp88",
            processData: false,
            crossDomain: true,
            success: function (data) {

                var res = data.detailViewComponentMap.itemSku;
                let title = `【北京】${res.itemTitle}【网上订票】- 大麦网`;
                $('title').html(title);
                res.itemTitle;
                res.performDesc;
                itemId = res.itemId;
                performTime=  res.performTime;
                $('tips').next().attr("data-src", res.itemPic);
                $('.order').find('.title').html(res.itemTitle);
                $('.time').html(`时间：${res.performName}`);
                $('.presell').html(`${res.performTagDesc ? res.performTagDesc : ''}`);
                $('.presell').next().html(res.performName);
                $('perform__desc__info__active').html(`<p>${res.performDesc}</p>`);
                let tpl = `
                <img data-v-49c1c56a="" src="https://damai-item.oss-cn-beijing.aliyuncs.com/projQcode/${res.itemId.substr(0, res.itemId.length - 2)}/2/${res.itemId}.jpg" alt="" class="service-qrcode-img">
                `;
                $('.service-qrcode').append(tpl);
                for (let i = 0; i < res.skuList.length; i++) {
                    render_sku(res.skuList[i]);
                }
            },
        })
        $(document).ready(function(){
			var status = $(".span-user").attr("status");
			if (status == 0) {
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
        function render_sku(data) {
            let tpl = `<div class="select_right_list_item sku_item">
           <div class="skuname" >${data.skuName}</div></div>`;
            $('.sku').append(tpl);
            if ($('.sku_item').length == 1) {
                $('.sku_item').addClass("active");
            }
            totalprice();
        }
        $('.sku').on("click", '.sku_item', function (e) {
            $(".sku").children().removeClass('active');
            $(this).addClass("active");
            totalprice();
        })
        $(document).ready(function(){
            var status = $(".span-user").attr("status");
            if (status == 0) {
                var valuename = $.cookie("name");
                if (valuename.length > 1) {
                    $(".span-user").html(valuename);
                    $(".span-user").attr("status", 1);
                }
                else {
                    $(".span-user").html("登录");
                }
        
            }
            
        })	
        $('.cafe-c-input-number-input').on('input propertychange', function () {
            var count = $(this).val();
            if (count > 6) {
                $(this).val(6);
            }
        })
        $('.cafe-c-input-number-handler-up').on("click", function (e) {

            var t = $('.cafe-c-input-number-input');

            t.val(parseInt(t.val()) + 1);
            if (parseInt(t.val()) > 1) {
                $('.cafe-c-input-number-handler-down').removeClass('cafe-c-input-number-handler-disabled');
            }
            var count = t.val();
            if (count > 6) {
                $(this).addClass('cafe-c-input-number-handler-disabled');
                t.val(6);
            }
            totalprice();
        })
        $('.cafe-c-input-number-handler-down').on("click", function (e) {
            var t = $('.cafe-c-input-number-input');

            t.val(parseInt(t.val()) - 1);
            if (parseInt(t.val()) <= 1) {
                console.log("!");
                $(this).addClass('cafe-c-input-number-handler-disabled');
                t.val(1);

            } else {
                $(this).removeClass('cafe-c-input-number-handler-disabled');
            }
            totalprice();
        })

        $(window).scroll(function () {
            var navH = $(".notice-nav").offset().top;
            var scroH = $(this).scrollTop();
            if (scroH >= navH) {
                $('.notice-nav-fixed').css('display', 'block');
            } else if (scroH < navH) {
                $('.notice-nav-fixed').css('display', 'none');
            }
        })
        function totalprice() {
            let count = $(".cafe-c-input-number-input").val();
            let price = $(".active").find(".skuname").text().match(/\d+/);
            let tpl = `<i>￥</i>${parseInt(price[0]) * parseInt(count)}.00`;

            $(".totol__price").html(tpl);

        }
        $(".buybtn").on("click", function () {
            let name = JSON.parse($.cookie("people")).user;
            var title = $('.order').find('.title').text();
            let count = $(".cafe-c-input-number-input").val();
            let imgsrc =  $('.poster').attr("data-src");
            if (name.length > 1) {
                let price = $(".totol__price").text();
                let outTradeNo = "";  //订单号
                for (let i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
                {
                    outTradeNo += Math.floor(Math.random() * 10);
                }
                outTradeNo = new Date().getTime() + outTradeNo;
                //将提取到商品信息,封装成一个对象
                let obj = {
                    "orderNo": outTradeNo,
                    "imgSrc":imgsrc,
                    "itemId":itemId,
                    "performTime":performTime,
                    "count":count,
                    "pname": title,
                    "price":price,
                }
                	//从cookie中获取plist
					let plist_str = $.cookie("plist");
					
                    let plist = null; 
                    
					if(plist_str == null) { //判断取出的cookie内容是否为空
                        plist = []; //如果为空,则表示第一次保存商品. 所以创建一个空数组
                       
					} else { //否则,则表示已经存过商品
						plist = JSON.parse( plist_str ); //将提取出来的字符串直接还原成对象 
                    }
                    	//判断数组中是否存在这个商品
					var isExist = plist.some(function(item){
						var res = item.itemId == obj.itemId;
						if(res) item.count++; //如果存在,则把商品数量+1
						return res;
					})
					
					if(!isExist) {//如果不存在
						plist.push(obj); //把刚才封装的对象,存入数组当中
					} 
					//把数组再一次转换为字符串,存入cookie当中
					$.cookie("plist", JSON.stringify(plist), { path: '/' });
            }
        })
    })



})