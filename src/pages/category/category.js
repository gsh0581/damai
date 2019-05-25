require(["../../static/conf/config.js"], function () {
    require(["jquery"], function ($) {
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
            {
                href: "//search.damai.cn/search.htm?ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&order=1&cty=",
                item: "lyyy",
                info: "旅游演艺"
            },
        ]
        var tpl;
        var cities='';
        $(document).ready(function () {
            var status = $(".span-user").attr("status");
            if (status == 0 && $.cookie("people") != undefined) {
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
        var $fold = $('.city').next();

        $fold.on("click", function () {
            if ($fold.hasClass("factor-more")) {
                $fold.html("收起");
                $fold.removeClass("factor-more");
                $fold.addClass("factor-less");
                $('.city').children().slice(20).toggle();

            } else {
                $fold.html("更多");
                $fold.removeClass("factor-less");
                $fold.addClass("factor-more");
                $('.city').children().slice(20).toggle();
            }
        })
        
        $(".factor-content").on("click",'.factor-content-item',function(){
            if($(this).parent().classname = 'city'){
                $('.city').prev().removeClass("factor-content-item-active");
                $(this).parent().children().removeClass("factor-content-item-active");
                $(this).addClass("factor-content-item-active");
                cities = $(this).text();
                $(".factor-selected-city").text($(this).text());
                ajaxData();
            }
        })
        $('.city').prev().on("click",function(){
            $('.city').children().removeClass("factor-content-item-active");
            $(".factor-selected-city").text("全国");
            cities = '';
            ajaxData();
        })
        function ajaxData(){
           
            $.ajax({
                url: `https://search.damai.cn/searchajax.html?keyword=&cty=${cities}&ctl=&sctl=&tsg=0&st=&et=&order=1&pageSize=30&currPage=1&tn=`,
                type: "get",
                dataType: 'json',
                success: function (data) {
                    var result = data.pageData.resultData;
                    var categoryname = data.pageData.factMap.categoryname.concat(data.pageData.factMap.tag_names);
                    $(".category").html('');
                    for (let i = 0; i < categoryname.length; i++) {
                        tpl = `<span class="factor-content-item" >${category[i].info} </span>`;
                        $(".category").append(tpl);
                    }
                    $('.item__box').html('');
                    for (let i = 0; i < result.length; i++) {
                        renderItem(result[i]);
                    }
                    $('.search-box-keyword').html(data.pageData.totalResults);
                }
            })  
        }
        $.ajax({
            url: `https://search.damai.cn/searchajax.html?keyword=&cty=&ctl=&sctl=&tsg=0&st=&et=&order=1&pageSize=30&currPage=1&tn=`,
            type: "get",
            dataType: 'json',
            success: function (data) {
                var result = data.pageData.resultData;
                for (let i = 0; i < result.length; i++) {
                    renderItem(result[i]);
                }
                var city = data.pageData.factMap.cityname;
                for (let i = 0; i < city.length; i++) {
                    tpl = ` <span class="factor-content-item" >${city[i].name} </span>`;
                    $('.city').append(tpl);
                }
                var categoryname = data.pageData.factMap.categoryname.concat(data.pageData.factMap.tag_names);
                $(".category").html('');
                    for (let i = 0; i < categoryname.length; i++) {
                        tpl = `<span class="factor-content-item" >${category[i].info} </span>`;
                        $(".category").append(tpl);
                    }
                $('.city').children().slice(20).toggle();

                $('.search-box-keyword').html(data.pageData.totalResults);
            }
        })
        function renderItem(data) {
            tpl = `
           <div data-v-678d2ef7="" class="items">
           <a data-v-678d2ef7="" href="http://localhost:9999/pages/product/product.html?id=${data.projectid}&venue=${data.venue}&city=${data.venuecity}" target="_blank" class="items__img">
               <span data-v-678d2ef7="" class="items__img__tag">${data.categoryname}</span>
               <img data-v-678d2ef7="" alt="项目图片" data-src="//img.alicdn.com/bao/uploaded/i4/2251059038/O1CN01cPCWOe2GdSAdmixz2_!!0-item_pic.jpg_q60.jpg_.webp" src="${data.verticalPic}" lazy="loaded">
           </a>
           <div data-v-678d2ef7="" class="items__txt">
               <div data-v-678d2ef7="" class="items__txt__title">
                   <span data-v-678d2ef7="">【${data.cityname}】</span>
                   <a data-v-678d2ef7="" href="http://localhost:9999/pages/product/product.html?id=${data.projectid}&venue=${data.venue}&city=${data.venuecity}" target="_blank" >${data.name}
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
        
        $.ajax({
            url: "https://search.damai.cn/external/gl.html?projects=594441602010,594350362632,594277459855,594088796138,592432015785,593992948825,593451401607,593756817833,593516280422,594538993658,593071617586,593615326552,594345563975,177014,594262939151,593960612221,592773319724,594266977600,592009864267,594650710773,593227496518,592029157846,593425703047,593234362451,593566033575,594041756268,592712478175,592880144508,592694878429,593155803884&ctl=",
            type: "get",
            dataType: 'json',
            success: function (data) {
                var suggest = data.suggest;
                for (let i = 0; i < 3; i++) {
                    renderSuggest(suggest[i]);
                }
            }

        })
        function renderSuggest(data) {
            tpl = `
        <div class="search__item">
	<a href="http://localhost:9999/pages/product/product.html?id=${data.projectId}" target="_blank" data-spm="test" class="search__item__poster">
		<img src="${data.verticalPic}" alt="">
	</a> 
	<div class="search__item__info">
			<a href="http://localhost:9999/pages/product/product.html?id=${data.projectId}" target="_blank" class="search__item__info__title">《${data.projectName}》</a> 
		<div class="search__item__info__venue">${data.venue}</div>
		 <div class="search__item__info__venue">${data.showTime}</div> 
		 <div class="search__item__info__price"><strong>${data.price}元</strong>起
        </div>
    </div>
</div>
        `;
            $(".search__box").append(tpl);

        }
    })
})