var d;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.Guild=1]="Guild",e[e.DM=2]="DM"})(d||(d={}));var o;(function(e){e[e.Chat=1]="Chat",e[e.User=2]="User",e[e.Message=3]="Message"})(o||(o={}));var g;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.BuiltInText=1]="BuiltInText",e[e.BuiltInIntegration=2]="BuiltInIntegration",e[e.Bot=3]="Bot",e[e.Placeholder=4]="Placeholder"})(g||(g={}));var F;(function(e){e[e.Role=1]="Role",e[e.User=2]="User"})(F||(F={}));var a;(function(e){e[e.SubCommand=1]="SubCommand",e[e.SubCommandGroup=2]="SubCommandGroup",e[e.String=3]="String",e[e.Integer=4]="Integer",e[e.Boolean=5]="Boolean",e[e.User=6]="User",e[e.Channel=7]="Channel",e[e.Role=8]="Role",e[e.Mentionnable=9]="Mentionnable",e[e.Number=10]="Number"})(a||(a={}));var i;(function(e){e[e.ApplicationCommand=2]="ApplicationCommand",e[e.MessageComponent=3]="MessageComponent"})(i||(i={}));const S="enmity";function B(e){window.enmity.plugins.registerPlugin(e)}function f(e,s,u,t){window.enmity.clyde.sendReply(e,s,u,t)}const r=window.enmity.react;r.React,r.memo,r.useCallback,r.useContext,r.useEffect,r.useImperativeHandle,r.useMemo,r.useReducer,r.useRef,r.useState,r.Alert,r.Button,r.FlatList;const v=r.Image;r.ImageBackground,r.KeyboardAvoidingView,r.Modal,r.Pressable,r.RefreshControl,r.ScrollView,r.SectionList,r.StatusBar,r.StyleSheet,r.Switch,r.Text,r.TextInput,r.TouchableHighlight,r.TouchableOpacity,r.TouchableWithoutFeedback,r.Touchable,r.View,r.VirtualizedList,r.Form,r.FormArrow,r.FormCTA,r.FormCTAButton,r.FormCardSection,r.FormCheckbox,r.FormDivider,r.FormHint,r.FormIcon,r.FormInput,r.FormLabel,r.FormRadio,r.FormRow,r.FormSection,r.FormSelect,r.FormSubLabel,r.FormSwitch,r.FormTernaryCheckBox,r.FormText,r.FormTextColors,r.FormTextSizes;async function x(e){return new Promise((s,u)=>{v.getSize(e,(t,l)=>{s({width:t,height:l})},t=>{u(t)})})}const I={name:"wttr",commands:[],onStart(){const e={id:"wttr",applicationId:S,name:"wttr",displayName:"wttr",description:"Get the weather",displayDescription:"Get the weather",type:o.Chat,inputType:g.BuiltInText,options:[{name:"location",displayName:"location",description:"Location",displayDescription:"Location",type:a.String,required:!1},{name:"detailed",displayName:"detailed",description:"Detailed View",displayDescription:"Detailed View (default: off)",type:a.Boolean,required:!1}],execute:async function(s,u){var t,l;let w="";((t=s[0])==null?void 0:t.name)=="location"&&(w=s[0].value);let h=`https://wttr.in/${w}.png`;(l=s.find(c=>c.name=="detailed"))!=null&&l.value&&(h=h+"?0");let n=await x(h),b=[{image:{url:h,height:n.height,width:n.width}}];f(u.channel.id,{embeds:b})}};this.commands.push(e)},onStop(){this.commands=[]}};B(I);
