window.HomeView = Backbone.View.extend({

    template:_.template($('#home').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.SearchResultsView = Backbone.View.extend({

    template:_.template($('#searchResults').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page2View = Backbone.View.extend({

    template:_.template($('#page2').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

var AppRouter = Backbone.Router.extend({

    routes:{
        "":"home",
        "searchResults":"searchResults",
        "page2":"page2"
    },

    initialize:function () {
        // Handle back button throughout the application
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
    },

    home:function () {
        console.log('#home');
        this.changePage(new HomeView());
    },

    searchResults:function () {
        console.log('#page1');
        this.changePage(new SearchResultsView());
    },

    page2:function () {
        console.log('#page2');
        this.changePage(new Page2View());
    },

    changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        console.log(event.target);
        //var transition = $.mobile.defaultPageTransition;
        var transition = "none";
        // We don't want to slide the first page
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    }

});

$(document).ready(function () {
    console.log('document ready');
    app = new AppRouter();
    Backbone.history.start();

    $("#testButton").live('swipeleft',function(){
        alert('swipe left');
    });

    $("#testButton").live('tap',function(){
        alert('tap');
    });

    $(".swipableRow").live('swipeleft',function(){
        //alert('swipe row left');
        $(".swipableRow").append("<p>test</p>");
    });

    $(".swipableRow").live('taphold',function(){
        alert('tap hold');

    });

    $("#search").live('click',function(){
        app.navigate("searchResults", {trigger: true});
    });

});