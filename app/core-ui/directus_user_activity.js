//  Directus User Activity List View component
//  Directus 6.0

//  (c) RANGER
//  Directus may be freely distributed under the GNU license.
//  For all details and documentation:
//  http://www.getdirectus.com

define(['app','backbone'], function(app, Backbone) {

  var Module = {};
  Module.id = 'directus_user_activity';
  Module.system = true;
  Module.sortBy = 'last_login';

  Module.list = function(options) {
  	if(options.model.get('last_access') !== null){
      var page_summary = '';
      var last_page = $.parseJSON(options.model.get('last_page'));
      if(undefined === last_page.param) {
        page_summary += app.capitalize(last_page.route) + " index";
      } else {
        switch(last_page.route) {
          case "entries":
            page_summary += app.capitalize(last_page.param) + " table index";
            break;
          case "entry":
            var detailType = "new";
            if("new" == last_page.path.substr(-3))
              detailType = "create form";
            page_summary += app.capitalize(last_page.param) + " table entry " + detailType;
            break;
        }
      }
      var activity_time = options.model.get('last_access');
	    return '<a href="#'+last_page.path+'" title="'+activity_time+'">'+page_summary+' '+jQuery.timeago(activity_time)+'</a>';
  	} else {
  		return '<a href="#">Never logged in</a>';
  	}
  };

  return Module;
});