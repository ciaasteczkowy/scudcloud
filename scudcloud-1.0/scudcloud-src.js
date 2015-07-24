var ScudCloud = {
	connected: false,
	overrideNotifications: function(){
		TS.ui.growls.no_notifications = false;
		TS.ui.growls.checkPermission = function() { return true; }
		TS.ui.growls.getPermissionLevel = function() { return 'granted'; }
		TS.ui.growls.show = function(j,k,g,o,l,b,c,m){
			desktop.sendMessage(j,g);
		}
		TS.ui.banner.close();
	},
	overrideConnect: function(){
		TS.ms.connected_sig.add(function(){ScudCloud.connect(true);});
		TS.ms.disconnected_sig.add(function(){ScudCloud.connect(false);});
	},
	overrideCountAllUnreads: function(){
		ScudCloud.countAllUnreads = TS.utility.msgs.countAllUnreads;
		TS.utility.msgs.countAllUnreads = function(){ScudCloud.countAllUnreads;ScudCloud.count()};
	},
	overrideOnDOMReady: function(){
		ScudCloud.onDOMReady = TS.onDOMReady;
		TS.onDOMReady = function(){ScudCloud.overrideNotifications();ScudCloud.onDOMReady();};
	},
	connect: function(b){
		ScudCloud.connected = b;
		desktop.enableMenus(b);
		ScudCloud.count();
		ScudCloud.overrideNotifications();
	},
    count: function(){
		var total=0; 
		$('span.unread_highlight').not('.hidden').each(function(i){ 
			total+= new Number($(this).text().replace('+','')); }
		);
		desktop.count(total.toString());
    },
    countChannels: function(){
		var total=0;
		$('li.unread').not('.hidden').each(function(i){
			total+=1; }
		);
		desktop.countChannels(total.toString());
    },
	createSnippet: function(){
		return TS.ui.snippet_dialog.start();		
	},
	isConnected: function(){
		return ScudCloud.connected;
	},
    listChannels: function(){
		return TS.channels.getUnarchivedChannelsForUser();
	},
    listTeams: function(){
		var list = TS.getAllTeams();
		// Fix for current team displaying no icon
		list[0].team_icon = {"image_88":TS.model.team.icon.image_88};
		return list;
	},
    quicklist: function(){
		desktop.quicklist(ScudCloud.listChannels());
	},
	join: function(c){
		return TS.channels.join(c);
	},
	setClipboard: function(data){
		TS.client.ui.file_pasted_sig.dispatch(data, TS.model.shift_key_pressed);
	},
    preferences: function(){
		return TS.ui.prefs_dialog.start();
	},
    addTeam: function(){
		document.location = TS.boot_data.signin_url;
	},
	getCurrentTeam: function(){
		var list = TS.getAllTeams();
		if(list!=null) for(var i=0;list.length;i++){
			if(list[i].team_url==TS.boot_data.team_url) return list[i].id;
		}
		return "";
	},
    logout: function(){
		document.location = TS.boot_data.logout_url;
	},
    help: function(){
		return TS.help_dialog.start();
	},
    isConnected: function(){
        return "undefined" != typeof TS && "undefined" != typeof TS.model && TS.model.ms_connected;
    }
}
var boot_data = {};
if("undefined" != typeof TS){
	document.onpaste = function(e){desktop.pasted(false);}
	ScudCloud.overrideNotifications();
	ScudCloud.overrideConnect();
	ScudCloud.overrideOnDOMReady();
	ScudCloud.overrideCountAllUnreads();
    boot_data.channels = ScudCloud.listChannels();
    boot_data.teams = ScudCloud.listTeams();
	ScudCloud.count();
} else {
    boot_data.channels = new Array();
    boot_data.teams = new Array();
}
boot_data
