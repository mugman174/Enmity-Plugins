function s(e){window.enmity.plugins.registerPlugin(e)}function r(e){return window.enmity.patcher.create(e)}function u(e){window.enmity.toast.showToast(e)}function a(){window.enmity.native.reloadDiscord()}function d(...e){return window.enmity.getModuleByProps(e)}const c={name:"SussyPlugin",patches:[],onStart(){const e=r("undelete"),n=t=>u({content:t}),o=d("deleteMessage");e.instead(o.default,"deleteMessage",(t,i,l)=>n(i)),this.patches.push(e)},onStop(){a()}};s(c);
