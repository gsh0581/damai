require(["../../static/conf/config.js"], function() {
    require(["jquery","vali","jq.cookie"], function($) {
        $(document).ready(function(){
			var status = $(".span-user").attr("status");
			if (status == 0 && $.cookie("people")!=undefined) {
				let cookieuser = JSON.parse($.cookie("people"));
				var valuename = cookieuser.user;
				if (valuename.length > 1) {
					$(".span-user").html(valuename);
					$(".span-user").attr("status", 1);
				}
				else {
					$(".span-user").html("登录");
				}

			}else{
                window.location.href="http://localhost:9999/pages/login/login.html"
            }
			
		})	
            //从cookie中获取plist
            if($.cookie("plist") !=null){
                    var plist_str = JSON.parse($.cookie("plist"));
                        $(".order-list-wrapper").css("display","block");
                        $(".next-row order-errors").css("display","none");
                        let plist = Array.from(plist_str);
                      
                        for (let i = 0; i < plist.length; i++) {
                            let tpl = `
                        <div class="next-col order-list-item" data-spm="item_${i}">
                        <div class="next-row order-list-item-header">订单号：${plist_str[i].orderNo}</div>
                        <div class="next-row order-list-item-bottom">
                            <div class="next-col project-name" style="width: 390px;">
                                <div class="next-row project-name-wrapper" data-spm="list">
                                    <div class="next-col next-col-4 project-name-img" data-spm="ditem_0">
                                        <img
                                            src="${plist_str[i].imgSrc}">
                                    </div>
                                    <div class="next-col project-name-content" data-spm="ditem_0">
                                        <div class="next-row project-name">${plist_str[i].pname}</div>
                                        <div class="next-row project-name-perform"><span>演出场次：2019.05.29
                                                19:35-22:00</span></div>
                                        <div class="next-row project-name-venue">演出场馆：工人体育场</div>
                                        <div class="next-row pick-type-icon undefined"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="next-col ticket-number" style="width: 144px;">
                                <div class="next-row ticket-number-wrapper"
                                    data-spm-anchor-id="a2oeg.orderlist.item_0.i0.1454YWFLYWFLtp">${plist_str[i].count}</div>
                            </div>
                            <div class="next-col order-amount" style="width: 130px;">
                                <div class="next-col order-amount-wrapper">
                                    <div class="next-row order-amount-content">¥${(parseInt(plist_str[i].price.match(/\d+/))+10).toFixed(2)}</div>
                                    <div class="next-row transportation-costs"
                                        data-spm-anchor-id="a2oeg.orderlist.item_0.i1.1454YWFLYWFLtp">
                                        (含运费￥10.00)</div>
                                </div>
                            </div>
                            <div class="next-col transaction-status" style="width: 130px;">
                                <div class="next-col transaction-status-wrapper">
                                    <div class="next-row transaction-status-content">待付款</div>
                                    <div class="next-row" data-spm="list"><a data-spm="ddetail_0"
                                            href="https://orders.damai.cn/orderDetail?orderId=280642148554630994">订单详情</a>
                                    </div>
                                </div>
                            </div>
                            <div class="next-col transaction-operation" style="width: 210px;">
                                <div class="next-col transaction-operation-wrapper">
                                    <div class="text-wrapper">
                                        <div class="next-row pick-seat-info" data-exp="true"
                                            within24="false" ic_id="588440306196" usercode="128605119"
                                            data-spm="dnotice" data-aplus-ae="1"
                                            data-spm-anchor-id="a2oeg.orderlist.item_0.dnotice.1454YWFLYWFLtp">
                                        </div>
                                    </div>
                                    <div class="cancel-order"><br>取消订单</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                    $(".next-loading-component").append(tpl);
                        }
                       
                    $(".order-errors").css("display","none");
                    }
                    
    })
})