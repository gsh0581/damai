require(["../../static/conf/config.js"], function () {
    require(["jquery"], function ($) {
       var tips=  [
           {
               
           }
       ];
        $.ajax({
            url: `https://detail.damai.cn/subpage?itemId=594441602010&dmChannel=pc@damai_pc&dataId=210041053&dataType=2&bizCode=ali.china.damai&scenario=itemsku&privilegeActId=&callback=jsonp88`,
            dataType:'jsonp',
            type: "get",
            jsonpCallback:"jsonp88",
            processData: false, 
            crossDomain: true,
            success: function (data) {
                   console.log(data );
               var res = data.detailViewComponentMap.itemSku;
               let title = `【北京】${res.itemTitle}【网上订票】- 大麦网`;
               $('title').html(title);
               res.itemTitle;
               res.performDesc;
               $('tips').next().attr("data-src",res.itemPic);
               $('.title').html(res.itemTitle);
               $('.time').html(`时间：${res.performName}`);
                $('.presell').html(`${res.performTagDesc?res.performTagDesc:''}`);
                $('.presell').next().html(res.performName);
                $('perform__desc__info__active').html(`<p>${res.performDesc}</p>`);
                for (let i = 0; i < res.skuList.length; i++) {
                    render_sku(res.skuList[i]);
                }
            },
        })
        function render_sku(data){
            let tpl = `<div class="select_right_list_item sku_item">
           <div class="skuname" >${data.skuName}</div></div>`;
            $('.sku').append(tpl);
        }
      
            $('.sku').on("click",'.sku_item',function(e){
                $(".sku").children().removeClass('active');
              $(this).addClass("active");
            })
          
      
    })
})