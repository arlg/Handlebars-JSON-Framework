var HF = HF || {};

HF.TemplateManager = {
    
    // Here, we're keeping an object literal around to act as a hash table, and we'll
    // be using it to cache each template that gets loaded from the server.
    templates: {},

    // You could stash an array of well known partials that need to be rendered
    // and registered with your Templating engine of choice.
    // partialsLocation : '/partials/',

    partials: [
        { 
            name: 'mypartial', 
            location: '/partials' + '/mypartial' 
        }
    ],

    get: function (id, callback) {

        // Can we find this template in the cache?
        if (this.templates[id]) {

            // Yes? OK, lets call our callback function and return.
            return callback(this.templates[id]);
        }

        // Otherwise, lets load it up. We'll build our URL based on the ID passed in.
        var url = 'templates' + id + '.html';
        console.log(url);
        // And use a handy jQuery library called Traffic Cop to handle marshalling 
        // requests to the server. This will prevent multiple concurrent requests 
        // for the same resource.
        var promise = $.trafficCop(url);
        var _this = this;

        // Wire up a handler for this request via jQuery's promise API
        promise.done(function (template) {

            // `template` is a string of HTML loaded via `$.ajax`. So here, we 
            // can take the opportunity to pre-compile it for performance. When we 
            // pre-compile a template, it returns a function that we can store in our 
            // cache for future use.
        
            var tmp = Handlebars.compile(template);

            _this.templates[id] = tmp;
            

            callback(tmp);
        });
    },

    registerPartials: function ( type,  callback ) {
        var _this = this,
            partialsArray;

            partialsArray = type;

        _.each( partialsArray , function (partial, index) {
            
            // As we're iterating over our partials, we can call our
            // existing `get` function to pre-compile and cache them.
            _this.get( partial.location, function (tmp) {
                Handlebars.registerPartial(partial.name, tmp);

                if (index + 1 === partialsArray.length) {
                    callback();
                }
            });
        });
    }
};