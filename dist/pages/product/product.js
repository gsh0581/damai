"use strict";require(["../../static/conf/config.js"],function(){require(["jquery","jq.cookie"],function(p){var m,u;function c(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:window.location.href,n=new RegExp("[?&]"+e+"=([^&]+)","g").exec(t),a=null;if(null!=n)try{a=decodeURIComponent(decodeURIComponent(n[1]))}catch(e){try{a=decodeURIComponent(n[1])}catch(e){a=n[1]}}return a}function r(e){var t='<div class="select_right_list_item sku_item">\n           <div class="skuname" >'.concat(e.skuName,"</div></div>");1==e.skuTagType&&(t='<div class="select_right_list_item sku_item">\n             <span class="notticket">'.concat(e.skuTag,'</span>\n            <div class="skuname" >').concat(e.skuName,"</div></div>")),p(".sku").append(t),1==p(".sku_item").length&&p(".sku_item").addClass("active"),p(".sku_item.active").has(".notticket").length?(p(".buybtn").html("提交缺货登记"),p(".buybtn").attr("type","button"),p(".perform__order__price").css("display","none")):(p(".buybtn").html("立即预定"),p(".perform__order__price").css("display","flex"),p(".buybtn").attr("type","submit")),n()}function n(){var e=p(".cafe-c-input-number-input").val(),t=p(".active").find(".skuname").text().match(/\d+/),n="<i>￥</i>".concat(parseInt(t[0])*parseInt(e),".00");p(".totol__price").html(n)}p.ajax({url:"https://detail.damai.cn/subpage?itemId=".concat(c("id"),"&dmChannel=pc@damai_pc&dataType=2&bizCode=ali.china.damai&scenario=itemsku&privilegeActId=&callback=jsonp88"),dataType:"jsonp",type:"get",jsonpCallback:"jsonp88",processData:!1,crossDomain:!0,success:function(e){var t=e.detailViewComponentMap.itemSku,n="【".concat(c("city"),"】").concat(t.itemTitle,"【网上订票】- 大麦网");p("title").html(n),m=t.itemId,u=t.performTime||t.itemPerforms[0].performs[0],p(".poster").attr("src",t.itemPic),p(".order").find(".title").html("【".concat(c("city"),"】").concat(t.itemTitle)),p(".addr").html("场馆：".concat(c("city")," | ").concat(c("venue"))),p(".time").html("时间：".concat(t.performName?t.performName:t.itemPerforms[0].performs[0].performName)),p(".presell").html("".concat(t.performTagDesc?t.performTagDesc:"")),p(".presell").next().html(t.performName?t.performName:t.itemPerforms[0].performs[0].performName),p("perform__desc__info__active").html("<p>".concat(t.performDesc?t.performDesc:t.itemPerforms[0].performs[0].performDesc,"</p>"));var a='\n                <img data-v-49c1c56a="" src="https://damai-item.oss-cn-beijing.aliyuncs.com/projQcode/'.concat(c("id").substr(0,c("id").length-2),"/2/").concat(c("id"),'.jpg" alt="" class="service-qrcode-img">\n                ');p(".service-qrcode").append(a);for(var i=0;i<t.skuList.length;i++)r(t.skuList[i])}}),p(document).ready(function(){if(0==p(".span-user").attr("status")&&null!=p.cookie("people")){var e=JSON.parse(p.cookie("people")).user;1<e.length?(p(".span-user").html(e),p(".span-user").attr("status",1)):p(".span-user").html("登录")}}),p(".sku").on("click",".sku_item",function(e){p(".sku").children().removeClass("active"),p(this).addClass("active"),p(this).has(".notticket").length?(p(".buybtn").html("提交缺货登记"),p(".buybtn").attr("type","button"),p(".perform__order__price").css("display","none")):(p(".buybtn").html("立即预定"),p(".perform__order__price").css("display","flex"),p(".buybtn").attr("type","submit")),n()}),p(".cafe-c-input-number-input").on("input propertychange",function(){6<p(this).val()&&p(this).val(6)}),p(".cafe-c-input-number-handler-up").on("click",function(e){var t=p(".cafe-c-input-number-input");t.val(parseInt(t.val())+1),1<parseInt(t.val())&&p(".cafe-c-input-number-handler-down").removeClass("cafe-c-input-number-handler-disabled"),6<t.val()&&(p(this).addClass("cafe-c-input-number-handler-disabled"),t.val(6)),n()}),p(".cafe-c-input-number-handler-down").on("click",function(e){var t=p(".cafe-c-input-number-input");t.val(parseInt(t.val())-1),parseInt(t.val())<=1?(p(this).addClass("cafe-c-input-number-handler-disabled"),t.val(1)):p(this).removeClass("cafe-c-input-number-handler-disabled"),n()}),p(window).scroll(function(){var e=p(".notice-nav").offset().top,t=p(this).scrollTop();e<=t?p(".notice-nav-fixed").css("display","block"):t<e&&p(".notice-nav-fixed").css("display","none")}),p(".toast-btn").on("click",function(){p(".toast").css("display","none")}),p(".buybtn").on("click",function(){"button"==p(this).attr("type")&&p(".toast").css("display","flex");var e=JSON.parse(p.cookie("people")).user,t=p(".order").find(".title").text(),n=p(".cafe-c-input-number-input").val(),a=p(".poster").attr("src");if(1<e.length){for(var i=p(".totol__price").text(),c="",r=0;r<6;r++)c+=Math.floor(10*Math.random());var s={orderNo:c=(new Date).getTime()+c,imgSrc:a,itemId:m,performTime:u,count:n,pname:t,price:i},o=p.cookie("plist"),l=null;(l=null==o?[]:JSON.parse(o)).some(function(e){var t=e.itemId==s.itemId;return t&&e.count++,t})||l.push(s),p.cookie("plist",JSON.stringify(l),{path:"/"})}})})});