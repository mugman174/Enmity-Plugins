function f(s){window.enmity.plugins.registerPlugin(s)}var h;(function(s){s[s.BuiltIn=0]="BuiltIn",s[s.Guild=1]="Guild",s[s.DM=2]="DM"})(h||(h={}));var r;(function(s){s[s.Chat=1]="Chat",s[s.User=2]="User",s[s.Message=3]="Message"})(r||(r={}));var u;(function(s){s[s.BuiltIn=0]="BuiltIn",s[s.BuiltInText=1]="BuiltInText",s[s.BuiltInIntegration=2]="BuiltInIntegration",s[s.Bot=3]="Bot",s[s.Placeholder=4]="Placeholder"})(u||(u={}));var g;(function(s){s[s.Role=1]="Role",s[s.User=2]="User"})(g||(g={}));var l;(function(s){s[s.SubCommand=1]="SubCommand",s[s.SubCommandGroup=2]="SubCommandGroup",s[s.String=3]="String",s[s.Integer=4]="Integer",s[s.Boolean=5]="Boolean",s[s.User=6]="User",s[s.Channel=7]="Channel",s[s.Role=8]="Role",s[s.Mentionnable=9]="Mentionnable",s[s.Number=10]="Number"})(l||(l={}));var B;(function(s){s[s.ApplicationCommand=2]="ApplicationCommand",s[s.MessageComponent=3]="MessageComponent"})(B||(B={}));const b="enmity";function M(s,e){window.enmity.clyde.sendReply(s,e)}function S(s){window.enmity.toast.showToast(s)}const v={name:"HelloWorld",commands:[],onStart(){const s={id:"hello-world",applicationId:b,name:"hello",displayName:"hello",description:"hello world",displayDescription:"hello world",type:r.Chat,inputType:u.BuiltInText,options:[{name:"toast",displayName:"toast",description:"Toast",displayDescription:"Toast",type:l.String,required:!1}],execute:async function(e,t){let w={content:String(e),source:42069};S(w),M(t.channel.id,"Hello, world!")}};this.commands.push(s)},onStop(){this.commands=[]}};f(v);
