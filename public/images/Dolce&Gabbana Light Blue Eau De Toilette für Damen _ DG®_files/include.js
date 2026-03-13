// Dolce and Gabbana
var _inside = _inside || [];
// var _inside = [];
var _insideLoaded = _insideLoaded || false;
var _insideJQ = _insideJQ || null;
window._insideViewUpdate = window._insideViewUpdate || function () { };

(function () {
    if (_insideLoaded) {
        window._insideViewUpdate();
        return;
    }
    _insideLoaded = true;

    var accountKey = "IN-1001106";
    var trackerURL = "eu4-cdn.inside-graph.com";
    var subsiteId = null;
    var insideOrderTotal = insideOrderTotal || 0;
    var _insideMaxLoop = 350;
    var _insideCurLoop = 0;
    var _insideFirstLoad = false;
    var _insideCurrency = null;
    var _insideDataLayer = null;
    var _insideDataLayer2 = null;
    var _insideCurUrl = window.location.href;
    var _insideProdUrl = "";
    var _insideCurPageType = "other";

    // Utility Functions
    function log() {
        if (typeof (console) != "undefined" && typeof (console.log) != "undefined") {
            // console.log("[INSIDE]", Array.prototype.slice.call(arguments));
        }
    }

    var hashJoaat = function (b) { for (var a = 0, c = b.length; c--;)a += b.charCodeAt(c), a += a << 10, a ^= a >> 6; a += a << 3; a ^= a >> 11; return ((a + (a << 15) & 4294967295) >>> 0).toString(16) };

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    function deferWait(callback, test) {
        if (test()) {
            callback();
            return;
        }
        var _interval = 10;
        var _spin = function () {
            if (test()) {
                callback();
            }
            else {
                _interval = _interval >= 1000 ? 1000 : _interval * 2;
                setTimeout(_spin, _interval);
            }
        };
        setTimeout(_spin, _interval);
    }

    function keepWait(callback, test) {
        if (test()) {
            callback();
            if (_insideCurLoop >= _insideMaxLoop) {
                return;
            }
        }
        var _interval = 3000;
        var _spin = function () {
            if (test()) {
                _insideCurLoop = _insideCurLoop + 1;
                callback();
                if (_insideCurLoop >= _insideMaxLoop) {
                    return;
                }
            }
            setTimeout(_spin, _interval);
        };
        setTimeout(_spin, _interval);
    }

    var indexOf = [].indexOf || function (prop) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === prop)
                return i;
        }
        return -1;
    };

    function myTrim(text) {
        try {
            if (typeof (text) != "undefined" && text != null)
                return typeof (text.trim) === "function" ? text.trim() : text.replace(/^\s+|\s+$/gm, '');
        } catch (trimex) { }

        return text;
    }

    function isNumeric(n) {
        try {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
        catch (tempex) {
        }

        return false;
    }

    function validateEmail(tempmail) {
        try {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(tempmail)) {
                return (true);
            }
        } catch (tempex) { }
        return (false);
    }

    function setCookie(cname, cvalue, exdays) {
        var hostName = window.location.hostname;
        var siteNameFragments = hostName.split(".");
        var siteName = siteNameFragments[1];
        var domain = siteNameFragments.slice(1, siteNameFragments.length).join(".");

        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/" + ";domain=." + domain;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = myTrim(ca[i]);
            if (c.indexOf(name) == 0)
                return c.substring(name.length, c.length);
        }
        return null;
    }

    function deleteCookie(cname) {
        document.cookie = cname + "=" + 0 + "; " + "expires=01 Jan 1970 00:00:00 GMT" + ";path=/";
    }

    function roundToTwo(num) {
        if (Math != "undefined" && Math.round != "undefined")
            return +(Math.round(num + "e+2") + "e-2");
        else
            return num;
    }

    function getSearchParameters() {
        var prmstr = window.location.search.substr(1);
        return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : [];
    }

    function transformToAssocArray(prmstr) {
        var params = [];
        var prmarr = prmstr.split("&");
        for (var i = 0; i < prmarr.length; i++) {
            params[i] = prmarr[i];
        }

        return params;
    }

    function randomIntFromInterval(min, max) {
        try {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        catch (tempex) {
        }

        return min;
    }

    function getDecimalSign(number) {
        try {
            var tempnum = myTrim(number);

            if (tempnum.length > 3) {
                return tempnum.charAt(tempnum.length - 3);
            }
        }
        catch (signex) {
        }

        return ".";
    }

    // End of utility functions

    function processInside(tracker) {
        var searchUrl = "/search-results?q";
        var searchQueryString = null;
        var productCategoryUrl = null;
        var productCategoryQueryString = null;
        var productUrl = null;
        var productQueryString = null;
        var checkoutUrl = "/checkout|/cart";
        var checkoutQueryString = null;
        var orderConfirmedUrl = null; // https://dev-pwa-dg.thelevelgroup.com/on/demandware.store/Sites-dolcegabbana_us-Site/en/COSummary-Submit/C378863767 https://stg-pwa-dg.thelevelgroup.com/on/demandware.store/Sites-dolcegabbana-Site/en/COSummary-Submit/C1051001725
        var orderConfirmedQueryString = null;

        function getViewData() {
            try {

                // Output view data
                // Default view data is "unknown"

                var data = {};

                data.action = "trackView";
                data.type = "article";
                data.url = window.location.href;
                data.name = "Unknown Page: " + window.location.href;
                var tempurl = window.location.href.toLowerCase();

                var temppath = window.location.pathname;
                var temp_loc = temppath.split("/");
                var page = "";

                var add_tags = [];
                var params = getSearchParameters();
                var searchterm = "Search"; // Find the searchterm the
                // visitor
                // entered for the search page to be
                // used as the page name
                if (params != null && params.length > 0) {
                    for (var i = 0; i < params.length; i++) {
                        if (params[i].indexOf("q=") == 0) {
                            searchterm = params[i].split("q=")[1];
                        }
                    }
                }

                for (var i = 1; i < temp_loc.length; i++) {
                    if (temp_loc[i] != null && temp_loc[i].length > 0) {
                        if (temp_loc[i].indexOf("?") != -1) {
                            var temploc = temp_loc[i].split("?")[0];
                            if (temploc.length > 0)
                                page = temp_loc[i];
                        }
                        else {
                            page = temp_loc[i];
                        }
                    }
                }
                var curpage = page.split("?")[0];
                data.name = curpage;

                // Identify and assign the correct page type here
                // The part below is actually very flexible, can use
                // dataLayer too
                // sometimes, etc so if needed can also just delete the
                // global
                // variable parts and make your own algorithm. From my
                // experience
                // the following part will rarely work for all websites.

                var temppagetype = "other";
                var temppageindex = 0;
                var tempsearchindex = 0;

                try {
                    if (typeof (dataLayer) != "undefined" && dataLayer != null && dataLayer.length > 0) {
                        for (var i = dataLayer.length - 1; i >= 0; i--) {
                            var tempbool = false;
                            if (typeof (dataLayer[i]) != "undefined" && dataLayer[i] && dataLayer[i].userInfo && dataLayer[i].pageType && dataLayer[i].currencyCode) {
                                _insideDataLayer = dataLayer[i];
                                _insideDataLayer2 = dataLayer[i];
                                _insideCurrency = dataLayer[i].currencyCode;
                                temppagetype = dataLayer[i].pageType.toLowerCase();
                                temppageindex = i;
                                break;
                            }

                            if (typeof (dataLayer[i]) != "undefined" && dataLayer[i] && dataLayer[i].event && dataLayer[i].event == "search" && dataLayer[i].search_term) {
                                tempsearchindex = i;
                                searchterm = dataLayer[i].search_term;
                            }
                        }
                    }
                } catch (tempex) { }

                if ((temppath == "/" || curpage == "index.html") && temp_loc.length < 3) {
                    data.type = "homepage";
                }
                else if (temppagetype == "home" || temppagetype == "homepage") {
                    data.type = "homepage";
                }
                else if (temppagetype == "search") {
                    data.type = "search";
                }
                else if (temppagetype == "productlistpage" || temppagetype.indexOf("category") != -1) {
                    data.type = "productcategory";
                }
                else if (temppagetype == "product" || temppagetype == "productpage") {
                    data.type = "product";
                }
                else if (temppagetype.indexOf("checkout") != -1) {
                    data.type = "checkout";
                }
                else if (temppagetype == "confirmation") {
                    data.type = "orderconfirmed";
                }
                else if (tempurl.indexOf("/login") != -1 || tempurl.indexOf("/register") != -1) {
                    data.type = "login";
                }
                else if (temppagetype == "other" && temp_loc.length < 3) {
                    data.type = "homepage";
                }

                try {
                    if (data.type == "article") {
                        if (data.name.toLowerCase() == "home page")
                            data.type = "homepage";
                    }

                    if (tempsearchindex > temppageindex) {
                        data.type = "search";
                    }
                } catch (tempex) { }

                if (productCategoryUrl != null) {
                    if (tempurl.indexOf(productCategoryUrl.toLowerCase()) > -1) {
                        data.type = "productcategory";
                    }
                }
                if (productCategoryQueryString != null) {
                    var tempelem = _insideJQ(productCategoryQueryString);
                    if (tempelem != null && tempelem.length > 0) {
                        data.type = "productcategory";
                    }
                }

                if (searchUrl != null) {
                    if (tempurl.indexOf(searchUrl.toLowerCase()) > -1) {
                        data.type = "search";
                    }
                }
                if (searchQueryString != null) {
                    var tempelem = _insideJQ(searchQueryString);
                    if (tempelem != null && tempelem.length > 0) {
                        data.type = "search";
                    }
                }

                if (productUrl != null) {
                    if (tempurl.indexOf(productUrl.toLowerCase()) > -1) {
                        data.type = "product";
                    }
                }
                if (productQueryString != null) {
                    var tempelem = _insideJQ(productQueryString);
                    if (tempelem != null && tempelem.length > 0) {
                        data.type = "product";
                    }
                }

                if (checkoutUrl != null) {
                    if (tempurl.search(checkoutUrl.toLowerCase()) > 0) {
                        data.type = "checkout";
                    }
                }
                if (checkoutQueryString != null) {
                    var tempelem = _insideJQ(checkoutQueryString);
                    if (tempelem != null && tempelem.length > 0) {
                        data.type = "checkout";
                    }
                }

                if (orderConfirmedUrl != null) {
                    if (tempurl.indexOf(orderConfirmedUrl.toLowerCase()) > -1) {
                        data.type = "orderconfirmed";
                    }
                }
                if (orderConfirmedQueryString != null) {
                    var tempelem = _insideJQ(orderConfirmedQueryString);
                    if (tempelem != null && tempelem.length > 0) {
                        data.type = "orderconfirmed";
                    }
                }

                // try {
                //     if (typeof (dataLayer) != "undefined" && dataLayer != null && dataLayer.length > 0) {
                //         for (var i = dataLayer.length - 1; i >= 0; i--) {
                //             if (typeof (dataLayer[i]) != "undefined" && dataLayer[i] != null && typeof (dataLayer[i].orderID) != "undefined" && dataLayer[i].orderID != null && dataLayer[i].orderID.length > 0 && typeof (dataLayer[i].transactionTotal) != "undefined" && dataLayer[i].transactionTotal != null) {
                //                 var temporderconfirmdata = orderConfirmProcess();
                //                 if (temporderconfirmdata && temporderconfirmdata.length > 0)
                //                     data.type = "orderconfirmed";
                //                 else {
                //                     data.type = "orderconfirmedtrue";
                //                     data.name = "Order Confirmed";
                //                 }
                //                 break;
                //             }
                //         }
                //     }
                // } catch (tempex) { }

                // Finish identying

                switch (data.type) {
                    case "homepage":
                        data.name = "Home";
                        break;
                    case "search":
                        data.name = "Search Result Page";
                        if (searchterm != null && searchterm.length > 0) {
                            data.name = decodeURIComponent(searchterm);
                            if (data.name.indexOf("+") != -1) {
                                data.name = data.name.replace(/\+/g, ' ');
                            }

                            try {
                                var tempsearch = _insideJQ("input#searchinput").val();
                                if (tempsearch)
                                    data.name = tempsearch;
                            } catch (tempex) { }
                        }
                        break;
                    case "productcategory":
                        var tempcat = getCategory();
                        if (tempcat != null && tempcat.length > 0) {
                            if (tempcat.length > 149)
                                tempcat = tempcat.substring(0, 149);
                            data.category = tempcat;
                        }

                        var tempPageName = getPageName();
                        if (tempPageName != null && tempPageName.length > 0)
                            data.name = tempPageName;

                        break;
                    case "product":
                        var tempPageName = getPageName();
                        if (tempPageName != null && tempPageName.length > 0)
                            data.name = tempPageName;

                        tempPageName = getProductName();
                        if (tempPageName != null && tempPageName.length > 0)
                            data.name = tempPageName;

                        var tempcat = getCategory();
                        if (tempcat != null && tempcat.length > 0) {
                            if (tempcat.length > 149)
                                tempcat = tempcat.substring(0, 149);
                            data.category = tempcat;
                        }

                        var tempval = getProductImage();
                        if (tempval != null && tempval.length > 0)
                            data.img = tempval;
                        else
                            data.type = "other";

                        var tempProdString = getProductDataString();
                        if (tempProdString != null && tempProdString.length > 0) {
                            data.name = data.name + " - " + tempProdString;
                        }

                        var tempsku = getProductSku();
                        if (tempsku != null && tempsku.length > 0) {
                            data.sku = tempsku;
                            data.name = data.name + " - " + tempsku;
                        }
                        else {
                            data.type = "other";
                        }

                        var tempprice = getProductPrice();
                        if (tempprice != null && tempprice > 0)
                            data.price = tempprice;
                        break;
                    case "orderconfirmed":
                        data.name = "Order Confirmed";
                        break;
                    default:
                        var tempPageName = getPageName();
                        if (tempPageName != null && tempPageName.length > 0)
                            data.name = tempPageName;
                }

                if (add_tags.length > 0) {
                    data.tags = add_tags.join(",");
                }

                // Get view data from page

                return data;
            }
            catch (ex) {
                log("getViewData error: ", ex);
                return null;
            }
        }

        function getPageName() {
            // Modify if necessary
            try {
                var content = document.getElementsByTagName("title");
                if (typeof (content) != "undefined" && content != null && content.length > 0) {
                    var result = content[0].textContent || content[0].innerText;
                    if (typeof (result) != "undefined" && result != null && result.length > 0) {
                        return myTrim(result);
                    }
                }
            } catch (pagenameex) { }

            return null;
        }

        function getProductName() {
            try {
                if (_insideDataLayer2 && _insideDataLayer2.productName)
                    return _insideDataLayer2.productName;
            }
            catch (tempex) {
            }

            return null;
        }

        function getProductImage() {
            try {
                var metaTags = document.getElementsByTagName("meta");

                var fbAppIdContent = "";
                for (var i = 0; i < metaTags.length; i++) {
                    if (metaTags[i].getAttribute("property") == "og:image") {
                        fbAppIdContent = metaTags[i].getAttribute("content");
                        return fbAppIdContent;
                    }
                }
            }
            catch (tempex) {
            }

            try {
                var ldjsons = _insideJQ('script[type="application/ld+json"]');
                for (var i = 0; i < ldjsons.length; i++) {
                    var tempdata = null;
                    try {
                        var tempdata = JSON.parse(_insideJQ(ldjsons[i]).last().html().replace(/\n/g, ""));
                    } catch (tempex) { }
                    if (typeof (tempdata) != "undefined" && tempdata != null && _insideJQ.isArray(tempdata)) {
                        for (var l = 0; l < tempdata.length; l++) {
                            var tempdetail = tempdata[i];
                            if (typeof (tempdetail) != "undefined" && tempdetail != null && typeof (tempdetail["@type"]) != "undefined" && tempdetail["@type"] != null && tempdetail["@type"] == "Product" && typeof (tempdetail.image) != "undefined" && tempdetail.image != null && tempdetail.image.length > 0) {
                                if (_insideJQ.isArray(tempdetail.image)) {
                                    var tempprodimg = tempdetail.image[0];
                                    if (tempprodimg.indexOf(window.location.hostname) == -1) {
                                        tempprodimg = "https://" + window.location.hostname + tempprodimg;
                                    }
                                    return tempprodimg;
                                }
                                else {
                                    var tempprodimg = tempdetail.image;
                                    if (tempprodimg.indexOf(window.location.hostname) == -1) {
                                        tempprodimg = "https://" + window.location.hostname + tempprodimg;
                                    }
                                    return tempprodimg;
                                }
                            }
                        }
                    }
                    else if (typeof (tempdata) != "undefined" && tempdata != null && typeof (tempdata["@type"]) != "undefined" && tempdata["@type"] != null && tempdata["@type"] == "Product" && typeof (tempdata.image) != "undefined" && tempdata.image != null && tempdata.image.length > 0) {
                        if (_insideJQ.isArray(tempdata.image)) {
                            var tempprodimg = tempdata.image[0];
                            if (tempprodimg.indexOf(window.location.hostname) == -1) {
                                tempprodimg = "https://" + window.location.hostname + tempprodimg;
                            }
                            return tempprodimg;
                        }
                        else {
                            var tempprodimg = tempdata.image;
                            if (tempprodimg.indexOf(window.location.hostname) == -1) {
                                tempprodimg = "https://" + window.location.hostname + tempprodimg;
                            }
                            return tempprodimg;
                        }
                    }
                }
            }
            catch (tempex) {
                log(tempex)
            }

            try {
                var tempimg = _insideJQ("#product-detail picture[class*='ProductGalleryItem__product-gallery-item__slide-image'].general-picture.loaded:first img");
                if (tempimg.length > 0)
                    return tempimg.get(0).currentSrc;
            } catch (tempex) { }

            return null;
        }

        function getProductPrice() {
            try {
                if (_insideDataLayer2 && _insideDataLayer2.productPrice && _insideDataLayer2.productPrice.value)
                    return parseFloat(_insideDataLayer2.productPrice.value);
            }
            catch (tempex) {
            }

            return null;
        }

        function getProductSku() {
            try {
                if (_insideDataLayer2 && _insideDataLayer2.productSku)
                    return _insideDataLayer2.productSku;
            }
            catch (tempex) {
            }

            return null;
        }

        function getProductDataString() {
            try {
                var tempproductstring = [];
                if (_insideDataLayer2 && _insideDataLayer2.productColor) {
                    tempproductstring.push(_insideDataLayer2.productColor);
                }

                if (tempproductstring.length > 0)
                    return tempproductstring.join(" | ");
            }
            catch (tempex) {
            }

            return null;
        }

        function getCategory() {
            try {
                if (_insideDataLayer2 && _insideDataLayer2.productCategoryPathGPF)
                    return _insideDataLayer2.productCategoryPathGPF;
            }
            catch (tempex) {
            }

            return null;
        }

        function getOrderData() {
            try {
                var data = [];
                var totalprice = 0;
                var orderId = "auto";

                if (typeof (_insideDataLayer2) != "undefined" && _insideDataLayer2 != null && _insideDataLayer2.cartInfo && _insideDataLayer2.cartInfo.cartProducts && _insideJQ.isArray(_insideDataLayer2.cartInfo.cartProducts)) {
                    var tempcartitems = _insideDataLayer2.cartInfo;

                    if (tempcartitems && tempcartitems.cartProducts) {
                        for (var i = 0; i < tempcartitems.cartProducts.length; i++) {
                            var insideitem = {};
                            insideitem.action = "addItem";
                            insideitem.orderId = orderId;
                            var tempitem = tempcartitems.cartProducts[i];
                            insideitem.name = tempitem.masterId;
                            insideitem.sku = tempitem.masterId;
                            insideitem.price = parseFloat(tempitem.price);
                            insideitem.qty = parseFloat(tempitem.quantity);

                            totalprice = totalprice + insideitem.price;
                            try {
                                if (tempitem.name) {
                                    insideitem.name = tempitem.name;
                                }

                                if (tempitem.image) {
                                    insideitem.img = decodeURIComponent(tempitem.image);
                                }

                                // if (tempitem.url) {
                                //     insideitem.url = decodeURIComponent(tempitem.url);
                                // }

                                if (tempitem.category) {
                                    insideitem.category = tempitem.category;
                                    if (insideitem.category.length > 140) {
                                        insideitem.category = insideitem.category.substring(0, 140);
                                    }
                                }

                                if (tempitem.variantId)
                                    insideitem.sku = tempitem.variantId;

                                if (tempitem.size)
                                    insideitem.size = tempitem.size;

                                insideitem.price = insideitem.price / insideitem.qty;
                            } catch (tempex) { }

                            data.push(insideitem);
                        }
                    }
                }

                if (data.length > 0) {

                    data.push({
                        "action": "trackOrder",
                        "orderId": orderId,
                        "orderTotal": totalprice
                    });

                    sessionStorage.setItem("insideordertotal", totalprice);

                    return data;
                }
            }
            catch (ex) {
                log("getOrderData error. ", ex);
            }

            return null;
        }

        function orderConfirmProcess() {
            try {
                var data = [];
                var tempcurrency = null;

                var detail = null;
                if (typeof (dataLayer) != "undefined" && dataLayer != null && dataLayer.length > 0) {
                    for (let i = 0; i < dataLayer.length; i++) {
                        if (typeof (dataLayer[i]) != "undefined" && dataLayer[i] != null && typeof (dataLayer[i].orderID) != "undefined" && dataLayer[i].orderID != null && dataLayer[i].orderID.length > 0 && typeof (dataLayer[i].transactionTotal) != "undefined" && dataLayer[i].transactionTotal != null) {
                            detail = dataLayer[i];
                            if (typeof (dataLayer[i].currencyCode) != "undefined" && dataLayer[i].currencyCode != null) {
                                tempcurrency = dataLayer[i].currencyCode;
                            }
                            break;
                        }
                    }
                }

                if (detail != null) {
                    var totalprice = detail.transactionTotal;
                    var orderID = detail.orderID;
                    var temppurchasedata = {};

                    try {
                        if (detail.transactionId) {
                            temppurchasedata.otherOrderId = detail.transactionId;
                        }
                    } catch (orderidex) { }

                    if (typeof (detail.transactionShipping) != "undefined" && detail.transactionShipping != null) {
                        temppurchasedata.shipping = detail.transactionShipping;
                    }
                    if (typeof (detail.transactionTax) != "undefined" && detail.transactionTax != null) {
                        temppurchasedata.tax = detail.transactionTax;
                    }
                    if (tempcurrency != null) {
                        temppurchasedata.currency = tempcurrency;
                    }

                    try {
                        if (typeof (detail) != "undefined" && detail != null && typeof (detail.transactionProducts) != "undefined" && detail.transactionProducts != null && detail.transactionProducts.length > 0) {
                            var details = detail.transactionProducts;

                            for (let i = 0; i < details.length; i++) {
                                var price = parseFloat(details[i].price);
                                var qty = details[i].quantity;
                                var item_name = details[i].name;
                                var sku = details[i].sku;

                                var tempitemdata = {
                                    "action": "addItem",
                                    "orderId": "auto",
                                    "name": myTrim(item_name),
                                    "price": price,
                                    "sku": myTrim(sku),
                                    "category": myTrim(details[i].category),
                                    "qty": qty
                                };

                                data.push(tempitemdata);
                            }

                            // if (data.length > 0) {
                            //     data.push({
                            //         "action": "trackOrder",
                            //         "orderId": "auto",
                            //         "orderTotal": totalprice
                            //     });
                            // }
                        }
                    } catch (productsex) { }

                    if (typeof (orderID) != "undefined" && orderID != null && orderID.length > 0 && orderID != "auto") {
                        let updateBool = true;
                        try {
                            var lastOrderID = sessionStorage.getItem("insidelastorderid");
                            if (lastOrderID == orderID) {
                                return null;
                            }

                            if (data.length > 0) {
                                updateBool = false;
                            }
                        }
                        catch (orderidex) {
                        }

                        data.push({
                            "action": "trackOrder",
                            "orderId": "auto",
                            "newOrderId": orderID,
                            "orderTotal": totalprice,
                            "data": temppurchasedata,
                            "update": updateBool,
                            "complete": true
                        });
                    }

                    return data;
                }
            }
            catch (ex) {
                log("orderConfirmProcess error. ", ex);
            }

            return null;
        }

        function getVisitorId() {
            try {
                if (_insideDataLayer && _insideDataLayer.userInfo.loggedIn && _insideDataLayer.userInfo.loggedIn.toLowerCase() == "logged in" && _insideDataLayer.userInfo.accountCustomerId && validateEmail(_insideDataLayer.userInfo._email) && _insideDataLayer.userInfo.firstName && _insideDataLayer.userInfo.lastName && _insideDataLayer.userInfo.accountCustomerId) {
                    return _insideDataLayer.userInfo.accountCustomerId;
                }
            }
            catch (visitidex) {
            }

            return null;
        }

        function getVisitorName() {
            try {
                if (_insideDataLayer && _insideDataLayer.userInfo.loggedIn && _insideDataLayer.userInfo.loggedIn.toLowerCase() == "logged in" && _insideDataLayer.userInfo.accountCustomerId && validateEmail(_insideDataLayer.userInfo._email) && _insideDataLayer.userInfo.firstName && _insideDataLayer.userInfo.lastName && _insideDataLayer.userInfo.accountCustomerId) {
                    return _insideDataLayer.userInfo.firstName + " " + _insideDataLayer.userInfo.lastName;
                }
            }
            catch (visitidex) {
            }

            return null;
        }

        function getVisitorData() {
            try {
                var tempdata = {};

                try {
                    tempdata.language = _insideJQ("html").attr("lang");
                } catch (langex) { }

                if (_insideDataLayer && _insideDataLayer.userInfo) {
                    if (_insideDataLayer.userInfo.country) {
                        tempdata.country = _insideDataLayer.userInfo.country;
                    }
                    if (_insideDataLayer.userInfo.language) {
                        tempdata.language = _insideDataLayer.userInfo.language;
                        if (tempdata.language.indexOf("_") != -1) {
                            tempdata.language = tempdata.language.split("_")[0];
                        }
                    }
                    if (_insideDataLayer.userInfo.cdmID) {
                        tempdata.cdmID = _insideDataLayer.userInfo.cdmID;
                    }

                    var tempname = getVisitorName();
                    if (tempname) {
                        tempdata.user_name = tempname;
                        tempdata.user_email = _insideDataLayer.userInfo._email;
                    }

                    if (_insideDataLayer.customerID) {
                        tempdata.salesforce_id = _insideDataLayer.userInfo.customerID;
                    }
                }

                try {
                    if (typeof (Yext) != "undefined" && Yext != null && Yext["EntityId"]) {
                        tempdata.storeYextEntityId = Yext["EntityId"];
                    }
                } catch (tempex) { }

                return tempdata;
            }
            catch (visitidex) {
            }

            return null;
        }

        function insertInsideTag() {
            try {
                let temphostname = window.location.hostname.toLowerCase();
                if (temphostname.indexOf("dolcegabbana.com") != -1) {
                    tracker.subsiteId = "157";
                }
                else if (temphostname.indexOf("thelevelgroup.com") != -1) {
                    tracker.subsiteId = "165";
                }

                let subsiteMapping = {
                    "us": "158",
                    "jp": "159",
                    "kr": "160",
                    "mx": "161",
                    "ca": "235",
                    "au": "236",
                    "nz": "237",
                    "uk": "248",
                    "gb": "248",
                    "it": "249",
                    "ae": "250",
                    "qa": "251",
                    "sa": "252",
                    "de": "253",
                    "ch": "254",
                    "kw": "255",
                    "th": "256",
                    "es": "264",
                    "nl": "265",
                    "pl": "266",
                    "ro": "267",
                    "bg": "268",
                    "za": "269",
                    "in": "270"
                };

                if (temphostname.indexOf("thelevelgroup.com") != -1) {
                    subsiteMapping = {
                        "us": "166",
                        "jp": "167",
                        "kr": "168",
                        "mx": "169"
                    };
                }

                let tempcountry = window.location.pathname.split("/");
                if (tempcountry.length > 1) {
                    tempcountry = tempcountry[1];
                    if (tempcountry.indexOf("-") != -1) {
                        let tempdatacountry = tempcountry.split("-")[1].toLowerCase();
                        if (subsiteMapping[tempdatacountry])
                            tracker.subsiteId = subsiteMapping[tempdatacountry];
                    }
                }

                if (_insideDataLayer && _insideDataLayer.userInfo) {
                    if (_insideDataLayer.userInfo.country) {
                        let tempdatacountry = _insideDataLayer.userInfo.country.toLowerCase();
                        if (subsiteMapping[tempdatacountry])
                            tracker.subsiteId = subsiteMapping[tempdatacountry];
                    }
                }
            } catch (subsiteex) { }

            try {
                _insideGraph.processQueue();
            }
            catch (tempex) {
            }
        }

        function sendToInside() {
            try {
                tracker.url = window.location.href;

                var visitorId = getVisitorId();
                if (visitorId != null && visitorId.length > 0) {
                    tracker.visitorId = visitorId;
                }

                var visitorName = getVisitorName();
                if (visitorName != null && visitorName.length > 0) {
                    tracker.visitorName = visitorName;
                }

                var visitorData = getVisitorData();
                if (visitorData != null) {
                    tracker.visitorData = visitorData;
                }

                var view = getViewData();
                if (view != null) {
                    if (view.type == "orderconfirmed") {
                        var tempconfirm = orderConfirmProcess();
                        if (tempconfirm != null && tempconfirm.length > 0) {
                            for (var i = 0; i < tempconfirm.length; i++) {
                                _inside.push(tempconfirm[i]);

                                try {
                                    if (tempconfirm[i].action == "trackOrder")
                                        if (typeof (tempconfirm[i].newOrderId) != "undefined" && tempconfirm[i].newOrderId != null)
                                            sessionStorage.setItem("insidelastorderid", tempconfirm[i].newOrderId);
                                }
                                catch (tempex) {
                                }
                            }

                            sessionStorage.removeItem("insideordertotal");
                        }
                        else {
                            view.type == "other";
                        }
                    }
                    else {
                        var orderData = getOrderData();

                        if (orderData != null && orderData.length > 0) {
                            let tempDupeCheck = [];
                            let tempDupeCheck2 = [];

                            for (var i = 0; i < orderData.length; i++) {
                                _inside.push(orderData[i]);
                                if (orderData[i].action == "trackOrder") {
                                    view.orderId = orderData[i].orderId;
                                    view.orderTotal = orderData[i].orderTotal;
                                    insideOrderTotal = orderData[i].orderTotal;
                                }
                                else {
                                    try {
                                        let tempItemDupeDetected = false;
                                        if (orderData[i].sku && !tempItemDupeDetected) {
                                            let tempCheckIndex = _insideJQ.inArray(orderData[i].sku, tempDupeCheck);
                                            if (tempCheckIndex > -1) {
                                                if (tempDupeCheck2[tempCheckIndex] != orderData[i].variantId) {
                                                    tempItemDupeDetected = true;
                                                    if (typeof (view.tags) == "undefined" || view.tags == null) {
                                                        view.tags = "duplicatecartitem";
                                                    }
                                                    else {
                                                        view.tags = view.tags + ",duplicatecartitem";
                                                    }
                                                }
                                            }

                                            tempDupeCheck.push(orderData[i].sku);
                                            tempDupeCheck2.push(orderData[i].variantId);
                                        }
                                    } catch (tempex) { }
                                }
                            }
                        }
                        else if (view.url.toLowerCase().indexOf("/cart") != -1) {
                            sessionStorage.removeItem("insideordertotal");
                        }
                        else {
                            try {
                                var tempcount = _insideJQ("#capds-menu-icons-desktop .capds-minicart--qty").text();
                                if (tempcount) {
                                    tempcount = parseFloat(tempcount);
                                    if (isNumeric(tempcount) && tempcount > 0) {
                                        var temptotal = sessionStorage.getItem("insideordertotal");

                                        if (temptotal && temptotal > 0) {
                                            view.orderId = "auto";
                                            view.orderTotal = temptotal;
                                        }
                                    }
                                }
                            } catch (tempex) { }
                        }
                    }

                    // Add currency code
                    try {
                        if (_insideDataLayer && _insideDataLayer.currencyCode && _insideDataLayer.currencyCode.length == 3) {
                            _insideCurrency = _insideDataLayer.currencyCode.toUpperCase();
                        }

                        if (_insideCurrency) {
                            if (_inside != null && _inside.length > 0) {
                                for (var i = 0; i < _inside.length; i++) {
                                    if (_inside[i].action == "trackOrder") {
                                        if (typeof (_inside[i].data) == "undefined" || _inside[i].data == null) {
                                            _inside[i].data = {};
                                        }

                                        if (typeof (_inside[i].data.currency) == "undefined" || _inside[i].data.currency == null) {
                                            _inside[i].data.currency = _insideCurrency;
                                        }
                                    }
                                }
                            }

                            if (typeof (view.data) == "undefined" || view.data == null) {
                                view.data = {};
                            }
                            view.data.currency = _insideCurrency;

                            if (typeof (tracker.visitorData) == "undefined" || tracker.visitorData == null) {
                                tracker.visitorData = {};
                            }
                            tracker.visitorData.currency = _insideCurrency;
                        }
                    } catch (currencyex) { }

                    try {
                        _insideCurPageType = view.type;

                        if (view.type == "product") {
                            _insideProdUrl = window.location.href;
                            deferWait(function () {
                                var tempsizeguideele = _insideJQ("button.b-size_chart-toggler.js-size_chart-toggler");
                                if (tempsizeguideele.length > 0 && tempsizeguideele.is(":visible")) {
                                    _insideJQ("button.b-size_chart-toggler.js-size_chart-toggler").click(function () {
                                        callEventListener("sizeguideavailable");
                                    })
                                }
                            }, function () {
                                if (typeof (_insideGraph) != "undefined" && _insideGraph != null && typeof (insideFrontInterface) != "undefined" && insideFrontInterface != null && insideFrontInterface.triggerVisitorEvent) {
                                    var tempsizeguideele = _insideJQ("button.b-size_chart-toggler.js-size_chart-toggler");
                                    if (tempsizeguideele.length > 0 && tempsizeguideele.is(":visible"))
                                        return true;
                                }

                                if (_insideProdUrl != window.location.href) {
                                    return true;
                                }

                                return false;
                            });

                            deferWait(function () {
                                var tempsizepredictor = _insideJQ("#szb-vfr-button");
                                var tempsizechart = _insideJQ("#szb-chart-button");
                                if (tempsizepredictor.length > 0 && tempsizepredictor.is(":visible") && tempsizechart.length > 0 && tempsizechart.is(":visible")) {
                                    _insideJQ("#szb-vfr-button").click(function () {
                                        callEventListener("sizepredictoravailable");
                                    });
                                    _insideJQ("#szb-chart-button").click(function () {
                                        callEventListener("sizeguideavailable");
                                    });
                                }
                            }, function () {
                                if (typeof (_insideGraph) != "undefined" && _insideGraph != null && typeof (insideFrontInterface) != "undefined" && insideFrontInterface != null && insideFrontInterface.triggerVisitorEvent) {
                                    var tempsizepredictor = _insideJQ("#szb-vfr-button");
                                    var tempsizechart = _insideJQ("#szb-chart-button");
                                    if (tempsizepredictor.length > 0 && tempsizepredictor.is(":visible") && tempsizechart.length > 0 && tempsizechart.is(":visible"))
                                        return true;
                                }

                                if (_insideProdUrl != window.location.href) {
                                    return true;
                                }

                                return false;
                            });
                        }
                    } catch (tempex) { }

                    try {
                        _insideCurPageType = view.type;
                        _insideCurUrl = window.location.href;
                    } catch (tempex) { }

                    _inside.push(view);

                    log("Inside Debug: ", _inside);
                }
            }
            catch (sendex) {
                _inside = [];

                _inside.push({
                    "action": "trackView",
                    "type": "other",
                    "name": "Check: " + window.location.href
                });

                log(sendex);
            }

            insertInsideTag();
            if (!_insideFirstLoad)
                _insideFirstLoad = true;
        }

        // window._insideViewUpdate = debounce(function () {
        //     var triggerupdate = true;
        //     try {
        //         // var temphashj = hashJoaat(JSON.stringify(_insideDataLayer))
        //         // if (temphashj == _insideHashJ)
        //         // 	triggerupdate = false;
        //     } catch (tempex) { }

        //     try {
        //         var tempcurview = getViewData();

        //         _insideCurPageType = tempcurview.type;
        //         _insideCurUrl = window.location.href;
        //     } catch (tempex) { }

        //     if (triggerupdate) {
        //         try {
        //             var temphostname = window.location.hostname.toLowerCase();
        //             if (temphostname.indexOf("dolcegabbana.com") != -1) {
        //                 tracker.subsiteId = "157";
        //             }
        //             else if (temphostname.indexOf("thelevelgroup.com") != -1) {
        //                 tracker.subsiteId = "165";
        //             }

        //             var subsiteMapping = {
        //                 "us": "158",
        //                 "jp": "159",
        //                 "kr": "160",
        //                 "mx": "161",
        //                 "ca": "235",
        //                 "au": "236",
        //                 "nz": "237",
        //                 "uk": "248",
        //                 "gb": "248",
        //                 "it": "249",
        //                 "ae": "250",
        //                 "qa": "251",
        //                 "sa": "252",
        //                 "de": "253",
        //                 "ch": "254",
        //                 "kw": "255",
        //                 "th": "256",
        //                 "es": "264",
        //                 "nl": "265",
        //                 "pl": "266",
        //                 "ro": "267",
        //                 "bg": "268",
        //                 "za": "269",
        //                 "in": "270"
        //             };

        //             if (temphostname.indexOf("thelevelgroup.com") != -1) {
        //                 subsiteMapping = {
        //                     "us": "166",
        //                     "jp": "167",
        //                     "kr": "168",
        //                     "mx": "169"
        //                 };
        //             }

        //             var tempcountry = window.location.pathname.split("/");
        //             if (tempcountry.length > 1) {
        //                 tempcountry = tempcountry[1];
        //                 if (tempcountry.indexOf("-") != -1) {
        //                     var tempdatacountry = tempcountry.split("-")[1].toLowerCase();
        //                     if (subsiteMapping[tempdatacountry])
        //                         tracker.subsiteId = subsiteMapping[tempdatacountry];
        //                 }
        //             }

        //             if (_insideDataLayer && _insideDataLayer.userInfo) {
        //                 if (_insideDataLayer.userInfo.country) {
        //                     var tempdatacountry = _insideDataLayer.userInfo.country.toLowerCase();
        //                     if (subsiteMapping[tempdatacountry])
        //                         tracker.subsiteId = subsiteMapping[tempdatacountry];
        //                 }
        //             }
        //         } catch (subsiteex) { }

        //         sendToInside();
        //     }
        // }, 2000);

        window._insideViewUpdate = function () {
            let triggerupdate = true;
            try {
                // var temphashj = hashJoaat(JSON.stringify(_insideDataLayer))
                // if (temphashj == _insideHashJ)
                // 	triggerupdate = false;
            } catch (tempex) { }

            if (triggerupdate) {
                setTimeout(sendToInside, 2000);
            }
        };

        var tempview = getViewData();
        if (tempview != null && typeof (tempview.type) != "undefined" && tempview.type != null && tempview.type == "orderconfirmed") {
            deferWait(sendToInside, function () {
                var tempconfirm = orderConfirmProcess();
                if (tempconfirm != null && tempconfirm.length > 0) {
                    return true;
                }

                return document.readyState != 'loading' && document.readyState != 'interactive';
            });
        }
        else {
            deferWait(sendToInside, function () {
                if (document.readyState != 'loading' && document.readyState != 'interactive') {
                    keepWait(_insideViewUpdate, function () {
                        // if (!_insideFirstLoad) {
                        // try {
                        //     var tempview = getViewData();
                        //     if (tempview && tempview.type && tempview.type != temppageview) {
                        //         temppageview = tempview.type;
                        //     }

                        // } catch (tempex) { }
                        // return false;
                        // }

                        if (_insideFirstLoad && typeof (_insideGraph) != "undefined" && _insideGraph != null) {
                            // var temporderdata = getOrderData();

                            // if (temporderdata != null && temporderdata.length > 0) {
                            //     for (var i = 0; i < temporderdata.length; i++) {
                            //         if (temporderdata[i].action == "trackOrder") {
                            //             if (insideOrderTotal != temporderdata[i].orderTotal) {
                            //                 return true;
                            //             }
                            //         }
                            //     }
                            // }
                            // else if (insideOrderTotal > 0) {
                            //     insideOrderTotal = 0;
                            //     return true;
                            // }

                            var boolupdatedata = false;
                            try {
                                var tempcurview = getViewData();
                                if (_insideCurUrl != window.location.href) {
                                    _insideCurUrl = window.location.href;
                                    _insideCurPageType = tempcurview.type;
                                    boolupdatedata = true;
                                }

                                if (_insideCurPageType != tempcurview.type) {
                                    _insideCurPageType = tempcurview.type;
                                    _insideCurUrl = window.location.href;
                                    boolupdatedata = true;
                                }
                            } catch (tempex) { }

                            return boolupdatedata;
                        }

                        return false;
                    });

                    return true;
                }

                return false;
            });
        }
    }

    if (typeof (_insideGraph) != "undefined" && _insideGraph != null && typeof (_insideGraph.current) != "undefined" && _insideGraph.current != null) {
        processInside(_insideGraph.current)
    }
    else {
        var insideTracker = {
            "action": "getTracker",
            "crossDomain": false,
            "account": accountKey
        };

        try {
            var subsiteMapping = {
                "us.dolcegabbana.com": "158",
                "jp.dolcegabbana.com": "159",
                "kr.dolcegabbana.com": "160",
                "mx.dolcegabbana.com": "161",
                "us.thelevelgroup.com": "166",
                "jp.thelevelgroup.com": "167",
                "kr.thelevelgroup.com": "168",
                "mx.thelevelgroup.com": "169"
            };

            var temphostname = window.location.hostname.toLowerCase();
            if (temphostname.indexOf("dolcegabbana.com") != -1) {
                subsiteId = "157";
            }
            else if (temphostname.indexOf("thelevelgroup.com") != -1) {
                subsiteId = "165";
            }

            for (var tempsubsitekey in subsiteMapping) {
                if (subsiteMapping.hasOwnProperty(tempsubsitekey)) {
                    if (subsiteMapping[tempsubsitekey] != null) {
                        if (temphostname.indexOf(tempsubsitekey) != -1) {
                            subsiteId = subsiteMapping[tempsubsitekey];
                            break;
                        }
                    }
                }
            }

            subsiteMapping = {
                "us": "158",
                "jp": "159",
                "kr": "160",
                "mx": "161",
                "ca": "235",
                "au": "236",
                "nz": "237",
                "uk": "248",
                "gb": "248",
                "it": "249",
                "ae": "250",
                "qa": "251",
                "sa": "252",
                "de": "253",
                "ch": "254",
                "kw": "255",
                "th": "256",
                "es": "264",
                "nl": "265",
                "pl": "266",
                "ro": "267",
                "bg": "268",
                "za": "269",
                "in": "270"
            };

            if (window.location.hostname.indexOf("thelevelgroup.com") != -1) {
                subsiteMapping = {
                    "us": "166",
                    "jp": "167",
                    "kr": "168",
                    "mx": "169"
                };
            }

            var tempcountry = window.location.pathname.split("/");
            if (tempcountry.length > 1) {
                tempcountry = tempcountry[1];
                if (tempcountry.indexOf("-") != -1) {
                    tempdatacountry = tempcountry.split("-")[1].toLowerCase();
                    if (subsiteMapping[tempdatacountry])
                        subsiteId = subsiteMapping[tempdatacountry];
                }
            }

            if (typeof (dataLayer) != "undefined" && dataLayer != null && dataLayer.length > 0) {
                for (var i = dataLayer.length - 1; i >= 0; i--) {
                    if (typeof (dataLayer[i]) != "undefined" && dataLayer[i] && dataLayer[i].userInfo && dataLayer[i].pageType && dataLayer[i].currencyCode) {
                        var tempdatacountry = dataLayer[i].userInfo.country.toLowerCase();
                        if (subsiteMapping[tempdatacountry])
                            subsiteId = subsiteMapping[tempdatacountry];
                        break;
                    }
                }
            }
        } catch (subsiteex) { }

        if (typeof (subsiteId) != "undefined" && subsiteId != null)
            insideTracker["subsiteId"] = subsiteId;

        _inside.push(insideTracker);

        _inside.push({
            "action": "bind",
            "name": "onload",
            "callback": function (tracker) {
                if (_insideFirstLoad)
                    return;

                _insideJQ = _insideGraph.jQuery;

                processInside(tracker);
            }
        });
        (function (w, d, s, u) {
            a = d.createElement(s), m = d.getElementsByTagName(s)[0];
            a.async = 1;
            a.src = u;
            m.parentNode.insertBefore(a, m);
        })(window, document, "script", "//" + trackerURL + "/ig.js");
    }

    function callEventListener(eventLabel) {
        // The function below will wait until the object insideFrontInterface and the functiong is available
        if (typeof (insideFrontInterface) == "undefined" || insideFrontInterface == null || typeof insideFrontInterface.triggerVisitorEvent == "undefined" || insideFrontInterface.triggerVisitorEvent == null) {
            setTimeout(callEventListener, 1000);
            return;
        }

        insideFrontInterface.triggerVisitorEvent(eventLabel);
    }

    // deferWait(function () {
    //     var websiteId = insideFrontInterface.chat.userid.split(':')[1];
    //     _insideGraph.loadJS(_insideCDN + 'custom/' + websiteId + '-customScript.js?v=' + _insideScriptVersion);
    // }, function () {
    //     return typeof _insideGraph != 'undefined' && _insideGraph.loadJS && typeof insideFrontInterface != 'undefined' && insideFrontInterface.chat && insideFrontInterface.chat.userid;
    // });

})();