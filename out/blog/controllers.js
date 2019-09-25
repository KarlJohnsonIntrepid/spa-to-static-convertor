nomadsApp.controller("pageController",["$scope","page",function(n,t){"use strict";n.page=t}]);nomadsApp.factory("page",["locationHttpFacade",function(n){function o(){n.getLastKnownLocation().success(function(n){u=n}).error(function(n,t){console.log(n,t)})}var i="Intrepid Nomads",r="Intrepid Nomads",u=o(),f="",e="",t=!0;return{title:function(){return i},setTitle:function(n){i=n;t=!0},description:function(){return r},setDescription:function(n){r=n},lastKnownLocation:function(){return u},ogImageURL:function(){return f},setogImage:function(n){f=n},ogURL:function(){return e},setogURL:function(n){e=n},showSideBar:function(){var n=document.getElementById("divMain");return t?$(n).addClass("col-sm-8").removeClass("col-sm-12"):$(n).removeClass("col-sm-8").addClass("col-sm-12"),t},setShowSideBar:function(n){t=!n}}}]);nomadsApp.controller("aboutController",["$scope","page",function(n,t){t.setTitle("About Us - Intrepid Nomads - Budget BackPacking As A Couple");t.setDescription("The best budget travel tips from the road. Find out where to go, what to see, and how much it costs. Start planning your own trip now.")}]);nomadsApp.controller("blogController",["$scope","$routeParams","blogHttpFacade","imageHttpFacade","$timeout","page","$sce","blogModel","modelFactory","imageModel",function(n,t,i,r,u,f,e,o,s,h){"use strict";n.initializing=0;i.getBlogByTitle(t.destination,t.category,t.title).success(function(t){n.blog=o(JSON.parse(t));f.setTitle(n.blog.seoTitle);f.setDescription(n.blog.seoDescription);f.setShowSideBar(n.blog.isFullScreen);f.setogImage("http://intrepidnomads.com"+n.blog.imageURL);f.setogURL("http://intrepidnomads.com"+n.blog.linkURL);n.blog.isFeature&&(n.subTitle="Featured In - "+n.blog.categoryDescription);u(function(){$(".blog-post img").addClass("img-responsive").addClass("fade-in").attr("spinner-load","")},0);n.initializing=n.initializing+1;r.selectImagesByBlog(n.blog.blogID).success(function(t){n.blog.showPhotos&&(n.images=s.load(t,h));n.initializing=n.initializing+1}).error(function(n,t){console.log(n,t)});n.loadRelated(n.blog.blogID)}).error(function(n,t){console.log(n,t)});n.bindHTML=function(n){return e.trustAsHtml(n)};n.loadRelated=function(t){n.blog.isFeature===!0?i.getBlogsByCategory(n.blog.categoryID).success(function(t){n.related=s.load(t,o);n.initializing=n.initializing+1}).error(function(n,t){console.log(n,t)}):i.getBlogsRelated(t,12).success(function(t){n.related=s.load(t,o);n.initializing=n.initializing+1}).error(function(n,t){console.log(n,t)})}}]);nomadsApp.controller("blogListController",["$scope","$timeout","$routeParams","blogHttpFacade","modelFactory","page","blogModel","htmlParser","pager",function(n,t,i,r,u,f,e,o,s){"use strict";f.setTitle("Blogs - Intrepid Nomads - Budget BackPacking As A Couple");f.setDescription("List of blogs and stories of our latest travels");n.pager=s;n.pager.setNumPerPage(10);n.initializing=!1;n.initialized=!1;t(function(){n.initialized||(n.initializing=!0)},1e3);n.initPaging=function(){n.initPageNum=i.page?i.page:1};n.initPaging();r.paged(n.initPageNum,10,1).success(function(i){n.filteredBlogs=u.load(i,e);r.getCount().success(function(t){n.totalItems=t});n.setCurrentPage();t(function(){n.initializing=!1;n.initialized=!0},150)}).error(function(n,t){console.log(n,t)});n.setCurrentPage=function(){i.page?(n.currentPage=i.page,n.pager.setCurrentPage(i.page)):(n.currentPage=1,n.pager.setCurrentPage(1))};n.parseHTML=function(n){return o.parseHTML(n)};n.pageChanged=function(){n.pager.pageChanged("blog/",n.currentPage)}}]);nomadsApp.controller("categoryController",["$scope","$sce","$routeParams","$filter","$timeout","modelFactory","categoryHttpFacade","page","categoryModel","htmlParser","blogHttpFacade","blogModel",function(n,t,i,r,u,f,e,o,s,h,c,l){"use strict";n.initializing=0;e.getCategories().success(function(t){n.results=f.load(t,s);n.category=r("filter")(n.results,{categoryURL:i.category})[0];o.setTitle(n.category.seoTitle);o.setDescription(n.category.seoDescription);u(function(){$(".blog-post img").addClass("img-responsive")},0);n.loadRelatedBlogs();n.initializing=n.initializing+1}).error(function(n,t){console.log(n,t)});n.loadRelatedBlogs=function(){c.getBlogsByCategory(n.category.categoryID).success(function(t){n.blogs=f.load(t,l);n.category.reverseDateOrder&&n.blogs.reverse();u(function(){n.initializing=n.initializing+1},150)}).error(function(n,t){console.log(n,t)})};n.parseHTML=function(n){return h.parseHTML(n)};n.bindHTML=function(n){return t.trustAsHtml(n)}}]);nomadsApp.controller("contactController",["$scope","$http",function(n,t){"use strict";var i=[];n.message="";n.reset=function(){n.form.name="";n.form.email="";n.form.subject="";n.form.messagetext=""};n.submitForm=function(r){n.submitted=!0;r&&(n.message="Sending message.....",i=n.form,t.post("api/contact",i).success(function(){n.message="Thanks your message has been sent"}).error(function(t,i){n.message="The message could not be sent";console.log(t,i)}),n.reset(),n.submitted=!1)}}]);nomadsApp.controller("countryController",["$scope","$routeParams","modelFactory","$timeout","$filter","destinationHttpFacade","page","destinationModel","$sce","blogHttpFacade","blogModel","htmlParser",function(n,t,i,r,u,f,e,o,s,h,c,l){"use strict";n.initializing=0;f.getDestinations().success(function(f){n.results=i.load(f,o);n.destination=u("filter")(n.results,{countryURL:t.destination})[0];e.setTitle(n.destination.seoTitle);e.setDescription(n.destination.seoDescription);r(function(){$(".blog-post img").addClass("img-responsive")},0);n.loadRelatedBlogs();n.initializing=n.initializing+1}).error(function(n,t){console.log(n,t)});n.loadRelatedBlogs=function(){h.getBlogsByCountry(n.destination.countryID).success(function(t){n.related=i.load(t,c);r(function(){n.initializing=n.initializing+1},150)}).error(function(n,t){console.log(n,t)})};n.bindHTML=function(n){return s.trustAsHtml(n)};n.parseHTML=function(n){return l.parseHTML(n)}}]);nomadsApp.controller("destinationsController",["$scope","destinationHttpFacade","modelFactory","page","destinationModel","$timeout",function(n,t,i,r,u,f){"use strict";n.initializing=!1;n.initialized=!1;f(function(){n.initialized||(n.initializing=!0)},1e3);r.setTitle("Destinations - Intrepid Nomads - Budget BackPacking As A Couple");r.setDescription("The best budget travel tips from the road. Find out where to go, what to see, and how much it costs. Start planning your own trip now.");r.setShowSideBar(!0);r.setogURL("http://intrepidnomads.com/Destinations/");n.NorthAmerica="North America";n.CentralAmerica="Central America";n.SouthAmerica="South America";n.Europe="Europe";n.Asia="Asia";n.MiddleEast="Middle East";n.Africa="Africa";n.Australasia="Australasia";n.getCountries=function(){t.getDestinationsPage().success(function(t){n.destinations=i.load(t,u);n.initializing=!1;n.initialized=!0}).error(function(n,t){console.log(n,t)})};n.getCountries()}]);nomadsApp.controller("diariesController",["$scope","categoryHttpFacade","modelFactory","page","categoryModel","$timeout",function(n,t,i,r,u,f){n.initializing=!1;n.initialized=!1;f(function(){n.initialized||(n.initializing=!0)},1e3);r.setTitle("Diaries - Intrepid Nomads - Budget BackPacking As A Couple");r.setDescription("Ever thought of trekking to Everest Base Camp or Hiking the Atlas Mountains? See what life is really like by reading our day-by-day diaries of our more unique trips.");var e=function(){t.getFeatured().success(function(t){n.diaries=i.load(t,u);n.initializing=!1;n.initialized=!0}).error(function(n,t){console.log(n,t)})};e()}]);nomadsApp.controller("drinksController",["$scope","blogHttpFacade","modelFactory","page","$timeout","$sce","blogModel",function(n,t,i,r,u,f,e){"use strict";n.title="Around the World in 80 Drinks";r.setTitle("Around the world in 80 drinks - Intrepid Nomads");r.setogURL("http://intrepidnomads.com/around-the-world-in-80-drinks/");n.initializing=!1;n.initialized=!1;u(function(){n.initialized||(n.initializing=!0)},1e3);t.getDrinks().success(function(t){n.blogs=i.load(t,e);n.blogs.reverse();n.initializing=!1;n.initialized=!0}).error(function(n,t){console.log(n,t)});n.setSelectedItem=function(t){n.selectedItem=t;u(function(){$(".blog-post img").addClass("img-responsive").addClass("fade-in").attr("spinner-load","");$("#detailsModal").animate({scrollTop:0},"slow")},0)};n.bindHTML=function(n){return f.trustAsHtml(n)};n.pageNext=function(){n.selectedItem<n.blogs.length-1&&n.setSelectedItem(n.selectedItem+1)};n.pagePrev=function(){n.selectedItem>0&&n.setSelectedItem(n.selectedItem-1)};n.isFirstPage=function(){return n.selectedItem===0};n.isLastPage=function(){if(n.blogs)return n.selectedItem===n.blogs.length-1}}]);nomadsApp.controller("findUsController",["$scope","locationHttpFacade","page","graphService","$timeout",function(n,t,i,r,u){"use strict";i.setTitle("Where Are the Intrepid Nomads");n.initializing=!1;n.initialized=!1;u(function(){n.initialized||(n.initializing=!0)},1e3);t.getLastKnownLocation().success(function(t){n.lastKnown=t;n.initializing=!1;n.initialized=!0}).error(function(n,t){console.log(n,t)});r.loadGraphs();console.log(r.lastKnownComplete)}])