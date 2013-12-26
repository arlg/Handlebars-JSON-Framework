var HF = HF || {};

HF.DataManager = {

    // Object containing datas
    datas: {},

    get: function(id, callback) {
        
        var _this = this;

        if ( this.datas[id] ) {
            return callback( this.datas[id] );
        }

        // If the data to load is in the asset folder ( not external )
        var isConfig = ( id.indexOf( 'config' ) === -1 ) ? false : true;

        //Transform underscores into slashes to get the path
        var url = id.replace(/_/g,"/"),            
            finalUrl = url + '.json',
            promise = $.trafficCop( finalUrl );

        promise
            .done(function( loadedData ) {
                callback( loadedData );
            })
            .error( function( data ){
                
                console.log('Error loading ' + data);
                    
            });

    },

    // Register a set of data
    registerDatas : function( dataset, callback ){

        var _this = this,
            loadedIndex = 0; //To start at 0

        _.each(dataset, function ( data , index ){

            _this.get( data, function ( loadedData ) {
      
                // TODO
                if( typeof(loadedData) === "string"){
                    loadedData = JSON.parse(loadedData);
                }

                // Register the data contents into the datas object
                _this.datas[data] = loadedData;
                
                loadedIndex++;

                if (( loadedIndex ) === dataset.length) {

                    callback();
                }

            });

        });
    }

};