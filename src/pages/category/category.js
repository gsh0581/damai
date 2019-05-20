require(["../../static/conf/config.js"], function () {
    require(["jquery"], function ($) {
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
            {
				href:"//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
				item:"lyyy",
				info:"旅游演艺"
			},
        ]
    var tpl;
        // $.ajax({
        //     url: `https://api-gw.damai.cn/cityList.html?_ksTS=1558163181541_52`,
        //     dataType:'jsonp',
        //     type: "get",
        //     processData: false, 
        //     crossDomain: true,
        //     success: function (data) {
               
        //         for (const key in data.allCities) {
                   
        //             if( data.allCities[key] == "境外"){
        //                 break;
        //             }
        //             tpl = ` <span class="factor-content-item" >${data.allCities[key]} </span>`;
        //              $('.city').append(tpl);
        //         }
        //         $('.city').children().slice(19,-1).toggle();
        //     },
        // })
        var $fold =  $('.city').next(); 
        
        $fold.on("click",function(){
            if($fold.hasClass("factor-more")){
                $fold.html("收起");
                $fold.removeClass("factor-more");
                $fold.addClass("factor-less");   
                $('.city').children().slice(20).toggle();

            }else {
                $fold.html("更多");
                $fold.removeClass("factor-less"); 
                $fold.addClass("factor-more");
                $('.city').children().slice(20).toggle();
            }
        })
        for (let i = 0; i < category.length; i++) {
            tpl  = `<span class="factor-content-item" >${category[i].info} </span>`;
            $(".category").append(tpl);
        }
        $.ajax({
            url: "https://search.damai.cn/searchajax.html?keyword=&cty=&ctl=&sctl=&tsg=0&st=&et=&order=1&pageSize=30&currPage=1&tn=",
            type: "get",
            dataType:'json',
            success:function (data) {  
                var result  =data.pageData.resultData;
                for (let i = 0; i < result.length; i++) {
                    renderItem(result[i],i);
                }
                var city = data.pageData.factMap.cityname;
                for (let i = 0; i < city.length; i++) {
                  tpl = ` <span class="factor-content-item" >${ city[i].name} </span>`;
                    $('.city').append(tpl);
                }
                
                $('.city').children().slice(20).toggle();
                    console.log(data);
                   $('.search-box-keyword').html(data.pageData.totalResults);
            }
        })
       function renderItem(data){
           tpl = `
           <div data-v-678d2ef7="" class="items">
           <a data-v-678d2ef7="" href="//detail.damai.cn/item.htm?id=594441602010&amp;clicktitle=UNINE%E7%B2%89%E4%B8%9D%E8%A7%81%E9%9D%A2%E4%BC%9A%E2%80%9CRUN%20TO%20U%E2%80%9D%E5%8C%97%E4%BA%AC%E7%AB%99" target="_blank" class="items__img">
               <span data-v-678d2ef7="" class="items__img__tag">${data.categoryname}</span>
               <img data-v-678d2ef7="" alt="项目图片" data-src="//img.alicdn.com/bao/uploaded/i4/2251059038/O1CN01cPCWOe2GdSAdmixz2_!!0-item_pic.jpg_q60.jpg_.webp" src="${data.verticalPic}" lazy="loaded">
           </a>
           <div data-v-678d2ef7="" class="items__txt">
               <div data-v-678d2ef7="" class="items__txt__title">
                   <span data-v-678d2ef7="">【${data.cityname}】</span>
                   <a data-v-678d2ef7="" href="//detail.damai.cn/item.htm?spm=a2oeg.search_category.0.0.16954d156XGYEl&amp;id=594441602010&amp;clicktitle=UNINE%E7%B2%89%E4%B8%9D%E8%A7%81%E9%9D%A2%E4%BC%9A%E2%80%9CRUN%20TO%20U%E2%80%9D%E5%8C%97%E4%BA%AC%E7%AB%99" target="_blank" data-spm-anchor-id="a2oeg.search_category.0.0">${data.name}
                   </a>
               </div>
               <!---->
               <div data-v-678d2ef7="" class="items__txt__time">
                   <a data-v-678d2ef7="" href="javascript:;" class="items__txt__venue__icon"></a>
                   ${data.venuecity} | ${data.venue}
               </div>
               <div data-v-678d2ef7="" class="items__txt__time">
                   <a data-v-678d2ef7="" href="javascript:;" class="items__txt__time__icon"></a>
                  ${data.showtime}
               </div>
               <div data-v-678d2ef7="" class="items__txt__tags">
                   <!---->
                   <!---->
               </div>
               <div data-v-678d2ef7="" class="items__txt__price"><span data-v-678d2ef7="">
                       ${data.price_str}
                       <i data-v-678d2ef7="">元</i></span>
                  ${data.showstatus}
               </div>
           </div>
       </div>`
        $('.item__box').append(tpl);
       };



    })
})