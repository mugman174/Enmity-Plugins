function v(r){window.enmity.plugins.registerPlugin(r)}var h;(function(r){r[r.BuiltIn=0]="BuiltIn",r[r.Guild=1]="Guild",r[r.DM=2]="DM"})(h||(h={}));var e;(function(r){r[r.Chat=1]="Chat",r[r.User=2]="User",r[r.Message=3]="Message"})(e||(e={}));var g;(function(r){r[r.BuiltIn=0]="BuiltIn",r[r.BuiltInText=1]="BuiltInText",r[r.BuiltInIntegration=2]="BuiltInIntegration",r[r.Bot=3]="Bot",r[r.Placeholder=4]="Placeholder"})(g||(g={}));var B;(function(r){r[r.Role=1]="Role",r[r.User=2]="User"})(B||(B={}));var t;(function(r){r[r.SubCommand=1]="SubCommand",r[r.SubCommandGroup=2]="SubCommandGroup",r[r.String=3]="String",r[r.Integer=4]="Integer",r[r.Boolean=5]="Boolean",r[r.User=6]="User",r[r.Channel=7]="Channel",r[r.Role=8]="Role",r[r.Mentionnable=9]="Mentionnable",r[r.Number=10]="Number"})(t||(t={}));var f;(function(r){r[r.ApplicationCommand=2]="ApplicationCommand",r[r.MessageComponent=3]="MessageComponent"})(f||(f={}));const I="enmity";function U(r,u,s){return{name:r,displayName:r,description:u,displayDescription:u,type:s||t.String,required:!0}}function k(r,u,s,b,M){return{id:r,applicationId:I,name:u,displayName:u,description:s,displayDescripton:s,type:e.Chat,inputType:g.BuiltInText,options:b,execute:M}}const x={name:"MockPlugin",commands:[],onStart(){unregisterCommand("mock");const r=k("mock","mock","MaKe yOuR TeXt lIkE ThIs",[U("text","The text to mock-ify")],async function(u,s){for(input=u[0].value,i=0;i<input.length;i+=2)input=input.substr(0,i)+input[i].toUpperCase()+input.substr(i+1);return{content:input}});this.commands.push(r)},onStop(){this.commands=[]}};v(x);
