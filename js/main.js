function init(){

    var datas = [
        'json_data'
    ];

    var data = 'json_single';

    // Register a JSON DATA and sets it in the data object

    HF.DataManager.registerDatas( datas, function(){
        console.log(HF.DataManager.datas.json_data);
    });

    HF.DataManager.get( data, function(e){
        console.log(HF.DataManager.datas.json_data);

        // In the callback we can call handlebarsto register partials
        initPartials();

    });

};

function initPartials(){

    HF.TemplateManager.registerPartials( HF.TemplateManager.partials , function() {
            console.log('Template registration is done');
            initHtmlPage();

    });
};

function initHtmlPage(){

    HF.TemplateManager.get('/template', function (tmp) {
        var html = tmp( HF.DataManager.datas.json_data );
        $('#content').html(html);

    }); 


};

$(function () {
    init();
});